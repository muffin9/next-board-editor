"use client";

import { Button, SearchBar } from "@/components/ui";
import { useRouter } from "next/navigation";
import { insertBoardList } from "@/lib/query";

function BoardAside() {
    const router = useRouter();

    return (
        <aside className="page__aside">
            <SearchBar placeholder="한국어를 입력하세요." />
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
                <small className="text-sm font-medium leading-none text-[#a6a6a6]">
                    SeongJin
                </small>
                <ul className="flex flex-col py-2 gap-2 px-[10px]">
                    <li className="flex items-center gap-2 py-2 px-[10px] bg-[#F5F5F5] rounded-sm">
                        <div className="w-2 h-2 bg-[#00F38D] rounded-full"></div>
                        Enter
                    </li>
                    <li className="flex items-center gap-2 py-2 px-[10px] bg-[#F5F5F5] rounded-sm">
                        <div className="w-2 h-2 bg-[#00F38D] rounded-full"></div>
                        Enter Title
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export { BoardAside };
