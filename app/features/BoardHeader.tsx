"use client";

import { Button, LabelDatePicker, Progress } from "@/components/ui";
import styles from "../board/[id]/page.module.scss";
import { updateBoardList } from "@/lib/query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface BoardHeaderProps {
    handleInsertBoard: () => void;
    headerData: {
        headerTitle?: string;
        headerStartDate?: Date;
        headerEndDate?: Date;
    };
}

function BoardHeader({ handleInsertBoard, headerData }: BoardHeaderProps) {
    const { toast } = useToast();

    const [headerTitle, setHeaderTitle] = useState(
        headerData.headerTitle || ""
    );
    const [headerStartDate, setHeaderStartDate] = useState<Date>(
        headerData.headerStartDate || new Date()
    );
    const [headerEndDate, setHeaderEndDate] = useState<Date>(
        headerData.headerEndDate || new Date()
    );

    const { id } = useParams();

    const save = async () => {
        try {
            if (!headerTitle || !headerStartDate || !headerEndDate) {
                return alert("값을 모두 채워 주세요.");
            }

            const boards = await updateBoardList({
                id: id.toString(),
                title: headerTitle,
                startDate: headerStartDate,
                endDate: headerEndDate,
            });

            if (boards) {
                toast({
                    title: "수정을 완료하였습니다.",
                    duration: 1000,
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

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
                        1/10 Completed
                    </small>

                    <Progress className="w-60" />
                </div>
            </div>
            <div className={styles.header__bottom}>
                {/* Clendar + Add New Board Section*/}
                <div className="flex items-center gap-4">
                    <LabelDatePicker label={"from"} />
                    <LabelDatePicker label={"to"} />
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
