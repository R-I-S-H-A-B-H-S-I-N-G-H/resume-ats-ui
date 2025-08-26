import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export interface DropDownItem {
    value: string
    label: string
}

export default function Dropdown({ list = [], label = "Select", onSelect, initialVal = "" }: { list: DropDownItem[], label?: string, initialVal?: string, onSelect?: (value: DropDownItem) => void }) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(initialVal)

    function handleSelect(selectedItem: DropDownItem) {
        if (onSelect) {
            onSelect(selectedItem)
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? list.find((item) => item.value === value)?.label
                        : label}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search.." className="h-9" />
                    <CommandList>
                        {/* <CommandEmpty>No framework found.</CommandEmpty> */}
                        <CommandGroup>
                            {list.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                        handleSelect(item)
                                    }}
                                >
                                    {item.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === item.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
