import { Task } from "@/app/types";
import { selectBoardList } from "@/lib/query";
import { useEffect, useState } from "react";

function useGetBoardList() {
    const [boardList, setBoardList] = useState<Task[]>();

    const getBoardList = async () => {
        const currentBoardList = await selectBoardList();

        if (currentBoardList) setBoardList(currentBoardList);
    };

    const getBoardListByTitle = async (title: string) => {
        const currentBoardList = await selectBoardList(title);
        if (currentBoardList) setBoardList(currentBoardList);
    };

    useEffect(() => {
        getBoardList();
    }, []);

    return { boardList, getBoardListByTitle };
}

export default useGetBoardList;
