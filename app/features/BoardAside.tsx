"use client";

import { Button, SearchBar } from "@/components/ui";
import { useRouter } from "next/navigation";
import { insertBoardList } from "@/lib/query";
import useGetBoardList from "@/hooks/use-get-board-list";
import { Task } from "../types";
import Link from "next/link";
import { useState } from "react";
import useDebounce from "@/hooks/use-debounce";

function BoardAside() {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");
    const { boardList, getBoardListByTitle } = useGetBoardList();

    const debouncedHandleSearchValue = useDebounce(getBoardListByTitle, 500);

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
                            return (
                                <Link
                                    href={`/board/${board.id}`}
                                    key={board.id}
                                >
                                    <li
                                        className={`flex items-center gap-2 py-2 px-[10px] bg-[#F5F5F5] hover:bg-[#F5F5F5]/90 rounded-sm cursor-pointer`}
                                    >
                                        <div className="w-2 h-2 bg-[#00F38D] rounded-full"></div>
                                        {board.title || "Empty Title"}
                                    </li>
                                </Link>
                            );
                        })}
                </ul>
            </div>
        </aside>
    );
}

export { BoardAside };
