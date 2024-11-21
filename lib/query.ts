import { supabase } from "./supabase";
import { v4 as uuidv4 } from "uuid";

interface insertBoardListProps {
    title?: string;
    boards?: object;
}

export const insertBoardList = async ({
    title = "",
    boards = [],
}: insertBoardListProps) => {
    const date = new Date();

    const formattedDate = date.toISOString();

    try {
        const { data } = await supabase
            .from("board-list")
            .insert([
                {
                    title,
                    createdAt: formattedDate,
                    startDate: null,
                    endDate: null,
                    boards,
                },
            ])
            .select();

        if (data) return data[0].id;
    } catch (error) {
        console.error(error);
    }
};

export const selectBoardListByPageId = async (pageId: string) => {
    try {
        const { data, status } = await supabase
            .from("board-list")
            .select("*")
            .eq("id", pageId);

        if (status === 200 && data) {
            return data[0];
        }
    } catch (error) {
        console.error(error);
    }
};

export const selectHeaderDataByPageId = async (pageId: string) => {
    try {
        const { data, status } = await supabase
            .from("board-list")
            .select("*")
            .eq("id", pageId);

        if (status === 200 && data) {
            const headerData = {
                headerTitle: data[0].title,
                headerStartDate: data[0].startDate,
                headerEndDate: data[0].endDate,
            };
            return headerData;
        }
    } catch (error) {
        console.error(error);
    }
};

export const insertBoard = async (id: string) => {
    try {
        // SELECT boards from board-list where id = id

        const boardList = await selectBoardListByPageId(id);

        // 얻어온 boards에 newBoards로 json data에 객체 하나 추가.
        const newBoardId = uuidv4();

        const createBoard = {
            id: newBoardId,
            title: "",
            startDate: null,
            endDate: null,
            content: "",
            isCompleted: false,
        };

        const newBoards = boardList.boards
            ? [...boardList.boards, createBoard]
            : [createBoard];

        // Update board-list set boards = newBoards
        const { data: updateBoards, status } = await supabase
            .from("board-list")
            .update({ boards: newBoards })
            .eq("id", id)
            .select();

        if (status === 200 && updateBoards) {
            return newBoardId;
        }
    } catch (error) {
        console.error(error);
    }
};

// 테이블 나눴을때
// export const insertBoard = async (id: string) => {
//     const date = new Date();
//     const formattedDate = date.toISOString();

//     try {
//         const createBoard = {
//             title: "",
//             contents: "",
//             startDate: formattedDate,
//             endDate: null,
//             pageId: id,
//         };

//         const { data, status } = await supabase
//             .from("board")
//             .insert(createBoard)
//             .select();

//         if (status === 200) {
//             return data;
//         }
//     } catch (error) {
//         console.error(error);
//     }
// };

export const updateBoardList = async ({
    id,
    title,
    startDate,
    endDate,
    progress,
}: {
    id: string;
    title: string;
    startDate: Date;
    endDate: Date;
    progress: number;
}) => {
    const { status } = await supabase
        .from("board-list")
        .update({
            title,
            startDate: startDate,
            endDate: endDate,
            progress,
        })
        .eq("id", id);

    return status;
};

export const deleteBoardList = async (id: string) => {
    try {
        const { status } = await supabase
            .from("board-list")
            .delete()
            .eq("id", id);

        return status;
    } catch (error) {
        console.error(error);
    }
};

export const deleteBoardById = async (id: string) => {
    try {
        const { status } = await supabase.from("board").delete().eq("id", id);
    } catch (error) {
        console.error(error);
    }
};

export const selectBoardListProgressById = async (id: string) => {
    // progress를 DB에서 들고온다라... 그럼 체크할때마다 Update를 쳐야 하는건데.
    // 데이터가 엄청 많아지면 progress를 백에서 관리하는게 더 좋을까?
    // Chat GPT님의 답변 : 간편 조회, 속도 최적화, 기록 관리

    try {
        const { data, status } = await supabase
            .from("board-list")
            .select("progress")
            .eq("id", id);
    } catch (error) {
        console.error(error);
    }
};
