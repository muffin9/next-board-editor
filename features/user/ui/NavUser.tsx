"use client";

import { ChevronsUpDown, LogOut, UserRound } from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/ui";
import { initUserAtom, userAtom } from "@/features/user/store/atoms";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/config/client";
import { useToast } from "@/shared/lib/use-toast";
import { useSetAtom } from "jotai";
import { UserType } from "@/features/user/types";
import { deleteCookieByKey } from "@/shared/lib/cookie";
import { UserEditProfile } from "./UserEditProfile";

export function NavUser({ user }: { user: UserType | null }) {
    const { toast } = useToast();
    const supabase = createClient();
    const router = useRouter();
    const setUser = useSetAtom(userAtom);

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
                toast({
                    title: "로그아웃 에러 발생.",
                    description: "",
                });
                return;
            }

            deleteCookieByKey("user");
            setUser(initUserAtom);

            toast({
                title: "로그아웃이 성공적으로 완료되었습니다.",
                description: "",
            });
            router.push("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={"outline"}
                    className="py-6 px-3 flex items-center justify-evenly"
                >
                    <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user?.imgUrl} alt={"image url"} />
                        <AvatarFallback className="rounded-lg">
                            CN
                        </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">seongJin</span>
                        <span className="truncate text-xs">{user?.email}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="right"
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage
                                src={user?.imgUrl}
                                alt="avatar image"
                            />
                            <AvatarFallback className="rounded-lg">
                                CN
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">
                                seongJin
                            </span>
                            <span className="truncate text-xs">
                                {user?.email}
                            </span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="flex items-center justify-between">
                    <DropdownMenuItem className="flex justify-bewteen">
                        <div className="w-full flex items-center gap-3">
                            <UserRound />
                            <small className="text-sm font-normal leading-none text-[#a6a6a6">
                                Account
                            </small>
                        </div>
                    </DropdownMenuItem>
                    <UserEditProfile />
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
