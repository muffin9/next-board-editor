import { BoardType, HeaderType } from "@/app/types";
import { selectBoardListByPageId } from "@/lib/query";
import { useEffect, useState } from "react";

function useGetBoards(id: string) {
    const [tasks, setTasks] = useState<BoardType[]>();
    const [headerData, setHeaderData] = useState<HeaderType>();
    const [dbCheckCount, setCheckDbCount] = useState(0);

    const getBoards = async () => {
        const currentBoards = await selectBoardListByPageId(id);

        if (currentBoards.boards) {
            const totalBoardList = currentBoards.boards.length;

            setTasks([...currentBoards.boards]);

            setHeaderData({
                headerTitle: currentBoards.title,
                headerStartDate: currentBoards.startDate,
                headerEndDate: currentBoards.endDate,
                progress: currentBoards.progress,
            });

            const count = Math.floor(
                (currentBoards.progress * totalBoardList) / 100
            );

            setCheckDbCount(isNaN(count) ? 0 : count);
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

    useEffect(() => {
        const fetchGetBoards = async () => {
            await getBoards();
        };

        fetchGetBoards();
    }, []);

    return { tasks, headerData, getBoards, updateCheckBoard, dbCheckCount };
}

export default useGetBoards;
