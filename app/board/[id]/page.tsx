"use client";

import styles from "./page.module.scss";
import { BoardCard, BoardHeader } from "@/app/features";
import { BoardAside } from "@/app/features/BoardAside";

import { Button, CommonAlertDialog } from "@/components/ui";
import useGetBoards from "@/hooks/use-get-boards";
import { useToast } from "@/hooks/use-toast";
import { deleteBoardList, insertBoard } from "@/lib/query";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export interface BoardType {
    id: string;
    title: string;
    start_date: string | null;
    end_date: string | null;
    content: string;
}

export default function BoardUniquePage() {
    const router = useRouter();
    const { toast } = useToast();
    const { id } = useParams();

    const { tasks, getBoards } = useGetBoards(id.toString());

    const handleDeleteAll = async () => {
        const status = await deleteBoardList(id.toString());

        if (status === 204) {
            toast({
                title: "선택한 BOARD들이 삭제되었습니다.",
            });
            router.push("/");
        }
    };

    const handleInsertBoard = async () => {
        const boardId = await insertBoard(id.toString());

        if (boardId) {
            toast({
                title: "TODO 하나 추가 되었습니다.",
                duration: 1000,
            });
            getBoards();
        }
    };

    return (
        <div className="page">
            <BoardAside />
            <main className="page__main">
                <BoardHeader
                    handleInsertBoard={handleInsertBoard}
                    headerData={{
                        headerTitle: "testtest",
                        headerStartDate: new Date(),
                        headerEndDate: new Date(),
                    }}
                />

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
                            <div className="w-full flex justify-between text-orange-500">
                                <span>총 Task 개수: {tasks?.length || 0}</span>
                                <CommonAlertDialog
                                    triggerElement={
                                        <Button
                                            variant="destructive"
                                            size="default"
                                        >
                                            전체 삭제
                                        </Button>
                                    }
                                    title="해당 TASK를 정말로 삭제하시겠습니까?"
                                    description="삭제되면 복구가 불가능합니다."
                                >
                                    <div className="flex gap-4">
                                        {/* TODO 여기에 AlertDialogCancel 이 있는게 부적절하다 생각되어지며, Props로 넘기는게 좋을지 고민 필요. */}
                                        <AlertDialogCancel>
                                            <span className="text-xs">
                                                취소
                                            </span>
                                        </AlertDialogCancel>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={handleDeleteAll}
                                        >
                                            삭제하기
                                        </Button>
                                    </div>
                                </CommonAlertDialog>
                            </div>

                            {tasks &&
                                tasks.map((task, idx) => {
                                    return (
                                        <BoardCard
                                            key={task.id}
                                            isActiveCard={idx === 0}
                                        />
                                    );
                                })}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
