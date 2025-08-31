import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import ResumeViewer from "@/components/custom/resumeViewer";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { EditorContent, useEditor, type EditorEvents } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import htmlToPdfmake from "html-to-pdfmake";
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import { useState } from "react";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

pdfMake.vfs = pdfFonts.vfs;

pdfMake.fonts = {
	Roboto: { normal: "Roboto-Regular.ttf", bold: "Roboto-Medium.ttf", italics: "Roboto-Italic.ttf", bolditalics: "Roboto-MediumItalic.ttf" },
};

export default function TextPdfEditor() {
	const [pdfUrl, setPdfUrl] = useState<string>();
	const editor = useEditor({
		extensions: [StarterKit],
		content: "",
		editorProps: {
			attributes: {
				class: "h-full min-h-full outline-none focus:outline-none",
			},
		},
		onUpdate: onEditorInputChange,
	});

	function onEditorInputChange({editor }:EditorEvents['update']) {
		const html = editor.getHTML();

		const defaultConvertionConfig = {
			defaultStyles: {
				b: { bold: true },
				strong: { bold: true },
				u: { decoration: "underline" },
				del: { decoration: "lineThrough" },
				s: { decoration: "lineThrough" },
				em: { italics: true },
				i: { italics: true },
				h1: { fontSize: 24, bold: true, marginBottom: 0 },
				h2: { fontSize: 22, bold: true, marginBottom: 0 },
				h3: { fontSize: 20, bold: true, marginBottom: 0 },
				h4: { fontSize: 18, bold: true, marginBottom: 0 },
				h5: { fontSize: 16, bold: true, marginBottom: 0 },
				h6: { fontSize: 14, bold: true, marginBottom: 0 },
				a: { color: "blue", decoration: "underline" },
				strike: { decoration: "lineThrough" },
				p: { margin: [0, 0, 0, 0] },
				ul: { marginBottom: 5, marginLeft: 5 },
				table: { marginBottom: 5 },
				th: { bold: true, fillColor: "#EEEEEE" },
				hr: { color: "green", thickness: 5, margin: [0, 0, 0, 0] },
			},
			tableAutoSize: false, // Enable automatic table sizing
			imagesByReference: false, // Handle images by reference
			removeExtraBlanks: false, // Remove extra whitespace
			removeTagClasses: false, // Keep HTML tag classes
			window: window, // Required for Node.js usage
			ignoreStyles: [], // Style properties to ignore
			fontSizes: [10, 14, 16, 18, 20, 24, 28],
		};

		const converted = htmlToPdfmake(html, defaultConvertionConfig);
		console.log(converted);
		const docDef: TDocumentDefinitions = {
			pageSize: "A4",
			pageMargins: [0, 0, 0, 0],
			content: converted,
		};
		getUrl(docDef);
	}

	function getUrl(docDef: TDocumentDefinitions) {
		if (!docDef) return;
		pdfMake.createPdf(docDef).getBlob((blob) => {
			const url = URL.createObjectURL(blob);
			setPdfUrl(url);
		});
	}

	return (
		<div className="h-screen w-full flex flex-col">
			<ResizablePanelGroup direction="horizontal" className="flex-1 min-h-0">
				{/* Left: Editor */}
				<ResizablePanel defaultSize={40} minSize={30} className="flex flex-col min-h-0 border-r">
					{/* <div className="flex-1 min-h-0 overflow-auto">
						<EditorContent editor={editor} className="h-full" />
					</div> */}
					<SimpleEditor
						onUpdate={onEditorInputChange}
					/>
				</ResizablePanel>

				<ResizableHandle withHandle />

				{/* Right: PDF Preview */}
				<ResizablePanel defaultSize={60} minSize={40} className="flex flex-col min-h-0">
					<div className="flex-1 min-h-0 overflow-auto">
						<ResumeViewer pdfUrl={pdfUrl} />
					</div>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
