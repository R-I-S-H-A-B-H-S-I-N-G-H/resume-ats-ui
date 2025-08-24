// components/StyleEditor.tsx
"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

/* ──────────────────────────────────────────────────────────────────────────── *
 * Types
 * ──────────────────────────────────────────────────────────────────────────── */
export type Alignment = "left" | "center" | "right" | "justify";
export type Decoration = "underline" | "lineThrough" | "overline";
export type DecorationUI = Decoration | "none";
export type DecorationStyle = "solid" | "dashed" | "dotted" | "double" | "wavy";
export type Margin = [number, number, number, number]; // [left, top, right, bottom]

export type PdfTextStyle = {
    font?: string;
    fontSize?: number;
    bold?: boolean;
    italics?: boolean;
    color?: string;

    decoration?: Decoration;
    decorationColor?: string;
    decorationStyle?: DecorationStyle;

    margin?: Margin;
    alignment?: Alignment;
    lineHeight?: number;
    characterSpacing?: number;
    noWrap?: boolean;

    opacity?: number; // 0..1
};

export type PdfTextNode = { text: string } & PdfTextStyle;

export type StyleProps = {link?: string} & PdfTextStyle;

/* ──────────────────────────────────────────────────────────────────────────── *
 * Constants
 * ──────────────────────────────────────────────────────────────────────────── */
const FONT_DEFAULT = "__default__";
const FONT_CUSTOM = "__custom__";

/* ──────────────────────────────────────────────────────────────────────────── *
 * Utils
 * ──────────────────────────────────────────────────────────────────────────── */
function clamp(n: number, min: number, max: number) {
    return Math.min(max, Math.max(min, n));
}

function parseNum(v: string, fallback = 0) {
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
}

function toMargin(m?: number[] | Margin): Margin {
    return Array.isArray(m) && m.length === 4
        ? [m[0], m[1], m[2], m[3]] as Margin
        : [0, 0, 0, 0];
}

function normalizeColorForPicker(c?: string) {
    if (!c) return "#000000";
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(c) ? c : "#000000";
}

function normalizeStyle(s: StyleProps): StyleProps | any {
	const safe = s ?? {};
	return {
		font: safe.font ?? "",
		fontSize: Number.isFinite(safe.fontSize as number) ? (safe.fontSize as number) : 12,
		bold: !!safe.bold,
		italics: !!safe.italics,
		color: safe.color ?? "",
		decoration: safe.decoration,
		decorationColor: safe.decorationColor ?? "",
		decorationStyle: safe.decorationStyle,
		margin: toMargin(safe.margin),
		alignment: (safe.alignment as Alignment) ?? "left",
		lineHeight: Number.isFinite(safe.lineHeight as number) ? (safe.lineHeight as number) : 1.0,
		characterSpacing: Number.isFinite(safe.characterSpacing as number) ? (safe.characterSpacing as number) : 0,
		noWrap: !!safe.noWrap,
		opacity: Number.isFinite(safe.opacity as number) ? clamp(safe.opacity as number, 0, 1) : 1,
		link: s?.link,
	};
}

/** Convert style + text -> pdfmake node (removes empty strings) */
export function styleToPdfTextNode(text: string, style: PdfTextStyle): PdfTextNode {
    const s = normalizeStyle(style);
    const cleaned: PdfTextStyle = {
        ...s,
        color: s.color || undefined,
        decorationColor: s.decorationColor || undefined,
        font: s.font || undefined,
    };
    return { text, ...cleaned };
}

/* ──────────────────────────────────────────────────────────────────────────── *
 * Component
 * ──────────────────────────────────────────────────────────────────────────── */
