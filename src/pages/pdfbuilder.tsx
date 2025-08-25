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
			{
				text: "SHREYA GUPTA",
				style: "header",
				_margin: [0, 0, 0, 6],
				_inlines: [],
				_minWidth: 81.9951171875,
				_maxWidth: 157.8671875,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 20,
						verticalRatio: 0,
						horizontalRatio: 0,
					},
				],
			},
			{
				text: "+91 9540141141  |  rishabhsingh2305@gmail.com  |  linkedin.com/in/rishabhsingh2305",
				style: "subheader",
				_margin: [0, 0, 0, 16],
				_inlines: [],
				_minWidth: 135.78125,
				_maxWidth: 388.6767578125,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 51.78125,
						verticalRatio: 0.04064670222154011,
						horizontalRatio: 0,
					},
				],
			},
			{
				text: "Professional Summary",
				_margin: [0, 14, 0, 6],
				_inlines: [],
				_minWidth: 67.505859375,
				_maxWidth: 122.02734375,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 93.5,
						verticalRatio: 0.09400299274834056,
						horizontalRatio: 0,
					},
				],
				style: "sectionHeader",
			},
			{
				text: "Innovative Software Developer with 2.5+ years of experience in scalable web applications, RESTful APIs, and Microservices using Java, Spring Boot, Kafka, and MySQL. Strong foundation in Data Structures Algorithms with expertise in RAG, Generative AI, and AI Agent development. Skilled in LangChain, LangGraph, and leveraging Azure OpenAI (GPT-5) to build intelligent, high-performance systems. Proven ability to optimize efficiency and deliver measurable business outcomes.",
				_margin: [0, 0, 0, 6],
				_inlines: [],
				_minWidth: 62.3046875,
				_maxWidth: 2115.7080078125,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 113.5625,
						verticalRatio: 0.11966197291179066,
						horizontalRatio: 0,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 128.796875,
						verticalRatio: 0.1391460115873077,
						horizontalRatio: 0,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 144.03125,
						verticalRatio: 0.1586300502628247,
						horizontalRatio: 0,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 159.265625,
						verticalRatio: 0.1781140889383417,
						horizontalRatio: 0,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 174.5,
						verticalRatio: 0.19759812761385873,
						horizontalRatio: 0,
					},
				],
				style: "text",
			},
			{
				text: "TECHNICAL SKILLS",
				_margin: [0, 14, 0, 6],
				_inlines: [],
				_minWidth: 64.623046875,
				_maxWidth: 106.078125,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 209.734375,
						verticalRatio: 0.2426612119351827,
						horizontalRatio: 0,
					},
				],
				style: "sectionHeader",
			},
			{
				text: "AI & Machine Learning : LLMs (GPT-4, open-source models), LangChain, RAG (Retrieval-Augmented\nGeneration), Pinecone, Vector Embeddings, Semantic Search, OpenAI API, Agent memory, Tool\nchaining",
				_margin: [0, 0, 0, 6],
				_inlines: [],
				_minWidth: 57.3486328125,
				_maxWidth: 436.728515625,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 229.796875,
						verticalRatio: 0.2683201920986328,
						horizontalRatio: 0,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 243.859375,
						verticalRatio: 0.28630545856834083,
						horizontalRatio: 0,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 257.921875,
						verticalRatio: 0.3042907250380488,
						horizontalRatio: 0,
					},
				],
				style: "list",
			},
			{
				text: "Languages: Java, C++, JavaScript, HTML/CSS, RESTful APIs, Python",
				_margin: [0, 0, 0, 6],
				_inlines: [],
				_minWidth: 51.416015625,
				_maxWidth: 301.1279296875,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 277.984375,
						verticalRatio: 0.3299497052014989,
						horizontalRatio: 0,
					},
				],
				style: "list",
			},
			{
				text: "Frameworks: Spring Boot, ExpressJS",
				_margin: [0, 0, 0, 6],
				_inlines: [],
				_minWidth: 57.36328125,
				_maxWidth: 162.8271484375,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 298.046875,
						verticalRatio: 0.35560868536494905,
						horizontalRatio: 0,
					},
				],
				style: "list",
			},
			{
				text: "Database: MySQL, Apache Druid",
				_margin: [0, 0, 0, 6],
				_inlines: [],
				_minWidth: 44.6533203125,
				_maxWidth: 142.8857421875,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 318.109375,
						verticalRatio: 0.38126766552839914,
						horizontalRatio: 0,
					},
				],
				style: "list",
			},
			{
				text: "PROFESSIONAL EXPERIENCE",
				_margin: [0, 14, 0, 6],
				_inlines: [],
				_minWidth: 86.12109375,
				_maxWidth: 158.75390625,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 352.171875,
						verticalRatio: 0.4248319776439141,
						horizontalRatio: 0,
					},
				],
				style: "sectionHeader",
			},
			{
				text: "Techcrumb (Ad-tech Startup)",
				_margin: [0, 2, 0, 0],
				_inlines: [],
				_minWidth: 55.451171875,
				_maxWidth: 143.58544921875,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 374.234375,
						verticalRatio: 0.4530488623719449,
						horizontalRatio: 0,
					},
				],
				style: "entryTitle",
			},
			{
				text: "Software Development Engineer (Jan 2023 - Present)",
				_margin: [0, 0, 0, 4],
				_inlines: [],
				_minWidth: 51.06445312499999,
				_maxWidth: 205.3037109375,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 387.125,
						verticalRatio: 0.46953535663584395,
						horizontalRatio: 0,
					},
				],
				style: "entrySubtitle",
			},
			{
				ul: [
					{
						text: "Developed an AI-driven system for automated prompt generation, enabling image-to-video synthesis with a model swap feature supporting Seedance, Hailu, Veo2, Veo3, and more, which reduced\nmanual prompt engineering time by 40% and accelerated video generation throughput by 25%",
						_margin: [0, 0, 0, 6],
						_inlines: [],
						_minWidth: 51.9580078125,
						_maxWidth: 856.044921875,
						listMarker: {
							canvas: [
								{
									x: 42,
									y: 408.8046875,
									r1: 2,
									r2: 2,
									type: "ellipse",
									color: "black",
								},
							],
							_maxWidth: 12.884765625,
							_minWidth: 12.884765625,
							_maxHeight: 14.0625,
							_minHeight: 14.0625,
						},
						positions: [
							{
								pageNumber: 1,
								pageOrientation: "portrait",
								pageInnerHeight: 781.89,
								pageInnerWidth: 535.28,
								left: 52.884765625,
								top: 401.671875,
								verticalRatio: 0.4881401156172863,
								horizontalRatio: 0.024071076119040503,
							},
							{
								pageNumber: 1,
								pageOrientation: "portrait",
								pageInnerHeight: 781.89,
								pageInnerWidth: 535.28,
								left: 52.884765625,
								top: 415.734375,
								verticalRatio: 0.5061253820869943,
								horizontalRatio: 0.024071076119040503,
							},
							{
								pageNumber: 1,
								pageOrientation: "portrait",
								pageInnerHeight: 781.89,
								pageInnerWidth: 535.28,
								left: 52.884765625,
								top: 429.796875,
								verticalRatio: 0.5241106485567023,
								horizontalRatio: 0.024071076119040503,
							},
						],
						style: "list",
					},
					{
						text: "Implemented fine-grained RBAC + ABAC with a policy-as-code engine (e.g., OPA/Rego), supporting\nresource-, action-, and tenant-level permissions and dynamic attributes (roles, org, plan, labels)",
						_margin: [0, 0, 0, 6],
						_inlines: [],
						_minWidth: 58.6474609375,
						_maxWidth: 434.0625,
						listMarker: {
							canvas: [
								{
									x: 42,
									y: 456.9921875,
									r1: 2,
									r2: 2,
									type: "ellipse",
									color: "black",
								},
							],
							_maxWidth: 12.884765625,
							_minWidth: 12.884765625,
							_maxHeight: 14.0625,
							_minHeight: 14.0625,
						},
						positions: [
							{
								pageNumber: 1,
								pageOrientation: "portrait",
								pageInnerHeight: 781.89,
								pageInnerWidth: 535.28,
								left: 52.884765625,
								top: 449.859375,
								verticalRatio: 0.5497696287201524,
								horizontalRatio: 0.024071076119040503,
							},
							{
								pageNumber: 1,
								pageOrientation: "portrait",
								pageInnerHeight: 781.89,
								pageInnerWidth: 535.28,
								left: 52.884765625,
								top: 463.921875,
								verticalRatio: 0.5677548951898604,
								horizontalRatio: 0.024071076119040503,
							},
						],
						style: "list",
					},
					{
						text: "Conducted code reviews and implemented best practices, reducing system downtime by 15%.",
						_margin: [0, 0, 0, 6],
						_inlines: [],
						_minWidth: 58.359375,
						_maxWidth: 415.0537109375,
						listMarker: {
							canvas: [
								{
									x: 42,
									y: 491.1171875,
									r1: 2,
									r2: 2,
									type: "ellipse",
									color: "black",
								},
							],
							_maxWidth: 12.884765625,
							_minWidth: 12.884765625,
							_maxHeight: 14.0625,
							_minHeight: 14.0625,
						},
						positions: [
							{
								pageNumber: 1,
								pageOrientation: "portrait",
								pageInnerHeight: 781.89,
								pageInnerWidth: 535.28,
								left: 52.884765625,
								top: 483.984375,
								verticalRatio: 0.5934138753533106,
								horizontalRatio: 0.024071076119040503,
							},
						],
						style: "list",
					},
				],
				_margin: null,
				type: "disc",
				_gapSize: {
					width: 12.884765625,
					height: 14.0625,
					fontSize: 12,
					lineHeight: 1,
					ascender: 11.1328125,
					descender: -2.9296875,
				},
				_minWidth: 71.5322265625,
				_maxWidth: 868.9296875,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 52.884765625,
						top: 401.671875,
						verticalRatio: 0.4881401156172863,
						horizontalRatio: 0.024071076119040503,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 52.884765625,
						top: 415.734375,
						verticalRatio: 0.5061253820869943,
						horizontalRatio: 0.024071076119040503,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 52.884765625,
						top: 429.796875,
						verticalRatio: 0.5241106485567023,
						horizontalRatio: 0.024071076119040503,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 52.884765625,
						top: 449.859375,
						verticalRatio: 0.5497696287201524,
						horizontalRatio: 0.024071076119040503,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 52.884765625,
						top: 463.921875,
						verticalRatio: 0.5677548951898604,
						horizontalRatio: 0.024071076119040503,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 52.884765625,
						top: 483.984375,
						verticalRatio: 0.5934138753533106,
						horizontalRatio: 0.024071076119040503,
					},
				],
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
