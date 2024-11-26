import type { Metadata } from "next";

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
        <div className="page">
            <main>{children}</main>
        </div>
    );
}
