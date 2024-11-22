"use client";

import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    Checkbox,
    LabelDatePicker,
    Button,
    Separator,
    DialogClose,
} from "@/components/ui";
import { supabase } from "@/lib/supabase";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useParams } from "next/navigation";
import { useState } from "react";
import { BoardType } from "@/app/types";
import { useToast } from "@/hooks/use-toast";

interface MarkdownEditorDialogProps {
    children?: React.ReactNode;
    data: BoardType;
    getBoards: () => void;
}

function MarkdownEditorDialog({
    children,
    data,
    getBoards,
}: MarkdownEditorDialogProps) {
    const { toast } = useToast();
    const [title, setTitle] = useState(data.title);
    const [startDate, setStartDate] = useState<Date | undefined>(
        data.startDate || undefined
    );
    const [endDate, setEndDate] = useState<Date | undefined>(
        data.endDate || undefined
    );
    const [content, setContent] = useState(data.content);

    const { id } = useParams();

    const handleInsert = async (selectedId: string) => {
        try {
            const { data: boardList } = await supabase
                .from("board-list")
                .select("*")
                .eq("id", id);

            if (boardList && boardList !== null) {
                boardList[0].boards.forEach((board: BoardType) => {
                    if (board.id === selectedId) {
                        board.title = title;
                        board.startDate = startDate as Date;
                        board.endDate = endDate as Date;
                        board.content = content;
                        board.isCompleted = board.isCompleted;
                    }
                });

                const { status } = await supabase
                    .from("board-list")
                    .update({
                        boards: boardList[0].boards,
                    })
                    .eq("id", id);

                if (status === 204) {
                    toast({
                        title: "BOARD 콘텐츠가 올바르게 등록되었습니다.",
                        duration: 1000,
                    });
                    // TODO 부모 컴포넌트 BoardCard 실시간 동기화 안됨. Why ?
                    getBoards();
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    className="h-5 w-5 min-w-5"
                                    checked={data.isCompleted}
                                    aria-readonly
                                    disabled
                                />
                                <input
                                    type="text"
                                    placeholder="게시물의 제목을 입력하세요."
                                    className="text-xl outline-none bg-transparent"
                                    value={title}
                                    onChange={(event) =>
                                        setTitle(event.target.value)
                                    }
                                />
                            </div>
                        </DialogTitle>
                        <DialogDescription>
                            마크다운 에디터를 사용하여 TODO_BOARD를 예쁘게
                            꾸며봐요!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center gap-5">
                        <LabelDatePicker
                            label="From"
                            date={startDate}
                            setDate={setStartDate}
                        />
                        <LabelDatePicker
                            label="To"
                            date={endDate}
                            setDate={setEndDate}
                        />
                    </div>
                    <Separator />
                    <MarkdownEditor
                        className="h-[320px]"
                        value={content}
                        onChange={setContent}
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit" variant="ghost">
                                취소
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button onClick={() => handleInsert(data.id)}>
                                등록
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export { MarkdownEditorDialog };
