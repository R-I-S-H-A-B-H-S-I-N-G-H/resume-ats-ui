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
        pageSize: 'A4',
        content: [],
        styles: {},
        defaultStyle: { fontSize: 14 }
    });


    useEffect(() => {
        const initialDocDef: TDocumentDefinitions = {
            pageSize: 'A4',
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

                // Technical Skills
                { text: 'Technical Skills', },
                { text: 'AI & ML', bold: true, margin: [0, 0, 0, 2] },
                {
                    ul: [
                        { text: 'LLMs (GPT-4, OSS), LangChain, LangGraph, LangSmith' },
                        { text: 'RAG, embeddings, semantic search, agent memory, tool chaining' },
                        { text: 'OpenAI API, Pinecone, ChromaDB' },
                    ],
                    margin: [0, 0, 0, 6],
                },
                { text: 'Languages', bold: true, margin: [0, 0, 0, 2] },
                {
                    ul: [
                        { text: 'Java, C++, JavaScript/TypeScript, Python, Go, HTML/CSS, REST' },
                    ],
                    margin: [0, 0, 0, 6],
                },
                { text: 'Frameworks & Datastores', bold: true, margin: [0, 0, 0, 2] },
                {
                    ul: [
                        { text: 'Spring Boot, React, Next.js, MySQL, Apache Druid' },
                    ],
                    margin: [0, 0, 0, 2],
                },

                // Experience
                { text: 'Professional Experience' },
                { text: 'Software Development Engineer — TechCrumb', },
                { text: 'Jan 2023 – Present · Delhi, India' },
                {
                    ul: [
                        {
                            text:
                                'Built an AI system (Python, FastAPI, LangGraph, ChromaDB) generating model-specific prompts for I2V models (Seedance, Veo2, Hailuo…), improving video quality/coherence by ~80%.',
                        },
                        {
                            text:
                                'Integrated GPT/Azure OpenAI/Claude with LangChain/LangGraph/LangSmith + Pinecone/ChromaDB to power agents, RAG, and semantic search—automating decisions and accelerating delivery.',
                        },
                        {
                            text:
                                'Architected distributed microservices on AWS Lambda for video encoding; reduced processing time by 35%+ with HA and fault tolerance.',
                        },
                    ],
                },

                // Projects
                { text: 'Projects' },
                { text: 'JS SERVE', bold: true, margin: [0, 0, 0, 2] },
                {
                    ul: [
                        { text: 'Instant file hosting with public URLs; smooth uploads (Express, AWS S3, React).' },
                        { text: 'Live', link: 'https://jsserve.pages.dev/', style: 'small' },
                        { text: 'Backend source', link: 'https://github.com/R-I-S-H-A-B-H-S-I-N-G-H/js-serve-backend' },
                    ],
                    margin: [0, 0, 0, 6],
                },

                { text: 'Metro Route', bold: true, margin: [0, 0, 0, 2] },
                {
                    ul: [
                        { text: 'Offline shortest-path finder between stations (BFS).' },
                        { text: 'Source', link: 'https://github.com/R-I-S-H-A-B-H-S-I-N-G-H/Metro-Route' },
                    ],
                    margin: [0, 0, 0, 2],
                },

                // Achievements
                { text: 'Achievements' },
                {
                    ul: [{ text: 'LeetCode peak rating 1781 (~top 8%).' }],
                },

                // Education
                { text: 'Education' },
                { text: 'B.Tech — Computer Science Engineering' },
                { text: 'Echelon Institute of Engineering, Faridabad' },
                { text: 'Aug 2019 – Jul 2023 · CGPA: 8.2 · Faridabad, India', },

                // Keywords
                {
                    margin: [0, 10, 0, 0],
                    text:
                        'Keywords: Java · Spring Boot · Kafka · MySQL · React · Next.js · Python · LangChain · LangGraph · RAG · Pinecone · ChromaDB · AWS Lambda',
                },
            ],
            styles: {
            },
            defaultStyle: { fontSize: 14 },
            pageMargins: [40, 60, 40, 60], // left, top, right, bottom
        };
        setDocDef(initialDocDef);
    }, [])




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
                                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                    Add blocks
                                </h4>
                                <Button
                                    variant={"outline"}
                                    onClick={() => {
                                        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(docDef, null, 2));
                                        const downloadAnchorNode = document.createElement('a');
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
                        <iframe
                            src={pdfUrl + "#toolbar=0&navpanes=0"}
                            className="w-full h-full border-none"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            Generating PDF…
                        </div>
                    )}
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
