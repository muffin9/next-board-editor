"use server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// 서버쪽에서 document 접근 불가능.
// import { getKeyFromCookie } from "./shared/lib/cookie";

export function middleware(req: NextRequest) {
    const user = req.cookies.get("user");

    if (!user) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

// 인증이 필요한 경로 지정
export const config = {
    matcher: ["/board"],
};
