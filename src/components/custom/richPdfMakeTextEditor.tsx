import { useRef, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const STYLE_TYPE = {
    BOLD: "BOLD",
    ITALICS: "ITALICS",
};

export default function RichPdfMakeTextEditor({ config, onUpdate = () => { } }: { config: any, onUpdate?: (config: any) => void }) {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [textVal, setTextVal] = useState<string>(convertConfigToText());

    function convertConfigToText() {
        if (!Array.isArray(config.text)) return ""
        const res = config.text.map(ele => ele.text).join("")
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
            return
        }

    }


    function setBoldStyle() {
        const selectedRange = getSelectedRange();

        for (let index = selectedRange.start; index <= selectedRange.end; index++) {
            if (config.text[index] === undefined) continue;
            config.text[index]["bold"] = !!!config.text[index]["bold"];
        }

        onUpdate(config);
    }

    function setItalics() {
        const selectedRange = getSelectedRange();

        for (let index = selectedRange.start; index <= selectedRange.end; index++) {
            if (config.text[index] === undefined) continue;
            config.text[index]["italics"] = !!!config.text[index]["italics"];
        }

        onUpdate(config);
    }

    function setStyle(type: string, val?: string) {
        if (type == STYLE_TYPE.BOLD) return setBoldStyle()
        if (type == STYLE_TYPE.ITALICS) return setItalics()
    }
    
    
    return (
        <div className="gap-2 flex flex-col p-0.5">
            <Textarea ref={textareaRef} value={textVal} onChange={onTextChange} onClick={logCursor} onKeyUp={logCursor} />
            <div>
                <Button onClick={() => setStyle(STYLE_TYPE.BOLD)} variant={"ghost"}>
                    Bold
                </Button>
                <Button variant={"ghost"}
                    onClick={() => setStyle(STYLE_TYPE.ITALICS)}
                >Italics</Button>
            </div>
        </div>
    );
}
