import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {
    ResizablePanelGroup,
    ResizablePanel,
    ResizableHandle,
} from "@/components/ui/resizable";

import { Card, CardContent } from "@/components/ui/card";
import type { TDocumentDefinitions } from "pdfmake/interfaces";
import ConfigEditor from "./configEditor";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

pdfMake.vfs = pdfFonts.vfs;

pdfMake.fonts = {
    Roboto: { normal: "Roboto-Regular.ttf", bold: "Roboto-Medium.ttf", italics: "Roboto-Italic.ttf", bolditalics: "Roboto-MediumItalic.ttf" },
};

export default function PdfResumeEditor() {
    const [pdfUrl, setPdfUrl] = useState<string>();
    const [docDef, setDocDef] = useState<TDocumentDefinitions>({
		pageSize: "A4",
		content: [
                // Header
                { text: 'Rishabh Singh' },
                {
                    text: [
                        { text: '+91 9540141141 | ', link: 'tel:+919540141141' },
                        { text: 'rishabhsingh2305@gmail.com | ', link: 'mailto:rishabhsingh2305@gmail.com' },
                        { text: 'in/ ', color: '#555' }, { text: 'linkedin.com/in/rishabhsingh2305 | ', link: 'https://linkedin.com/in/rishabhsingh2305' },
                        { text: 'LeetCode', link: 'https://leetcode.com/rishabhsingh2305/' },
                    ],
                },

                // Summary
                { text: 'Professional Summary', },
                {
                    text:
                        'Full-Stack AI Engineer with ~2.5 years in Java, Spring Boot, Kafka, MySQL, and REST—building scalable, event-driven microservices and distributed systems. Strong in OOP/DSA and GenAI (GPT/Azure OpenAI/Claude), agents, RAG, embeddings, semantic search, and tooling (LangChain/LangGraph/LangSmith, Pinecone/ChromaDB). Driven by performance, automation, and reliability.',
                },
			],
		styles: {
			header: {
				fontSize: 22,
				bold: true,
				alignment: "center",
				margin: [0, 0, 0, 6],
				color: "#111111",
			},
			subheader: {
				fontSize: 10,
				alignment: "center",
				margin: [0, 0, 0, 16],
				color: "#555555",
			},
			sectionHeader: {
				fontSize: 12,
				bold: true,
				italics: false,
				color: "#2a2a2a",
				decoration: "underline",
				margin: [0, 14, 0, 6],
				alignment: "left",
				lineHeight: 1,
				characterSpacing: 0,
				noWrap: false,
				opacity: 1,
			},
			text: {
				fontSize: 10,
				bold: false,
				italics: false,
				color: "#313030",
				margin: [0, 0, 0, 6],
				alignment: "left",
				lineHeight: 1.3,
				characterSpacing: 0,
				noWrap: false,
				opacity: 1,
			},
			list: {
				fontSize: 10,
				bold: false,
				italics: false,
				color: "#1b1818",
				margin: [0, 0, 0, 6],
				alignment: "left",
				lineHeight: 1.2,
				characterSpacing: 0,
				noWrap: false,
				opacity: 1,
			},
			entryTitle: {
				fontSize: 11,
				bold: true,
				color: "#222222",
				margin: [0, 2, 0, 0],
			},
			entryDate: {
				fontSize: 9,
				italics: true,
				color: "#666666",
				margin: [0, 2, 0, 0],
			},
			entrySubtitle: {
				fontSize: 9,
				italics: true,
				color: "#555555",
				margin: [0, 0, 0, 4],
			},
			link: {
				fontSize: 10,
				color: "#1565c0",
				decoration: "underline",
			},
		},
		defaultStyle: {
			fontSize: 12,
		},
		pageMargins: [40, 20, 20, 40],
		version: "1.3",
		tagged: false,
		displayTitle: false,
		compress: true,
		images: {},
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
					<div className="p-4 border-b">
						<h2 className="text-xl font-bold">Resume Editor</h2>
					</div>

					{/* 👇 Scrollable editor container */}
					<div className="flex-1 overflow-y-auto p-4 space-y-6">
						<Card>
							<CardContent className="pt-4 space-y-2">
								<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Blocks</h2>
								<Button
									variant={"outline"}
									onClick={() => {
										const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(docDef, null, 2));
										const downloadAnchorNode = document.createElement("a");
										downloadAnchorNode.setAttribute("href", dataStr);
										downloadAnchorNode.setAttribute("download", "pdf_config.json");
										document.body.appendChild(downloadAnchorNode); // required for firefox
										downloadAnchorNode.click();
										downloadAnchorNode.remove();
									}}
								>
									Download config
								</Button>

								<ConfigEditor docDef={docDef} onChange={setDocDef} />
							</CardContent>
						</Card>
					</div>
				</ResizablePanel>

				<ResizableHandle withHandle />

				{/* Right: PDF Preview */}
				<ResizablePanel defaultSize={60} minSize={40} className="h-full overflow-y-auto">
					{pdfUrl ? (
						<iframe src={pdfUrl + "#toolbar=0&navpanes=0"} className="w-full h-full border-none" />
					) : (
						<div className="flex items-center justify-center h-full text-muted-foreground">Generating PDF…</div>
					)}
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
