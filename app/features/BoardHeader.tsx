"use client";

import { Button, LabelDatePicker, Progress } from "@/components/ui";
import styles from "../board/[id]/page.module.scss";
import { updateBoardList } from "@/lib/query";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import useGetBoards from "@/hooks/use-get-boards";
import { BoardType } from "../board/[id]/page";

interface BoardHeaderProps {
    handleInsertBoard: () => void;
    checkCount: number;
    tasks: BoardType[];
}

function BoardHeader({
    tasks,
    checkCount,
    handleInsertBoard,
}: BoardHeaderProps) {
    const { toast } = useToast();
    const { id } = useParams();

    const { headerData } = useGetBoards(id.toString());

    const [headerTitle, setHeaderTitle] = useState("");
    const [headerStartDate, setHeaderStartDate] = useState<Date | undefined>(
        undefined
    );
    const [headerEndDate, setHeaderEndDate] = useState<Date | undefined>(
        undefined
    );
    const [progress, setProgress] = useState((checkCount / tasks.length) * 100);

    const save = async () => {
        try {
            if (!headerTitle || !headerStartDate || !headerEndDate) {
                return alert("값을 모두 채워 주세요.");
            }

            const status = await updateBoardList({
                id: id.toString(),
                title: headerTitle,
                startDate: headerStartDate,
                endDate: headerEndDate,
                progress: progress,
            });

            // TODO checkbox updateBoard 필요.

            if (status === 204) {
                toast({
                    title: "수정을 완료하였습니다.",
                    duration: 1000,
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (headerData) {
            setHeaderTitle(headerData.headerTitle);
            setHeaderStartDate(headerData.headerStartDate);
            setHeaderEndDate(headerData.headerEndDate);
            setProgress(headerData.progress);
        }
    }, [headerData]);

    return (
        <div className={styles.header}>
            <div className={styles.header__top}>
                {/* 제목 입력 Input Section */}
                <input
                    type="text"
                    placeholder="Enter Title Here"
                    className={styles.header__top__input}
                    value={headerTitle}
                    onChange={(e) => setHeaderTitle(e.target.value)}
                />
                {/* 진행상황 척도 Graph Section */}
                <div className="flex items-center justify-start gap-3">
                    <small className="text-sm font-semibold text-[#6D6D6D]">
                        {checkCount}/{tasks?.length || 0} Completed
                    </small>

                    <Progress className="w-60" value={progress} />
                </div>
            </div>
            <div className={styles.header__bottom}>
                {/* Clendar + Add New Board Section*/}
                <div className="flex items-center gap-4">
                    <LabelDatePicker
                        label={"from"}
                        date={headerStartDate}
                        setDate={setHeaderStartDate}
                    />
                    <LabelDatePicker
                        label={"to"}
                        date={headerEndDate}
                        setDate={setHeaderEndDate}
                    />
                    <Button variant={"secondary"} onClick={save}>
                        저장
                    </Button>
                </div>
                <Button
                    className="text-white bg-[#E79057] hover:bg-[#E79057] hover:border hover:border-[#E26F24]"
                    onClick={handleInsertBoard}
                >
                    Add New Board
                </Button>
            </div>
        </div>
    );
}

export { BoardHeader };
