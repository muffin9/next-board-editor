"use client";

import { Dispatch, SetStateAction } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
    Button,
    Calendar,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui";
import { Calendar as CalendarIcon } from "lucide-react";

interface BasicDatePickerProps {
    date: Date | undefined;
    setDate?: Dispatch<SetStateAction<Date | undefined>>;
}

function BasicDatePicker({ date, setDate }: BasicDatePickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}

export { BasicDatePicker };
