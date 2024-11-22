import { BoardType } from "@/app/types";
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
    date.setHours(date.getHours() + 9);
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

export const selectBoardList = async (title?: string) => {
    try {
        const { data } = await supabase
            .from("board-list")
            .select("*")
            .like("title", `${title ? `%${title}%` : "*"}`);
        return data;
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
    boards,
}: {
    id: string;
    title: string;
    startDate: Date;
    endDate: Date;
    progress: number;
    boards: BoardType[];
}) => {
    const { status } = await supabase
        .from("board-list")
        .update({
            title,
            startDate: startDate,
            endDate: endDate,
            progress: progress,
            boards,
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
