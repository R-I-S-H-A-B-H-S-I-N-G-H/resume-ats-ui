import { useRef, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Bold, Italic, LinkIcon, PaintBucket, Type, Underline } from "lucide-react";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const STYLE_TYPE = {
	BOLD: "bold",
	ITALICS: "italics",
	LINK: "link",
	DECORATION: "decoration",
	COLOR: "color",
	FONT_SIZE: "fontSize",
};

export default function RichPdfMakeTextEditor({ config, onUpdate = () => {} }: { config: any; onUpdate?: (config: any) => void }) {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const [textVal, setTextVal] = useState<string>(convertConfigToText());
	const [styleConf, setStyleConf] = useState<{ link: string; color: string; fontSize: number }>({ link: "", color: "", fontSize: 12 });

	function convertConfigToText() {
		if (typeof config.text === "string") return config.text;
		if (!Array.isArray(config.text)) return "";
		const res = config.text.map((ele: any) => ele.text).join("");
		return res;
	}

	function onTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		const val = e.target.value;
		setTextVal(val);
		if (!val || typeof val !== "string") {
			config.text = [];
			onUpdate(config);
			return;
		}

		val.split("").forEach((char, i) => {
			if (config.text.length <= i) {
				config.text.push({ text: char });
			}
			config.text[i]["text"] = char;
		});

		onUpdate(config);
	}

	function getSelectedRange() {
		if (!textareaRef.current) {
			return { start: -1, end: -1 };
		}
		const start = textareaRef.current.selectionStart;
		const end = textareaRef.current.selectionEnd;
		return { start, end };
	}

	function logCursor() {
		if (!textareaRef.current) {
			return;
		}
	}

	function setStyleHelper(_config: any, key: string, val?: any) {
		const selectedRange = getSelectedRange();

		for (let index = selectedRange.start; index < selectedRange.end; index++) {
			if (_config.text[index] === undefined) continue;
			if (val) {
				let settingVal = val;
				if (settingVal == _config.text[index][key]) settingVal = null;
				_config.text[index][key] = settingVal;
				continue;
			}

			_config.text[index][key] = !!!_config.text[index][key];
		}
		return _config;
	}

	function setStyle(type: string, val?: any) {
		if (type == STYLE_TYPE.BOLD) config = setStyleHelper(config, "bold");
		else if (type == STYLE_TYPE.ITALICS) config = setStyleHelper(config, "italics");
		else if (type == STYLE_TYPE.LINK) {
			config = setStyleHelper(config, "link", val);
			config = setStyleHelper(config, "decoration", "underline");
			config = setStyleHelper(config, "color", "darkblue");
		} else if (type == STYLE_TYPE.DECORATION && val) config = setStyleHelper(config, "decoration", val);
		else config = setStyleHelper(config, type, val);

		onUpdate(config);
	}

	return (
		<Card className="w-full max-w-2xl border border-muted-foreground/10 shadow-sm">
			<CardContent className="p-3 sm:p-4 space-y-3">
				<TooltipProvider delayDuration={200}>
					{/* Toolbar */}
					<div className="flex flex-wrap items-center gap-1.5">
						{/* Core actions */}
						<ToolIcon label="Bold" onClick={() => setStyle(STYLE_TYPE.BOLD)}>
							<Bold className="h-4 w-4" />
						</ToolIcon>
						<ToolIcon label="Italic" onClick={() => setStyle(STYLE_TYPE.ITALICS)}>
							<Italic className="h-4 w-4" />
						</ToolIcon>
						<ToolIcon label="Underline" onClick={() => setStyle(STYLE_TYPE.DECORATION, "underline")}>
							<Underline className="h-4 w-4" />
						</ToolIcon>

						<Separator orientation="vertical" className="h-5 mx-1" />

						{/* Formatting dropdown */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button type="button" variant="outline" size="sm" className="gap-1.5">
									<Type className="h-4 w-4" />
									<ChevronDown className="h-3.5 w-3.5" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start" className="w-64">
								<DropdownMenuLabel>Text Options</DropdownMenuLabel>
								<div className="px-2 py-1.5 space-y-3">
									{/* Font size */}
									<div className="space-y-1">
										<Label htmlFor="fontSize" className="text-xs text-muted-foreground">
											Font size
										</Label>
										<div className="flex items-center gap-2">
											<Input
												id="fontSize"
												type="number"
												min={8}
												max={96}
												step={1}
												className="h-8"
												value={styleConf.fontSize ?? ""}
												onChange={(e) => setStyleConf({ ...styleConf, fontSize: Number.parseInt(e.target.value || "0", 10) })}
											/>
											<Button type="button" size="sm" variant="secondary" onClick={() => setStyle(STYLE_TYPE.FONT_SIZE, styleConf.fontSize)}>
												Apply
											</Button>
										</div>
									</div>

									{/* Color */}
									<div className="space-y-1">
										<Label htmlFor="fontColor" className="text-xs text-muted-foreground">
											Font color
										</Label>
										<div className="flex items-center gap-2">
											<div className="flex items-center gap-2 rounded-md border px-2 py-1">
												<PaintBucket className="h-4 w-4" />
												<input
													id="fontColor"
													type="color"
													className="h-6 w-10 border-0 bg-transparent p-0"
													value={styleConf.color ?? "#000000"}
													onChange={(e) => setStyleConf({ ...styleConf, color: e.target.value })}
												/>
											</div>
											<Button type="button" size="sm" variant="secondary" onClick={() => setStyle(STYLE_TYPE.COLOR, styleConf.color)}>
												Apply
											</Button>
										</div>
									</div>

									{/* Link */}
									<div className="space-y-1">
										<Label htmlFor="linkInput" className="text-xs text-muted-foreground">
											Link URL
										</Label>
										<div className="flex items-center gap-2">
											<Input
												id="linkInput"
												type="url"
												inputMode="url"
												className="h-8"
												placeholder="https://example.com"
												value={styleConf.link ?? ""}
												onChange={(e) => setStyleConf({ ...styleConf, link: e.target.value })}
											/>
											<Button type="button" size="sm" variant="default" onClick={() => setStyle(STYLE_TYPE.LINK, styleConf.link)}>
												<LinkIcon className="h-4 w-4 mr-1" />
												Add
											</Button>
										</div>
									</div>
								</div>

								<DropdownMenuSeparator />
								<DropdownMenuItem className="text-xs text-muted-foreground cursor-default focus:bg-transparent" disabled>
									Tips: ⌘/Ctrl+B, ⌘/Ctrl+I, ⌘/Ctrl+U
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</TooltipProvider>

				{/* Editor */}
				<Textarea
					ref={textareaRef}
					value={textVal}
					onChange={onTextChange}
					onClick={logCursor}
					onKeyUp={logCursor}
					placeholder="Start typing…"
					className="min-h-40 resize-y text-sm leading-6"
				/>
			</CardContent>
		</Card>
	);
}

/** Small icon-only button with tooltip */
function ToolIcon({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button type="button" variant="ghost" size="icon" aria-label={label} onClick={onClick} className="h-8 w-8">
					{children}
				</Button>
			</TooltipTrigger>
			<TooltipContent side="bottom">{label}</TooltipContent>
		</Tooltip>
	);
}