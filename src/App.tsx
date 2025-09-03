import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useEffect, useState } from "react";
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import PdfViewer from "./components/custom/pdfViewer";
import RichPdfMakeTextEditor from "./components/custom/richPdfMakeTextEditor";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./components/ui/resizable";

pdfMake.vfs = pdfFonts.vfs;

function App() {
	const [pdfUrl, setPdfUrl] = useState<string>();
	const [docDef, setDocDef] = useState<TDocumentDefinitions>({
		content: [
			{
				text: [
					{
						text: "one",
					},
				],
			},
		],
		pageSize: "A4",
		pageOrientation: "portrait",
		pageMargins: [40, 60, 40, 60],
	});

	useEffect(() => {
		if (!docDef) return;
		pdfMake.createPdf(docDef).getBlob((blob) => {
			const url = URL.createObjectURL(blob);
			setPdfUrl(url);
		});
	}, [docDef]);

	return (
		<div className="h-screen w-screen">
			<ResizablePanelGroup direction="horizontal" className="h-full w-full">
				{/* Left: Editor */}
				<ResizablePanel defaultSize={40} minSize={30} className="h-full flex flex-col border-r">
					<RichPdfMakeTextEditor
						config={docDef.content[0]}
						onUpdate={(config) => {
							setDocDef((prev) => ({ ...prev, content: [config] }));
						}}
					/>
				</ResizablePanel>

				<ResizableHandle withHandle />

				{/* Right: PDF Preview */}
				<ResizablePanel defaultSize={60} minSize={40} className="h-full overflow-y-auto">
					<PdfViewer pdfUrl={pdfUrl} />
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}

export default App;
