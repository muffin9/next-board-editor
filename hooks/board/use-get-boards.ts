import { BoardType, HeaderType } from "@/app/types";
import {
    deleteBoardById,
    deleteBoardList,
    insertBoard,
    selectBoardListByPageId,
} from "@/lib/query";
import { useEffect, useState } from "react";
import { useToast } from "../use-toast";
import { useRouter } from "next/navigation";

function useGetBoards(id: string) {
    const router = useRouter();
    const { toast } = useToast();
    const [tasks, setTasks] = useState<BoardType[]>();
    const [headerData, setHeaderData] = useState<HeaderType>();

    const getBoards = async () => {
        const currentBoards = await selectBoardListByPageId(id);

        if (currentBoards.boards) {
            setTasks([...currentBoards.boards]);

            setHeaderData({
                headerTitle: currentBoards.title,
                headerStartDate: currentBoards.startDate,
                headerEndDate: currentBoards.endDate,
                progress: currentBoards.progress,
            });
        }
    };

    const updateCheckBoard = (id: string) => {
        setTasks((prevTasks) =>
            prevTasks?.map((task) =>
                task.id === id
                    ? { ...task, isCompleted: !task.isCompleted }
                    : task
            )
        );
    };

    const handleDeleteBoardListByPageId = async () => {
        const status = await deleteBoardList(id.toString());

        if (status === 204) {
            toast({
                title: "선택한 BOARD들이 삭제되었습니다.",
            });
            router.push("/");
        }
    };

    const handleInsertBoard = async (id: string, ratio: number) => {
        const boardId = await insertBoard(id, ratio);

        if (boardId) {
            toast({
                title: "TODO 하나 추가 되었습니다.",
                duration: 1000,
            });
            getBoards();
        }
    };

    const handleDeleteBoard = async (id: string, boardId: string) => {
        const status = await deleteBoardById(id, boardId);

        if (status === 204) {
            toast({
                title: "선택하신 board가 삭제되었습니다.",
                duration: 1000,
            });
            getBoards();
        }
    };

    useEffect(() => {
        const fetchGetBoards = async () => {
            await getBoards();
        };

        fetchGetBoards();
    }, []);

    return {
        tasks,
        headerData,
        getBoards,
        updateCheckBoard,
        handleDeleteBoardListByPageId,
        handleInsertBoard,
        handleDeleteBoard,
    };
}

export default useGetBoards;
