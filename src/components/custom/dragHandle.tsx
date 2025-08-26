import { GripVertical } from "lucide-react";
import { Button } from "../ui/button";

export default function DragHandle() {
	return (
		<Button
			type="button"
			variant="ghost"
			size="icon"
			className="drag-handle cursor-grab active:cursor-grabbing"
			aria-label="Drag item"
			onPointerDown={(e) => {
				// prevents editors/inputs from stealing focus when starting a drag
				e.preventDefault();
			}}
		>
			<GripVertical className="h-4 w-4" />
		</Button>
	);
}
