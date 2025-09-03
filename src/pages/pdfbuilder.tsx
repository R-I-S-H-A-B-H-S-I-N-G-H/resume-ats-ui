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
import { Input } from "@/components/ui/input";
import PdfViewer from "@/components/custom/pdfViewer";

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
				text: "RISHABH SINGH",
				style: "header",
				_margin: [0, 0, 0, 6],
				_inlines: [],
				_minWidth: 93.28515625,
				_maxWidth: 164.505859375,
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
				chosen: false,
				selected: false,
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
				chosen: false,
				selected: false,
			},
			{
				text: "Professional Summary",
				_margin: [0, 8, 0, 6],
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
						top: 87.5,
						verticalRatio: 0.08632927905459847,
						horizontalRatio: 0,
					},
				],
				style: "sectionHeader",
				chosen: false,
				selected: false,
			},
			{
				text: [
					{
						text: "Full-Stack AI Engineer ",
						style: "text-bold",
					},
					{
						text: "with ",
					},
					{
						text: "2.5 years ",
						style: "text-bold",
					},
					{
						text: "of experience in ",
					},
					{
						text: "Java, Spring Boot, Hibernate, Kafka, MySQL, and\nRESTful APIs",
						style: "text-bold",
					},
					{
						text: ", building scalable, event-driven ",
						style: "text-bold",
					},
					{
						text: "microservices ",
						style: "text-bold",
					},
					{
						text: "and ",
					},
					{
						text: "distributed systems.",
						style: "text-bold",
					},
					{
						text: " Skilled in ",
					},
					{
						text: "object-oriented\nprogramming, data structures, algorithms, and Generative AI (GPT, Azure OpenAI, Claude) ",
						style: "text-bold",
					},
					{
						text: "with expertise in\nintelligent agents, ",
					},
					{
						text: "RAG pipelines, embeddings, semantic search, and LLM tools (Github Copilot).",
						style: "text-bold",
					},
					{
						text: " Proficient in ",
					},
					{
						text: " LangChain, LangSmith, LangGraph, Pinecone, and ChromaDB, ",
						style: "text-bold",
					},
					{
						text: "delivering high-performance, automation-driven\nplatforms.",
					},
				],
				_margin: [0, 0, 0, 6],
				_inlines: [],
				_minWidth: 62.919921875,
				_maxWidth: 973.115234375,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 107.5625,
						verticalRatio: 0.11198825921804857,
						horizontalRatio: 0,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 122.796875,
						verticalRatio: 0.1314722978935656,
						horizontalRatio: 0,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 138.03125,
						verticalRatio: 0.1509563365690826,
						horizontalRatio: 0,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 153.265625,
						verticalRatio: 0.17044037524459962,
						horizontalRatio: 0,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 168.5,
						verticalRatio: 0.18992441392011664,
						horizontalRatio: 0,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 183.734375,
						verticalRatio: 0.20940845259563365,
						horizontalRatio: 0,
					},
				],
				chosen: false,
				style: "text",
				selected: false,
			},
			{
				text: "TECHNICAL SKILLS",
				_margin: [0, 8, 0, 6],
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
						top: 212.96875,
						verticalRatio: 0.24679782322321556,
						horizontalRatio: 0,
					},
				],
				style: "sectionHeader",
				chosen: false,
				selected: false,
			},
			{
				text: [
					{
						text: "AI & Machine Learning: ",
						style: "text-bold",
					},
					{
						text: "LLMs (GPT-4, open-source models), LangChain, RAG (Retrieval-Augmented Generation),\nPinecone, Vector Embeddings, Semantic Search, OpenAI API, Agent memory, Tool chaining",
						style: "text",
					},
				],
				_margin: null,
				_inlines: [],
				_minWidth: 57.3486328125,
				_maxWidth: 491.962890625,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 233.03125,
						verticalRatio: 0.27245680338666567,
						horizontalRatio: 0,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 248.265625,
						verticalRatio: 0.2919408420621827,
						horizontalRatio: 0,
					},
				],
				chosen: false,
			},
			{
				text: [
					{
						text: "Languages: ",
						style: "text-bold",
					},
					{
						text: "Java, C++, JavaScript, HTML/CSS, RESTful APIs, Python",
						style: "text",
					},
				],
				_margin: null,
				_inlines: [],
				_minWidth: 51.787109375,
				_maxWidth: 301.50390625,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 263.5,
						verticalRatio: 0.3114248807376997,
						horizontalRatio: 0,
					},
				],
				chosen: false,
			},
			{
				text: [
					{
						text: "Frameworks: ",
						style: "text-bold",
					},
					{
						text: "Spring Boot, ReactJS, NextJs, Microservices, Docker, AWS",
						style: "text",
					},
				],
				_margin: null,
				_inlines: [],
				_minWidth: 64.2724609375,
				_maxWidth: 316.5283203125,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 278.734375,
						verticalRatio: 0.3309089194132167,
						horizontalRatio: 0,
					},
				],
				chosen: false,
			},
			{
				text: [
					{
						text: "Database: ",
						style: "text-bold",
					},
					{
						text: "MySQL, Apache Druid",
						style: "text",
					},
				],
				_margin: null,
				_inlines: [],
				_minWidth: 44.7900390625,
				_maxWidth: 143.02734375,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 293.96875,
						verticalRatio: 0.3503929580887337,
						horizontalRatio: 0,
					},
				],
				chosen: false,
			},
			{
				text: "PROFESSIONAL EXPERIENCE",
				_margin: [0, 8, 0, 6],
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
						top: 317.203125,
						verticalRatio: 0.38010861502257354,
						horizontalRatio: 0,
					},
				],
				style: "sectionHeader",
				chosen: false,
				selected: false,
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
						top: 339.265625,
						verticalRatio: 0.40832549975060434,
						horizontalRatio: 0,
					},
				],
				style: "entryTitle",
				chosen: false,
				selected: false,
			},
			{
				text: "Software Development Engineer (Jan 2023 - Present)",
				_margin: [0, 0, 0, 4],
				_inlines: [],
				_minWidth: 56.73828125,
				_maxWidth: 228.115234375,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 352.15625,
						verticalRatio: 0.4248119940145033,
						horizontalRatio: 0,
					},
				],
				style: "entrySubtitle",
				chosen: false,
				selected: false,
			},
			{
				ul: [
					{
						text: "Built an AI-powered intelligent system using Python, FastAPI, LangGraph agents, and ChromaDB that\ngenerated model-specific prompts for I2V models (Seedance, Veo2, Hailuo, etc.), boosting video generation quality and coherence by 80%.",
						_margin: [0, 0, 0, 6],
						_inlines: [],
						_minWidth: 49.072265625,
						_maxWidth: 610.185546875,
						listMarker: {
							canvas: [
								{
									x: 41.666666666666664,
									y: 373.8190104166667,
									r1: 1.6666666666666667,
									r2: 1.6666666666666667,
									type: "ellipse",
									color: "#413e3e",
								},
							],
							_maxWidth: 10.7373046875,
							_minWidth: 10.7373046875,
							_maxHeight: 15.234375,
							_minHeight: 15.234375,
						},
						positions: [
							{
								pageNumber: 1,
								pageOrientation: "portrait",
								pageInnerHeight: 781.89,
								pageInnerWidth: 535.28,
								left: 50.7373046875,
								top: 367.875,
								verticalRatio: 0.44491552520175476,
								horizontalRatio: 0.02005923009920042,
							},
							{
								pageNumber: 1,
								pageOrientation: "portrait",
								pageInnerHeight: 781.89,
								pageInnerWidth: 535.28,
								left: 50.7373046875,
								top: 383.109375,
								verticalRatio: 0.46439956387727177,
								horizontalRatio: 0.02005923009920042,
							},
							{
								pageNumber: 1,
								pageOrientation: "portrait",
								pageInnerHeight: 781.89,
								pageInnerWidth: 535.28,
								left: 50.7373046875,
								top: 398.34375,
								verticalRatio: 0.4838836025527888,
								horizontalRatio: 0.02005923009920042,
							},
						],
						style: "text",
					},
					{
						text: "Integrated Generative AI (GPT, Azure OpenAI, Claude) into workflows with LangChain, LangGraph,\nLangSmith, Pinecone, and ChromaDB, enabling intelligent agents, RAG pipelines, and semantic search\nthat automated decision-making and accelerated product delivery.",
						_margin: [0, 0, 0, 6],
						_inlines: [],
						_minWidth: 51.7919921875,
						_maxWidth: 449.609375,
						listMarker: {
							canvas: [
								{
									x: 41.666666666666664,
									y: 425.5221354166667,
									r1: 1.6666666666666667,
									r2: 1.6666666666666667,
									type: "ellipse",
									color: "#413e3e",
								},
							],
							_maxWidth: 10.7373046875,
							_minWidth: 10.7373046875,
							_maxHeight: 15.234375,
							_minHeight: 15.234375,
						},
						positions: [
							{
								pageNumber: 1,
								pageOrientation: "portrait",
								pageInnerHeight: 781.89,
								pageInnerWidth: 535.28,
								left: 50.7373046875,
								top: 419.578125,
								verticalRatio: 0.5110413549220478,
								horizontalRatio: 0.02005923009920042,
							},
							{
								pageNumber: 1,
								pageOrientation: "portrait",
								pageInnerHeight: 781.89,
								pageInnerWidth: 535.28,
								left: 50.7373046875,
								top: 434.8125,
								verticalRatio: 0.5305253935975649,
								horizontalRatio: 0.02005923009920042,
							},
							{
								pageNumber: 1,
								pageOrientation: "portrait",
								pageInnerHeight: 781.89,
								pageInnerWidth: 535.28,
								left: 50.7373046875,
								top: 450.046875,
								verticalRatio: 0.5500094322730819,
								horizontalRatio: 0.02005923009920042,
							},
						],
						style: "text",
					},
					{
						text: "Architected distributed microservices on AWS Lambda for video encoding, reducing processing time by 35%+ while ensuring high availability and fault tolerance.",
						_margin: [0, 0, 0, 6],
						_inlines: [],
						_minWidth: 62.34375,
						_maxWidth: 708.6474609375,
						listMarker: {
							canvas: [
								{
									x: 41.666666666666664,
									y: 477.2252604166667,
									r1: 1.6666666666666667,
									r2: 1.6666666666666667,
									type: "ellipse",
									color: "#413e3e",
								},
							],
							_maxWidth: 10.7373046875,
							_minWidth: 10.7373046875,
							_maxHeight: 15.234375,
							_minHeight: 15.234375,
						},
						positions: [
							{
								pageNumber: 1,
								pageOrientation: "portrait",
								pageInnerHeight: 781.89,
								pageInnerWidth: 535.28,
								left: 50.7373046875,
								top: 471.28125,
								verticalRatio: 0.577167184642341,
								horizontalRatio: 0.02005923009920042,
							},
							{
								pageNumber: 1,
								pageOrientation: "portrait",
								pageInnerHeight: 781.89,
								pageInnerWidth: 535.28,
								left: 50.7373046875,
								top: 486.515625,
								verticalRatio: 0.596651223317858,
								horizontalRatio: 0.02005923009920042,
							},
						],
						style: "text",
					},
				],
				_margin: [0, 0, 0, 6],
				type: "disc",
				_gapSize: {
					width: 10.7373046875,
					height: 15.234375,
					fontSize: 10,
					lineHeight: 1.3,
					ascender: 9.27734375,
					descender: -2.44140625,
				},
				_minWidth: 73.0810546875,
				_maxWidth: 719.384765625,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 50.7373046875,
						top: 367.875,
						verticalRatio: 0.44491552520175476,
						horizontalRatio: 0.02005923009920042,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 50.7373046875,
						top: 383.109375,
						verticalRatio: 0.46439956387727177,
						horizontalRatio: 0.02005923009920042,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 50.7373046875,
						top: 398.34375,
						verticalRatio: 0.4838836025527888,
						horizontalRatio: 0.02005923009920042,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 50.7373046875,
						top: 419.578125,
						verticalRatio: 0.5110413549220478,
						horizontalRatio: 0.02005923009920042,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 50.7373046875,
						top: 434.8125,
						verticalRatio: 0.5305253935975649,
						horizontalRatio: 0.02005923009920042,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 50.7373046875,
						top: 450.046875,
						verticalRatio: 0.5500094322730819,
						horizontalRatio: 0.02005923009920042,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 50.7373046875,
						top: 471.28125,
						verticalRatio: 0.577167184642341,
						horizontalRatio: 0.02005923009920042,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 50.7373046875,
						top: 486.515625,
						verticalRatio: 0.596651223317858,
						horizontalRatio: 0.02005923009920042,
					},
				],
				chosen: false,
				selected: false,
				style: "text",
			},
			{
				text: "PROJECTS",
				_margin: [0, 8, 0, 6],
				_inlines: [],
				_minWidth: 59.07421875,
				_maxWidth: 59.07421875,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 521.75,
						verticalRatio: 0.641714307639182,
						horizontalRatio: 0,
					},
				],
				style: "sectionHeader",
				chosen: false,
				selected: false,
			},
			{
				text: [
					{
						text: "JS SERVE",
						style: "entryTitle",
					},
				],
				_margin: null,
				_inlines: [],
				_minWidth: 33.0107421875,
				_maxWidth: 48.51708984375,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 541.8125,
						verticalRatio: 0.667373287802632,
						horizontalRatio: 0,
					},
				],
				chosen: false,
			},
			{
				ul: [
					{
						text: "List item 1",
						_margin: null,
						_inlines: [],
						_minWidth: 23.73046875,
						_maxWidth: 55.927734375,
						listMarker: {
							canvas: [
								{
									x: 42,
									y: 561.8359375,
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
								top: 554.703125,
								verticalRatio: 0.6838597820665311,
								horizontalRatio: 0.024071076119040503,
							},
						],
					},
					{
						text: "List item 2",
						_margin: null,
						_inlines: [],
						_minWidth: 23.73046875,
						_maxWidth: 55.927734375,
						listMarker: {
							canvas: [
								{
									x: 42,
									y: 575.8984375,
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
								top: 568.765625,
								verticalRatio: 0.7018450485362391,
								horizontalRatio: 0.024071076119040503,
							},
						],
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
				_minWidth: 36.615234375,
				_maxWidth: 68.8125,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 52.884765625,
						top: 554.703125,
						verticalRatio: 0.6838597820665311,
						horizontalRatio: 0.024071076119040503,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 52.884765625,
						top: 568.765625,
						verticalRatio: 0.7018450485362391,
						horizontalRatio: 0.024071076119040503,
					},
				],
			},
			{
				text: [
					{
						text: "Write something here",
					},
				],
				_margin: null,
				_inlines: [],
				_minWidth: 56.7421875,
				_maxWidth: 113.783203125,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 40,
						top: 582.828125,
						verticalRatio: 0.7198303150059472,
						horizontalRatio: 0,
					},
				],
			},
			{
				ul: [
					{
						text: "List item 1",
						_margin: null,
						_inlines: [],
						_minWidth: 23.73046875,
						_maxWidth: 55.927734375,
						listMarker: {
							canvas: [
								{
									x: 42,
									y: 604.0234375,
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
								top: 596.890625,
								verticalRatio: 0.7378155814756552,
								horizontalRatio: 0.024071076119040503,
							},
						],
					},
					{
						text: "List item 2",
						_margin: null,
						_inlines: [],
						_minWidth: 23.73046875,
						_maxWidth: 55.927734375,
						listMarker: {
							canvas: [
								{
									x: 42,
									y: 618.0859375,
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
								top: 610.953125,
								verticalRatio: 0.7558008479453632,
								horizontalRatio: 0.024071076119040503,
							},
						],
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
				_minWidth: 36.615234375,
				_maxWidth: 68.8125,
				positions: [
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 52.884765625,
						top: 596.890625,
						verticalRatio: 0.7378155814756552,
						horizontalRatio: 0.024071076119040503,
					},
					{
						pageNumber: 1,
						pageOrientation: "portrait",
						pageInnerHeight: 781.89,
						pageInnerWidth: 535.28,
						left: 52.884765625,
						top: 610.953125,
						verticalRatio: 0.7558008479453632,
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
				text: "",
				fontSize: 10,
				bold: false,
				italics: false,
				color: "#555555",
				margin: [0, 0, 0, 16],
				alignment: "center",
				lineHeight: 1,
				characterSpacing: 0,
				noWrap: false,
				opacity: 1,
			},
			sectionHeader: {
				text: "",
				fontSize: 12,
				bold: true,
				italics: false,
				color: "#2a2a2a",
				decoration: "underline",
				margin: [0, 8, 0, 6],
				alignment: "left",
				lineHeight: 1,
				characterSpacing: 0,
				noWrap: false,
				opacity: 1,
			},
			text: {
				text: "",
				fontSize: 10,
				bold: false,
				italics: false,
				color: "#413e3e",
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
				text: "",
				fontSize: 11,
				bold: true,
				italics: false,
				color: "#222222",
				margin: [0, 2, 0, 0],
				alignment: "left",
				lineHeight: 1,
				characterSpacing: 0,
				noWrap: false,
				opacity: 1,
			},
			entryDate: {
				fontSize: 9,
				italics: true,
				color: "#666666",
				margin: [0, 2, 0, 0],
			},
			entrySubtitle: {
				text: "",
				fontSize: 10,
				bold: false,
				italics: true,
				color: "#555555",
				margin: [0, 0, 0, 4],
				alignment: "left",
				lineHeight: 1,
				characterSpacing: 0,
				noWrap: false,
				opacity: 1,
			},
			link: {
				fontSize: 10,
				color: "#1565c0",
				decoration: "underline",
			},
			"text-bold": {
				text: "",
				fontSize: 10,
				bold: true,
				italics: false,
				color: "#313030",
				margin: [0, 0, 0, 6],
				alignment: "left",
				lineHeight: 1.3,
				characterSpacing: 0,
				noWrap: false,
				opacity: 1,
			},
			entryTitleLink: {
				text: "",
				fontSize: 11,
				bold: true,
				italics: false,
				color: "#222222",
				margin: [0, 2, 0, 0],
				alignment: "left",
				lineHeight: 1,
				characterSpacing: 0,
				noWrap: false,
				opacity: 1,
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
								<Input
									// value={JSON.stringify(docDef, null, 2)}
									onChange={(e) => {
										setDocDef(JSON.parse(e.target.value));
									}}
									placeholder="Enter the config here"
								/>

								<ConfigEditor docDef={docDef} onChange={setDocDef} />
							</CardContent>
						</Card>
					</div>
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
