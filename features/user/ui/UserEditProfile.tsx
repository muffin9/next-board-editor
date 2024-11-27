import {
    AlertDialogCancel,
    Button,
    CommonAlertDialog,
    Input,
    Label,
} from "@/shared/ui";
import { useState } from "react";
import { useAtom } from "jotai";
import { updateUserInfo } from "../api/query";
import { userAtom } from "../store/atoms";
import { toast } from "@/shared/lib/use-toast";
import { UserType } from "../types";
import { sampleProfileUrl } from "../config/constants";

export function UserEditProfile() {
    const [user, setUser] = useAtom(userAtom);

    const [nickname, setNickname] = useState(user?.nickname || "");
    const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");

    const handleSaveButton = async () => {
        const data = await updateUserInfo(nickname, phoneNumber);
        const updatedUser = {
            id: data?.id,
            email: data?.email,
            phoneNumber: data?.user_metadata.phone_number,
            nickname: data?.user_metadata.nickname,
            imgUrl: sampleProfileUrl,
        } as UserType;

        setUser(updatedUser);

        if (data) {
            toast({
                variant: "default",
                title: "성공적으로 변경되었습니다.",
            });
        }
    };

    return (
        <CommonAlertDialog
            triggerElement={
                <Button size="sm" onClick={(e) => e.stopPropagation()}>
                    변경
                </Button>
            }
            title={`마이페이지 Account`}
        >
            <div className="w-full flex flex-col gap-4">
                <div className="flex items-center gap-12">
                    <Label htmlFor="name" className="w-[50px]">
                        Nickname
                    </Label>
                    <Input
                        id="name"
                        type="name"
                        placeholder="닉네임을 입력하세요."
                        required
                        value={nickname}
                        onChange={(e) => {
                            setNickname(e.target.value);
                        }}
                    />
                </div>
                <div className="flex items-center gap-12">
                    <Label htmlFor="phone" className="w-[50px]">
                        PhoneNumber
                    </Label>
                    <Input
                        id="phone"
                        type="phone"
                        placeholder="휴대폰번호를 입력하세요."
                        required
                        value={phoneNumber}
                        onChange={(e) => {
                            setPhoneNumber(e.target.value);
                        }}
                    />
                </div>
                <div className="flex justify-center gap-3">
                    <AlertDialogCancel>
                        <Button variant="ghost" onClick={handleSaveButton}>
                            저장
                        </Button>
                    </AlertDialogCancel>
                    <AlertDialogCancel>
                        <Button variant="ghost">닫기</Button>
                    </AlertDialogCancel>
                </div>
            </div>
        </CommonAlertDialog>
    );
}
