import type { Metadata } from "next";

import { Toaster } from "@/shared/ui";

import "@/app/styles/globals.css";
import "@/app/styles/main.scss";

export const metadata: Metadata = {
    title: "Next.js Project",
    description: "Shadcn UI + Nedxt.js TODO-BOARD 만들기",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
