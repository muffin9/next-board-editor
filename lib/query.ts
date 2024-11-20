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
                    created_at: formattedDate,
                    start_date: null,
                    end_date: null,
                    boards,
                },
            ])
            .select();

        if (data) return data[0].id;
    } catch (error) {
        console.error(error);
    }
};

export const selectBoardsByPageId = async (pageId: string) => {
    try {
        const { data, status } = await supabase
            .from("board-list")
            .select("*")
            .eq("id", pageId);

        if (status === 200 && data) {
            return data[0].boards;
        }
    } catch (error) {
        console.error(error);
    }
};

export const insertBoard = async (id: string) => {
    const date = new Date();
    const formattedDate = date.toISOString();

    try {
        // SELECT boards from board-list where id = id

        const currentBoards = await selectBoardsByPageId(id);

        // 얻어온 boards에 newBoards로 json data에 객체 하나 추가.
        const newBoardId = uuidv4();

        const createBoard = {
            id: newBoardId,
            title: "",
            start_date: formattedDate,
            end_date: null,
            content: "",
        };

        const newBoards = currentBoards
            ? [...currentBoards, createBoard]
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

export const updateBoardList = async ({
    id,
    title,
    startDate,
    endDate,
}: {
    id: string;
    title: string;
    startDate: Date;
    endDate: Date;
}) => {
    const { data: boards, status } = await supabase
        .from("board-list")
        .update({
            title,
            start_date: startDate,
            end_date: endDate,
        })
        .eq("id", id);

    if (status === 204) {
        return boards;
    }
};

export const deleteBoardList = async (id: string) => {
    try {
        const { status } = await supabase
            .from("board-list")
            .delete()
            .eq("id", +id);

        return status;
    } catch (error) {
        console.error(error);
    }
};
