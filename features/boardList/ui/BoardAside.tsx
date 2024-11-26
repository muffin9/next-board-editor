"use client";

import { Button, SearchBar } from "@/shared/ui";
import { useParams, useRouter } from "next/navigation";
import { insertBoardList } from "@/features/board/api/query";
import useGetBoardList from "@/features/boardList/model/use-get-board-list";
import { Task } from "@/features/board/types";
import Link from "next/link";
import { useState } from "react";
import useDebounce from "@/shared/lib/use-debounce";
import { NavUser } from "./NavUser";
import { useAtomValue } from "jotai";
import { userAtom } from "@/features/user/store/atoms";

function BoardAside() {
    const router = useRouter();
    const { id } = useParams();

    const { boardList, getBoardListByTitle } = useGetBoardList();

    const user = useAtomValue(userAtom);

    const debouncedHandleSearchValue = useDebounce(getBoardListByTitle, 500);

    const [searchValue, setSearchValue] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        debouncedHandleSearchValue(value);
    };

    return (
        <aside className="page__aside">
            <SearchBar
                placeholder="한국어를 입력하세요."
                type="text"
                value={searchValue}
                onChange={handleChange}
            />
            <Button
                className="text-[#E79057] bg-white border border-[#E79057] hover:bg-[#FFF9F5]"
                onClick={async () => {
                    const boardListId = await insertBoardList({});
                    router.push(`/board/${boardListId}`);
                }}
            >
                Add New Page
            </Button>
            <div className="flex flex-col mt-4">
                <div className="flex justify-between">
                    <small className="text-sm font-medium leading-none text-[#a6a6a6]">
                        SeongJin
                    </small>
                    <small className="text-sm font-medium leading-none">
                        페이지 수: {boardList?.length}
                    </small>
                </div>
                <ul className="flex flex-col py-2 gap-2 px-[10px]">
                    {boardList &&
                        boardList.map((board: Task) => {
                            const isActive = Number(board.id) === Number(id);

                            return (
                                <Link
                                    href={`/board/${board.id}`}
                                    key={board.id}
                                >
                                    <li
                                        className={`flex items-center gap-2 py-2 px-[10px] ${
                                            isActive ? "bg-[#F5F5F5]" : "bg-red"
                                        } hover:bg-[#F5F5F5]/90 rounded-sm cursor-pointer`}
                                    >
                                        <div
                                            className={`w-2 h-2 ${
                                                isActive
                                                    ? "bg-[#00F38D]"
                                                    : "bg-[#F5F5F5]"
                                            } rounded-full`}
                                        ></div>
                                        {board.title || "Empty Title"}
                                    </li>
                                </Link>
                            );
                        })}
                </ul>
            </div>
            <NavUser user={user} />
        </aside>
    );
}

export { BoardAside };
