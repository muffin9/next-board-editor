"use server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// 서버쪽에서 document 접근 불가능.
// import { getCookieByKey } from "./shared/lib/cookie";

export function middleware(req: NextRequest) {
    const user = req.cookies.get("user");

    const url = req.nextUrl;

    if (!user) {
        // 유저가 없는데... "/board"로 접근 시 "/"로 리다이렉트
        if (url.pathname.startsWith("/board")) {
            return NextResponse.redirect(new URL("/", req.url));
        }
    } else {
        // 유저가 쿠키에 있고, "/" 또는 "/signup"에 접근시엔 board로
        if (url.pathname === "/" || url.pathname === "/signup") {
            return NextResponse.redirect(new URL("/board", req.url));
        }
    }

    return NextResponse.next();
}

// 인증이 필요한 경로 지정
export const config = {
    matcher: ["/", "/signup", "/board/:path*"],
};