export default function StyleEditor(props: {
    text?: string;
    value: PdfTextStyle;
    fontOptions?: string[]; // dropdown options
    onChangeStyle?: (style: PdfTextStyle) => void;
    onChangeNode?: (node: PdfTextNode) => void;
}) {
    const {
        text = "",
        value,
        fontOptions = ["Roboto"],
        onChangeStyle = () => { },
        onChangeNode = () => { },
    } = props;

    const [style, setStyle] = React.useState<StyleProps>(() => normalizeStyle(value));

    React.useEffect(() => {
        setStyle(normalizeStyle(value));
    }, [value]);

    const emit = React.useCallback(
		(next: StyleProps) => {
			setStyle(next);
			onChangeStyle(next);
			onChangeNode(styleToPdfTextNode(text, next));
		},
		[onChangeStyle, onChangeNode, text],
	);

    const update = React.useCallback(
		<K extends keyof StyleProps>(key: K, val: StyleProps[K]) => {
			emit({ ...style, [key]: val });
		},
		[emit, style],
	);

    // re-emit when text changes (keep same style)
    React.useEffect(() => {
        onChangeNode(styleToPdfTextNode(text, style));
    }, [text]); // eslint-disable-line react-hooks/exhaustive-deps

    const margin = style.margin ?? [0, 0, 0, 0];

    // Font dropdown state (never empty string for Radix)
    const fontSelect = React.useMemo(() => {
        const current = (style.font ?? "").trim();
        if (!current) return FONT_DEFAULT;
        return fontOptions.includes(current) ? current : FONT_CUSTOM;
    }, [style.font, fontOptions]);

    return (
        <Card className="w-full max-w-3xl rounded-2xl">
            <CardContent className="pt-4 grid gap-8">

                {/* ── Common first ─────────────────────────────────────────────────── */}
                <section className="grid gap-4">
                    <div className="text-sm font-medium">Basics</div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        {/* Font (Dropdown + optional custom) */}
                        <div className="grid gap-2">
                            <Label>Font family</Label>
                            <Select
                                value={fontSelect}
                                onValueChange={(v) => {
                                    if (v === FONT_DEFAULT) return update("font", undefined);
                                    if (v === FONT_CUSTOM) return; // wait for user to type
                                    update("font", v); // one of the presets
                                }}
                            >
                                <SelectTrigger className="h-9">
                                    <SelectValue placeholder="Select a font" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={FONT_DEFAULT}>(Default)</SelectItem>
                                    {fontOptions.map((f) => (
                                        <SelectItem key={f} value={f}>{f}</SelectItem>
                                    ))}
                                    <SelectItem value={FONT_CUSTOM}>Custom…</SelectItem>
                                </SelectContent>
                            </Select>
                            {fontSelect === FONT_CUSTOM && (
                                <Input
                                    placeholder="Type custom font (registered in pdfmake)"
                                    className="h-9"
                                    value={style.font ?? ""}
                                    onChange={(e) => update("font", e.target.value)}
                                />
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="fontSize">Font size (pt)</Label>
                            <Input
                                id="fontSize"
                                type="number"
                                min={1}
                                max={200}
                                step={1}
                                value={style.fontSize ?? 12}
                                onChange={(e) => update("fontSize", clamp(parseNum(e.target.value, 12), 1, 200))}
                                className="h-9"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Bold</Label>
                            <div className="flex items-center gap-3">
                                <Switch checked={!!style.bold} onCheckedChange={(v) => update("bold", v)} />
                                <span className="text-sm text-muted-foreground">{style.bold ? "Enabled" : "Disabled"}</span>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label>Color</Label>
                            <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                                <input
                                    aria-label="Color"
                                    type="color"
                                    className="h-9 w-9 rounded-md border bg-background p-1"
                                    value={normalizeColorForPicker(style.color)}
                                    onChange={(e) => update("color", e.target.value)}
                                />
                                <Input
                                    value={style.color ?? ""}
                                    onChange={(e) => update("color", e.target.value)}
                                    placeholder="#000000 or 'red'"
                                    className="h-9"
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Link</Label>
                            <div className="">
                                <Input
                                    value={style?.link ?? ""}
                                    onChange={(e) => update("link", e.target.value)}
                                    placeholder="Enter your link here"
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Alignment */}
                <section className="grid gap-4">
                    <div className="text-sm font-medium">Alignment</div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div className="grid gap-2">
                            <Label>Alignment</Label>
                            <Select value={style.alignment ?? "left"} onValueChange={(v) => update("alignment", v as Alignment)}>
                                <SelectTrigger className="h-9">
                                    <SelectValue placeholder="Select alignment" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="left">Left</SelectItem>
                                    <SelectItem value="center">Center</SelectItem>
                                    <SelectItem value="right">Right</SelectItem>
                                    <SelectItem value="justify">Justify</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </section>

                {/* Margin */}
                <section className="grid gap-4">
                    <div className="text-sm font-medium">Margin (left, top, right, bottom)</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <NumberField
                            id="ml"
                            label="Left"
                            value={margin[0]}
                            onChange={(n) => update("margin", [n, margin[1], margin[2], margin[3]] as Margin)}
                        />
                        <NumberField
                            id="mt"
                            label="Top"
                            value={margin[1]}
                            onChange={(n) => update("margin", [margin[0], n, margin[2], margin[3]] as Margin)}
                        />
                        <NumberField
                            id="mr"
                            label="Right"
                            value={margin[2]}
                            onChange={(n) => update("margin", [margin[0], margin[1], n, margin[3]] as Margin)}
                        />
                        <NumberField
                            id="mb"
                            label="Bottom"
                            value={margin[3]}
                            onChange={(n) => update("margin", [margin[0], margin[1], margin[2], n] as Margin)}
                        />
                    </div>
                </section>

                {/* ── Advanced later ────────────────────────────────────────────────── */}
                <section className="grid gap-4">
                    <div className="text-sm font-medium">Advanced</div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div className="grid gap-2">
                            <Label>Italics</Label>
                            <div className="flex items-center gap-3">
                                <Switch checked={!!style.italics} onCheckedChange={(v) => update("italics", v)} />
                                <span className="text-sm text-muted-foreground">{style.italics ? "Enabled" : "Disabled"}</span>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="lineHeight">Line height</Label>
                            <Input
                                id="lineHeight"
                                type="number"
                                min={0.5}
                                max={3}
                                step={0.1}
                                value={style.lineHeight ?? 1}
                                onChange={(e) => update("lineHeight", clamp(parseNum(e.target.value, 1), 0.5, 3))}
                                className="h-9"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="characterSpacing">Character spacing (pt)</Label>
                            <Input
                                id="characterSpacing"
                                type="number"
                                min={-2}
                                max={20}
                                step={0.5}
                                value={style.characterSpacing ?? 0}
                                onChange={(e) => update("characterSpacing", clamp(parseNum(e.target.value, 0), -2, 20))}
                                className="h-9"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>No wrap</Label>
                            <div className="flex items-center gap-3">
                                <Switch checked={!!style.noWrap} onCheckedChange={(v) => update("noWrap", v)} />
                                <span className="text-sm text-muted-foreground">{style.noWrap ? "Enabled" : "Disabled"}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Opacity */}
                <section className="grid gap-4">
                    <div className="text-sm font-medium">Opacity</div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div className="grid gap-2">
                            <Label>Opacity (0–1)</Label>
                            <Input
                                type="number"
                                min={0}
                                max={1}
                                step={0.05}
                                value={style.opacity ?? 1}
                                onChange={(e) => update("opacity", clamp(parseNum(e.target.value, 1), 0, 1))}
                                className="h-9"
                            />
                        </div>
                    </div>
                </section>

                {/* Decoration */}
                <section className="grid gap-4">
                    <div className="text-sm font-medium">Text Decoration</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="grid gap-2">
                            <Label>Decoration</Label>
                            <Select
                                value={(style.decoration ?? "none") as DecorationUI}
                                onValueChange={(v) => {
                                    if (v === "none") update("decoration", undefined);
                                    else update("decoration", v as Decoration);
                                }}
                            >
                                <SelectTrigger className="h-9">
                                    <SelectValue placeholder="Select decoration" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    <SelectItem value="underline">Underline</SelectItem>
                                    <SelectItem value="lineThrough">Line through</SelectItem>
                                    <SelectItem value="overline">Overline</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="decorationColor">Decoration color</Label>
                            <Input
                                id="decorationColor"
                                value={style.decorationColor ?? ""}
                                onChange={(e) => update("decorationColor", e.target.value)}
                                placeholder="#000000 or 'red'"
                                className="h-9"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Decoration style</Label>
                            <Select
                                value={style.decorationStyle ?? "solid"}
                                onValueChange={(v) => update("decorationStyle", v as DecorationStyle)}
                            >
                                <SelectTrigger className="h-9">
                                    <SelectValue placeholder="Line style" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="solid">Solid</SelectItem>
                                    <SelectItem value="dashed">Dashed</SelectItem>
                                    <SelectItem value="dotted">Dotted</SelectItem>
                                    <SelectItem value="double">Double</SelectItem>
                                    <SelectItem value="wavy">Wavy</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </section>
            </CardContent>
        </Card>
    );
}

/* ──────────────────────────────────────────────────────────────────────────── *
 * Small numeric input
 * ──────────────────────────────────────────────────────────────────────────── */
export function NumberField(props: {
    id: string;
    label: string;
    value: number;
    onChange?: (n: number) => void;
    min?: number;
    max?: number;
    step?: number;
}) {
    const { id, label, value, onChange = () => { }, min = -1000, max = 1000, step = 1 } = props;
    return (
        <div className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                type="number"
                className="h-9"
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={(e) => onChange(clamp(parseNum(e.target.value, 0), min, max))}
            />
        </div>
    );
}
