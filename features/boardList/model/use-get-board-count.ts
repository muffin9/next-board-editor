import { selectBoardListByPageId } from "@/features/board/api/query";
import { useEffect, useState } from "react";

// board/[id]에서 한 번만 사용되어지는 코드지만, 관심사 분리.
function useGetBoardCount(id: string) {
    const [checkCount, setCheckCount] = useState<number>(0);

    const getBoardCounts = async () => {
        const currentBoards = await selectBoardListByPageId(id);

        if (currentBoards.boards) {
            const totalBoardList = currentBoards.boards.length;
            const count = (currentBoards.progress * totalBoardList) / 100;
            setCheckCount(isNaN(count) ? 0 : count);
        }
    };

    useEffect(() => {
        getBoardCounts();
    }, []);

    return { checkCount, setCheckCount };
}

export default useGetBoardCount;
