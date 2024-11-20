"use client";

import styles from "./page.module.scss";
import { BoardCard, BoardHeader } from "@/app/features";
import { BoardAside } from "@/app/features/BoardAside";
import useGetBoards from "@/hooks/use-get-boards";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

interface BoardContentType {
    id: string;
    isChecked: boolean;
    title: string;
    startDate: Date;
    endDate: Date;
    content: string;
}

export interface BoardType {
    id: string;
    title: string;
    start_date: string | null;
    end_date: string | null;
    content: string;
}

export default function BoardUniquePage() {
    const { id } = useParams();
    const [isAddTask, setIsTask] = useState(false);

    const { tasks } = useGetBoards(id.toString());
    console.log(tasks);
    return (
        <div className="page">
            <BoardAside />
            <main className="page__main">
                <BoardHeader setIsTask={setIsTask} />

                <div className={styles.body}>
                    {tasks === null ? (
                        <div className={styles.body__noData}>
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                There is no board yet.
                            </h3>
                            <small className="text-sm font-medium leading-none text-[#6D6D6D] mt-3 mb-7">
                                Click the button and start flashing!
                            </small>
                            <button onClick={() => console.log("TODO....")}>
                                <Image
                                    src="/assets/images/button.svg"
                                    width={74}
                                    height={74}
                                    alt="rounded-button"
                                />
                            </button>
                        </div>
                    ) : (
                        <div className={styles.body__isData}>
                            {tasks &&
                                tasks.map((task) => {
                                    return <BoardCard key={task.id} />;
                                })}
                            {isAddTask && (
                                <BoardCard isActiveCard={isAddTask} />
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
