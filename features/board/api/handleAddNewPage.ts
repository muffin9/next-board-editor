"use server";

import { redirect } from "next/navigation";
import { insertBoardList } from "./query";

export async function handleAddNewPage() {
    const boardListId = await insertBoardList({});
    redirect(`/board/${boardListId}`);
}
