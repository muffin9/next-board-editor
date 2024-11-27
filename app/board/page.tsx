"use client";

import { Button } from "@/shared/ui";
import { BoardAside } from "@/features/boardList/ui/BoardAside";
import { insertBoardList } from "@/features/board/api/query";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();
    return (
        <div className="page">
            <BoardAside />
            <main className="page__main">
                <div className="h-full flex flex-col items-center justify-center gap-5 mb-5">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tighter">
                        How to start:
                    </h3>
                    <div className="flex flex-col gap-4 text-center">
                        <small className="text-sm font-normal leading-none text-[#a6a6a6]">
                            1. Create a page
                        </small>
                        <small className="text-sm font-normal leading-none text-[#a6a6a6]">
                            2. Add boards to page
                        </small>
                    </div>

                    <Button
                        className="w-[150px] text-[#E79057] bg-white border border-[#E79057] hover:bg-[#FFF9F5]"
                        onClick={async () => {
                            const boardListId = await insertBoardList({});
                            router.push(`/board/${boardListId}`);
                        }}
                    >
                        Add New Page
                    </Button>
                </div>
            </main>
        </div>
    );
}
