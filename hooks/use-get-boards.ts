import { BoardType } from "@/app/board/[id]/page";
import { selectBoardListByPageId } from "@/lib/query";
import { useEffect, useState } from "react";

export interface Task {
    id: number;
    title: string;
    startDate: string | Date;
    endDate: string | Date;
    boards: BoardType[];
}

export interface HeaderData {
    headerTitle: string;
    headerStartDate: Date;
    headerEndDate: Date;
    progress: number;
}

function useGetBoards(id: string) {
    const [tasks, setTasks] = useState<BoardType[]>();
    const [headerData, setHeaderData] = useState<HeaderData>();

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

    useEffect(() => {
        const fetchGetBoards = async () => {
            await getBoards();
        };

        fetchGetBoards();
    }, []);

    return { tasks, headerData, getBoards };
}

export default useGetBoards;
