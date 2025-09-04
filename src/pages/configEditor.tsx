import Dropdown from "@/components/custom/dropdown";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import StyleEditor, { NumberField } from "./styleEditor";
import { Textarea } from "@/components/ui/textarea";
import { CrossButton } from "@/components/custom/deleteButton";
import DragHandle from "@/components/custom/dragHandle";
import RichPdfMakeTextEditor from "@/components/custom/richPdfMakeTextEditor";

export const BLOCK_TYPE = {
	TEXT: "text",
	UL: "ul",
	OL: "ol",
};

export default function ConfigEditor({ docDef, onChange }: { docDef: any; onChange: (newDocDef: any) => void }) {
	const styleList = Object.keys(docDef.styles ?? {}).map((ele) => ({ label: ele, value: ele }));

	const [selectedElementType, setSelectedElementType] = useState<string>("text");

	const elementTypeList = Object.keys(BLOCK_TYPE).map((key) => ({ label: key, value: BLOCK_TYPE[key as keyof typeof BLOCK_TYPE] }));

	function updateDocDef(key: string, val: any) {
		onChange({ ...docDef, [key]: val });
	}

	function updateDocDefContent(inx: number, val: any) {
		if (val == null) {
			docDef.content.splice(inx, 1);
			onChange({ ...docDef });
			return;
		}
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

	function getDefaultItem(type: string): any {
		switch (type) {
			case BLOCK_TYPE.TEXT:
				return { text: [{ text: "t" }, { text: "e" }, { text: "x" }, { text: "t" }] };
			case BLOCK_TYPE.UL:
				return { ul: [getDefaultItem(BLOCK_TYPE.TEXT)] };
			case BLOCK_TYPE.OL:
				return { ol: [getDefaultItem(BLOCK_TYPE.TEXT)] };
			default:
				return { text: [{ text: "t" }, { text: "e" }, { text: "x" }, { text: "t" }] };
		}
	}

	function handleTextRendering(ele: any, onUpdate?: (newVal?: any) => void) {
		if (Array.isArray(ele.text)) {
			return (
				<div className="space-y-2">
					<div className="flex gap-2">
						<DragHandle />
						<Label className="text-[14px] font-bold uppercase tracking-wider text-muted-foreground">Text Array</Label>
					</div>
					<div className="flex gap-2">
						<Dropdown
							label="Select Predefined Style"
							list={styleList}
							initialVal={ele.style}
							onSelect={({ value }) => {
								onUpdate && onUpdate({ ...ele, style: value });
							}}
						/>
						<CrossButton
							onClick={() => {
								onUpdate && onUpdate(null);
							}}
						/>
					</div>
					<Separator />
					<RichPdfMakeTextEditor
						config={ele}
						onUpdate={(config) => {
							onUpdate && onUpdate(config);
						}}
					/>
				</div>
			);
		}

		if (typeof ele === "string") {
			return (
				<div className="space-y-2">
					<div className="flex gap-2">
						<DragHandle />
						<Label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Simple Text</Label>
					</div>
					<div className="flex gap-2">
						<Input
							value={ele}
							onChange={(e) => {
								const newText = e.target.value;
								onUpdate && onUpdate(newText);
							}}
						/>
						<CrossButton
							onClick={() => {
								onUpdate && onUpdate(null);
							}}
						/>
					</div>
				</div>
			);
		}

		return (
			<div className="space-y-2">
				<div className="flex gap-2">
					<DragHandle />
					<Label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">text</Label>
				</div>
				<div className="flex gap-2">
					<Textarea
						value={ele.text}
						onChange={(e) => {
							const newText = e.target.value;
							onUpdate && onUpdate({ ...ele, text: newText });
						}}
					/>

					<CrossButton
						onClick={() => {
							onUpdate && onUpdate(null);
						}}
					/>
				</div>
				<Dropdown
					label="Select Text Style"
					list={styleList}
					initialVal={ele.style}
					onSelect={({ value }) => {
						onUpdate && onUpdate({ ...ele, style: value });
					}}
				/>
			</div>
		);
	}

	function handleUlRendering(ele: any, onUpdate?: (newVal: any) => void) {
		if (!Array.isArray(ele?.ul) && !Array.isArray(ele.ol)) return <></>;
		const LIST_TYPE = ele.hasOwnProperty("ul") ? "ul" : "ol";
		const LIST_TITLE = ele.hasOwnProperty("ul") ? "Un-Ordered List" : "Ordered List";

		const updateHandler = (listindex: number, newItems: any[]) => {
			if (newItems == null) {
				ele[LIST_TYPE].splice(listindex, 1);
				onUpdate && onUpdate({ ...ele });
				return;
			}

			const updatedUl = [...ele[LIST_TYPE]];
			updatedUl[listindex] = newItems;
			onUpdate && onUpdate({ ...ele, [LIST_TYPE]: updatedUl });
		};

		const addItem = (itemType: string) => {
			onUpdate && onUpdate({ ...ele, [LIST_TYPE]: [...ele[LIST_TYPE], getDefaultItem(itemType)] });
		};

		return (
			<div>
				<Separator className="my-1 bg-border" />
				<Dropdown
					label={`Select List Style`}
					list={styleList}
					initialVal={ele.style}
					onSelect={({ value }) => {
						onUpdate && onUpdate({ ...ele, style: value });
					}}
				/>
				<CrossButton
					onClick={() => {
						onUpdate && onUpdate(null);
					}}
				/>
				<Accordion type="single" collapsible>
					<AccordionItem value="item-1">
						<AccordionTrigger>
							<Label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{LIST_TITLE} Items</Label>
						</AccordionTrigger>
						<AccordionContent>
							<div className="mt-4 flex flex-col gap-2.5 pl-5 space-y-1.5 text-sm leading-6 text-foreground">
								{ele[LIST_TYPE].map((item: any, listindex: number) => {
									if (typeof item === "string" || item?.hasOwnProperty("text")) {
										return (
											<div className="relative">
												{/* shadcn-colored bullet */}
												<span className="absolute -left-4 top-2 block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "hsl(var(--muted-foreground))" }} />
												{handleTextRendering(item, (newVal) => updateHandler(listindex, newVal))}
											</div>
										);
									}
									return null;
								})}
								<div className="flex gap-2 mt-2">
									<Dropdown label="Select Block to add" list={[{ label: "Text", value: "text" }]} />
									<Button variant={"outline"} onClick={() => addItem(BLOCK_TYPE.TEXT)}>
										Add List Item
									</Button>
								</div>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<Accordion type="single" collapsible>
				<AccordionItem value="item-1">
					<AccordionTrigger>
						<Label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Page Settings</Label>
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
				<Button variant={"outline"} onClick={() => addNewElementToDocDef(selectedElementType)}>
					Add Item
				</Button>
			</div>

			{docDef?.content.map((ele: any, idx: number) => {
				const renderBlock = () => {
					if (ele.hasOwnProperty("text")) {
						return handleTextRendering(ele, (newVal) => updateDocDefContent(idx, newVal));
					}

					if (ele.hasOwnProperty("ul") || ele.hasOwnProperty("ol")) {
						return handleUlRendering(ele, (newVal) => updateDocDefContent(idx, newVal));
					}

					return handleTextRendering(ele, (newVal) => updateDocDefContent(idx, newVal));
				};

				return (
					<div key={idx} className="rounded-md border bg-muted/30 p-4 shadow-sm">
						{renderBlock()}
					</div>
				);
			})}

			<Separator />
			<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Styles</h2>
			<div className="flex gap-2 mt-2">
				<Input placeholder="Enter style name" />
				<Button variant={"outline"}>Add new Style</Button>
			</div>

			{styleList.map(({ value }) => {
				const styleKey = value;
				const styleConf = docDef?.styles[styleKey];

				return (
					<Accordion type="single" collapsible>
						<AccordionItem value="item-1">
							<AccordionTrigger>
								<Label className="text-[12px] font-medium font-bold uppercase tracking-wider text-muted-foreground">{styleKey}</Label>
							</AccordionTrigger>
							<AccordionContent>
								<StyleEditor
									value={styleConf}
									onChangeNode={(chnages) => {
										updateDocDef("styles", { ...docDef.styles, [styleKey]: chnages });
									}}
								/>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				);
			})}
		</div>
	);
}
