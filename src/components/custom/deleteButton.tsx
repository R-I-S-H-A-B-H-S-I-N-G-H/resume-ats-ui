"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export interface CrossButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const CrossButton = React.forwardRef<HTMLButtonElement, CrossButtonProps>(({ className, ...props }, ref) => {
	return (
		<Button ref={ref} variant="ghost" size="icon" className={`transition-colors hover:bg-red-100 hover:text-red-600 ${className ?? ""}`} {...props}>
			<X className="h-4 w-4" />
			<span className="sr-only">Close</span>
		</Button>
	);
});

CrossButton.displayName = "CrossButton";
