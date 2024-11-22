"use client";

import styles from "./page.module.scss";
import { BoardCard, BoardListHeader } from "@/app/features";
import { BoardAside } from "@/app/features/BoardAside";

import { Button, CommonAlertDialog } from "@/components/ui";
import useGetBoards from "@/hooks/board/use-get-boards";
import useGetBoardCount from "@/hooks/boardList/use-get-board-count";

import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

import Image from "next/image";
import { useParams } from "next/navigation";

function EmptyBoard() {
    return (
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
    );
}

export default function BoardUniquePage() {
    const { id } = useParams();

    const {
        tasks,
        headerData,
        getBoards,
        updateCheckBoard,
        handleDeleteBoardListByPageId,
        handleInsertBoard,
    } = useGetBoards(id.toString());

    const { checkCount, setCheckCount } = useGetBoardCount(id.toString());

    return (
        <div className="page">
            <BoardAside />
            <main className="page__main">
                <BoardListHeader
                    tasks={tasks || []}
                    headerData={headerData || undefined}
                    checkCount={checkCount}
                    handleInsertBoard={handleInsertBoard}
                />

                <div className={styles.body}>
                    {tasks === null ? (
                        <EmptyBoard />
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
                                            onClick={
                                                handleDeleteBoardListByPageId
                                            }
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
                                            board={task}
                                            isActiveCard={idx === 0}
                                            getBoards={getBoards}
                                            setCheckCount={setCheckCount}
                                            updateCheckBoard={updateCheckBoard}
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
