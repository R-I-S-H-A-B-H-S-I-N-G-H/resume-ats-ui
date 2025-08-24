import Dropdown from "@/components/custom/dropdown";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import StyleEditor, { NumberField } from "./styleEditor";

export const BLOCK_TYPE = {
    // SIMPLE_TEXT: "simple-text",
    TEXT: "text",

    TEXT_ARRAY: "text-array",
    UL: "ul",
    OL: "ol",
    // SECTION: "section",
    // COLUMNS: "columns",
    // IMAGE: "image",

}

export default function ConfigEditor({ docDef, onChange }: { docDef: any, onChange: (newDocDef: any) => void }) {
    const [selectedElementType, setSelectedElementType] = useState<string>("text");

    const elementTypeList = Object.keys(BLOCK_TYPE).map((key) => ({ label: key, value: BLOCK_TYPE[key as keyof typeof BLOCK_TYPE] }));

    function updateDocDef(key: string, val: any) {
        onChange({ ...docDef, [key]: val });
    }

    function updateDocDefContent(inx: number, val: any) {
        docDef.content[inx] = { ...docDef.content[inx], ...val };
        onChange({ ...docDef });
    }

    function addNewElementToDocDef(type: string) {
        if (!type) {
            console.warn("Element type is required to add new element");
            return;
        }
        const newItem = getDefaultItem(type);
        const updatedContent = [...docDef.content, newItem];
        onChange({ ...docDef, content: updatedContent });

    }

    function getDefaultItem(type: string) {
        switch (type) {
            case BLOCK_TYPE.TEXT_ARRAY:
                return { text: [{ text: "Write something here" }] };
            case BLOCK_TYPE.TEXT:
                return { text: "Write something here" };
            case BLOCK_TYPE.UL:
                return { ul: ["List item 1", "List item 2"] };
            case BLOCK_TYPE.OL:
                return { ol: ["List item 1", "List item 2"] };
            default:
                return { text: "Write something here" };
        }

    }

    function handleTextRendering(ele: any, onUpdate?: (newVal: any) => void) {
        if (Array.isArray(ele.text)) {
            return (
                <div className="space-y-2">
                    <Label
                        className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                    >
                        Text Array
                    </Label>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <Label
                                    className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                                >
                                    Text Array Style Options
                                </Label>
                            </AccordionTrigger>
                            <AccordionContent>
                                <StyleEditor
                                    text={ele.text}
                                    onChangeNode={(node) => {
                                        onUpdate && onUpdate({ ...ele, ...node })
                                    }}

                                    value={ele ?? {}}
                                />
                            </AccordionContent>

                        </AccordionItem>
                    </Accordion>
                    <Separator />
                    {ele.text.map((textItem: any, idx: number) => (
                        <div key={idx} className="mb-2">
                            {handleTextRendering(textItem, (newVal) => {
                                const updatedTextArray = [...ele.text];
                                updatedTextArray[idx] = newVal;
                                onUpdate && onUpdate({ ...ele, text: updatedTextArray });
                            })}
                        </div>
                    ))}
                    <Button
                        variant={"link"}
                        onClick={() => {
                            const updatedTextArray = [...ele.text, getDefaultItem("text")];
                            onUpdate && onUpdate({ ...ele, text: updatedTextArray });
                        }}
                    >Add Text</Button>
                </div>
            )
        }


        if (typeof ele === 'string') {
            return (
                <div className="space-y-2">
                    <Label
                        className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                    >
                        Simple Text
                    </Label>
                    <Input value={ele} onChange={(e) => {
                        const newText = e.target.value;
                        onUpdate && onUpdate(newText);
                    }} />
                </div>
            )
        }

        return (
            <div className="space-y-2">
                <Label
                    className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                >
                    text
                </Label>
                <Input value={ele.text} onChange={(e) => {
                    const newText = e.target.value;
                    onUpdate && onUpdate({ ...ele, text: newText })
                }} />
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <Label
                                className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                            >
                                Style Options
                            </Label>
                        </AccordionTrigger>
                        <AccordionContent>
                            <StyleEditor
                                text={ele.text}
                                onChangeNode={(node) => {
                                    onUpdate && onUpdate({ ...ele, ...node })
                                }}

                                value={ele ?? {}}
                            />
                        </AccordionContent>

                    </AccordionItem>
                </Accordion>
            </div >
        )
    }

    function handleUlRendering(ele: any, onUpdate?: (newVal: any) => void) {
        if (!Array.isArray(ele?.ul) && !Array.isArray(ele.ol)) return <></>;
        const LIST_TYPE = ele.hasOwnProperty("ul") ? "ul" : "ol";
        const LIST_TITLE = ele.hasOwnProperty("ul") ? "Un-Ordered List" : "Ordered List";

        const updateHandler = (listindex: number, newItems: any[]) => {
            const updatedUl = [...ele[LIST_TYPE]];
            updatedUl[listindex] = newItems;
            onUpdate && onUpdate({ ...ele, [LIST_TYPE]: updatedUl });
        }

        const addItem = (itemType: string) => {
            onUpdate && onUpdate({ ...ele, [LIST_TYPE]: [...ele[LIST_TYPE], { [itemType]: "Write something here" }] });
        }

        return (

            <div >
                <Separator className="my-1 bg-border" />
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <Label
                                className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                            >
                                {LIST_TITLE} Items
                            </Label>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="mt-4 flex flex-col gap-2.5 pl-5 space-y-1.5 text-sm leading-6 text-foreground">
                                {ele[LIST_TYPE].map((item: any, listindex: number) => {
                                    if (typeof item === "string" || item?.hasOwnProperty("text")) {
                                        return (
                                            <div className="relative">
                                                {/* shadcn-colored bullet */}
                                                <span
                                                    className="absolute -left-4 top-2 block h-1.5 w-1.5 rounded-full"
                                                    style={{ backgroundColor: "hsl(var(--muted-foreground))" }}
                                                />
                                                {handleTextRendering(item, (newVal) => updateHandler(listindex, newVal))}
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                                <div className="flex gap-2 mt-2">
                                    <Dropdown list={[{ label: "Text", value: "text" }]} />
                                    <Button
                                        variant={"outline"}
                                        onClick={() => addItem("text")}
                                    >
                                        Add List Item
                                    </Button>
                                </div>

                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div >
        );
    }

    return (
        <div className="space-y-6">
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <Label
                            className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground"
                        >
                            Page Settings
                        </Label>
                    </AccordionTrigger>
                    <AccordionContent>
                        <section className="grid gap-4">
                            <div className="text-sm font-medium">Margin (left, top, right, bottom)</div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-1.5">
                                <NumberField
                                    id="ml"
                                    label="Left-Margin"
                                    value={docDef?.pageMargins?.[0]}
                                    onChange={(n) => {
                                        docDef.pageMargins[0] = n;
                                        updateDocDef("pageMargins", [...docDef.pageMargins]);
                                    }}
                                />
                                <NumberField
                                    id="ml"
                                    label="Top-Margin"
                                    value={docDef?.pageMargins?.[1]}
                                    onChange={(n) => {
                                        docDef.pageMargins[1] = n;
                                        updateDocDef("pageMargins", [...docDef.pageMargins]);
                                    }}
                                />
                                <NumberField
                                    id="ml"
                                    label="Right-Margin"
                                    value={docDef?.pageMargins?.[2]}
                                    onChange={(n) => {
                                        docDef.pageMargins[2] = n;
                                        updateDocDef("pageMargins", [...docDef.pageMargins]);
                                    }}
                                />
                                <NumberField
                                    id="ml"
                                    label="Left-Margin"
                                    value={docDef?.pageMargins?.[3]}
                                    onChange={(n) => {
                                        docDef.pageMargins[3] = n;
                                        updateDocDef("pageMargins", [...docDef.pageMargins]);
                                    }}
                                />
                            </div>
                        </section>

                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <div className="flex gap-2 mt-2">
                <Dropdown list={elementTypeList} initialVal={selectedElementType} onSelect={({ value }) => setSelectedElementType(value)} />
                <Button
                    variant={"outline"}
                    onClick={() => addNewElementToDocDef(selectedElementType)}
                >
                    Add Item
                </Button>
            </div>
            {docDef?.content.map((ele: any, idx: number) => {
                if (ele.hasOwnProperty("text")) {
                    return handleTextRendering(ele, (newVal) => updateDocDefContent(idx, newVal));
                }

                if (ele.hasOwnProperty("ul") || ele.hasOwnProperty("ol")) {
                    return handleUlRendering(ele, (newVal) => updateDocDefContent(idx, newVal));
                }

                // default typeis text
                return handleTextRendering(ele, (newVal) => updateDocDefContent(idx, newVal));

            })}
        </div>
    )
}
