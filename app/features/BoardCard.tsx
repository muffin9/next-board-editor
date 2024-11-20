import {
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    Checkbox,
    Input,
    LabelDatePicker,
    Separator,
} from "@/components/ui";

import { ChevronUp } from "lucide-react";
import { MarkdownEditorDialog } from "./MarkdownEditorDialog";
import { useState } from "react";
import clsx from "clsx";

interface BoardCardProps {
    isActiveCard?: boolean;
}

function BoardCard({ isActiveCard }: BoardCardProps) {
    const [title, setTitle] = useState("");

    return (
        <Card
            className={clsx({ "border-[1px] border-orange-500": isActiveCard })}
        >
            <CardHeader>
                <CardTitle className="flex items-center justify-between gap-4">
                    <div className="w-full flex items-center gap-2">
                        <Checkbox className="w-[20px] h-[20px] border-[#DADADA]" />
                        <Input
                            type="text"
                            placeholder="Board Title Here..."
                            className="flex-1 border-none"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <Button variant="ghost" size="icon">
                        <ChevronUp />
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col">
                <div className="flex justify-between">
                    <div className="flex gap-2">
                        <LabelDatePicker label="From" />
                        <LabelDatePicker label="To" />
                    </div>
                    <div>
                        <Button variant="ghost">Duplicate</Button>
                        <Button variant="ghost">Delete</Button>
                    </div>
                </div>
                <Separator className="mt-4" />
            </CardContent>

            <CardFooter>
                <div className="w-full flex justify-center">
                    <MarkdownEditorDialog>
                        <Button className="text-[#6D6D6D] bg-white text-sm cursor-pointer">
                            Add Contents
                        </Button>
                    </MarkdownEditorDialog>
                </div>
            </CardFooter>
        </Card>
    );
}

export { BoardCard };
