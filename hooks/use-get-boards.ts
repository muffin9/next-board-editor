import { BoardType } from "@/app/board/[id]/page";
import { selectBoardsByPageId } from "@/lib/query";
import { useEffect, useState } from "react";

function useGetBoards(id: string) {
    const [tasks, setTasks] = useState<BoardType[]>([]);

    const getBoards = async () => {
        const currentBoards = await selectBoardsByPageId(id);
        setTasks(currentBoards);
    };

    useEffect(() => {
        const fetchGetBoards = async () => {
            await getBoards();
        };

        fetchGetBoards();
    }, []);

    return { tasks, getBoards };
}

export default useGetBoards;
