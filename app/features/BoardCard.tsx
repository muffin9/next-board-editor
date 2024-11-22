"use client";

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

import clsx from "clsx";

import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { BoardType } from "@/app/types";
import useGetBoards from "@/hooks/board/use-get-boards";

interface BoardCardProps {
    isActiveCard?: boolean;
    board: BoardType;
    getBoards: () => void;
    setCheckCount: Dispatch<SetStateAction<number>>;
    updateCheckBoard: (boardId: string) => void;
}

function BoardCard({
    isActiveCard,
    board,
    getBoards,
    setCheckCount,
    updateCheckBoard,
}: BoardCardProps) {
    const { id } = useParams();

    const [isCompleted, setIsCompleted] = useState(board.isCompleted);

    const { handleDeleteBoard } = useGetBoards(id.toString());

    return (
        <Card
            className={clsx({ "border-[1px] border-orange-500": isActiveCard })}
        >
            <CardHeader>
                <CardTitle className="flex items-center justify-between gap-4">
                    <div className="w-full flex items-center gap-2">
                        <Checkbox
                            className="w-[20px] h-[20px] border-[#DADADA]"
                            checked={isCompleted}
                            onCheckedChange={() => {
                                setIsCompleted(!isCompleted);

                                setCheckCount((prevCount) =>
                                    isCompleted ? prevCount - 1 : prevCount + 1
                                );

                                updateCheckBoard(board.id);
                            }}
                        />
                        <Input
                            type="text"
                            placeholder="Board Title Here..."
                            className="flex-1 border-none"
                            value={board.title}
                            readOnly
                        />
                    </div>
                    <Button variant="ghost" size="icon">
                        <ChevronUp />
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col">
                <div className="flex justify-between gap-2">
                    <div className="flex gap-2">
                        <LabelDatePicker
                            label="From"
                            date={board.startDate as Date}
                            readonly
                        />
                        <LabelDatePicker
                            label="To"
                            date={board.endDate as Date}
                            readonly
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost">Duplicate</Button>
                        <Button
                            variant="destructive"
                            onClick={() =>
                                handleDeleteBoard(id.toString(), board.id)
                            }
                        >
                            Delete
                        </Button>
                    </div>
                </div>
                <Separator className="mt-4" />
            </CardContent>

            <CardFooter>
                <div className="w-full flex justify-center">
                    <MarkdownEditorDialog data={board} getBoards={getBoards}>
                        <Button className="text-[#6D6D6D] hover:text-[#FFFFFF] bg-white text-sm cursor-pointer">
                            Add Contents
                        </Button>
                    </MarkdownEditorDialog>
                </div>
            </CardFooter>
        </Card>
    );
}

export { BoardCard };
