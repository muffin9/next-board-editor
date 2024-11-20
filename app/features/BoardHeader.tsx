"use client";

import { Button, LabelDatePicker, Progress } from "@/components/ui";
import styles from "../board/[id]/page.module.scss";
import { insertBoard } from "@/lib/query";
import { useParams, usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { supabase } from "@/lib/supabase";
import useGetBoards from "@/hooks/use-get-boards";

interface BoardHeaderProps {
    setIsTask: Dispatch<SetStateAction<boolean>>;
}

function BoardHeader({ setIsTask }: BoardHeaderProps) {
    const [headerTitle, setHeaderTitle] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const { id } = useParams();
    const { getBoards } = useGetBoards(id.toString());

    const save = async () => {
        const { status, error } = await supabase
            .from("board-list")
            .update({ title: headerTitle })
            .eq("id", id);
        console.log(status);
        if (status === 204) {
            getBoards();
            setHeaderTitle("");
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
                    onClick={async () => {
                        const boardId = await insertBoard(id as string);

                        if (boardId) {
                            setIsTask(true);
                        }
                    }}
                >
                    Add New Board
                </Button>
            </div>
        </div>
    );
}

export { BoardHeader };
