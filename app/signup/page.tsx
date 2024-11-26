"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Label,
    Input,
    CommonAlertDialog,
} from "@/shared/ui";
import { Eye, EyeOff } from "lucide-react";
import { createClient } from "../config/client";

function SignupPage() {
    const supabase = createClient();
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const showToggle = () => setShowPassword((prevState) => !prevState);

    /** 회원가입에 필요한 데이터 Input Value */
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(event.target.value);
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(event.target.value);
    const handlePhoneNumberChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const rawValue = event.target.value.replace(/[^0-9]/g, "");
        const formattedValue = rawValue.replace(
            /^(\d{2,3})(\d{3,4})(\d{4})$/,
            `$1-$2-$3`
        );
        setPhoneNumber(formattedValue);
    };

    const [dialogState, setDialogState] = useState({
        title: "",
        description: "",
    });

    async function signupUser() {
        try {
            const { data } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    emailRedirectTo: "http://localhost:3000",
                },
            });
            const { user } = data;

            if (user) {
                setDialogState({
                    title: "회원가입이 완료되었습니다.",
                    description: "로그인을 할 수 있습니다.",
                });
            } else {
                setDialogState({
                    title: "회원가입 실패",
                    description:
                        "다시 시도해주세요. 문제가 지속되면 관리자에게 문의하세요.",
                });
            }
        } catch (error) {
            console.error(error);
            setDialogState({
                title: "회원가입 실패",
                description:
                    "다시 시도해주세요. 문제가 지속되면 관리자에게 문의하세요.",
            });
        }
    }

    return (
        <div className="w-full h-full">
            <div className="w-full flex flex-col items-center">
                <div className="flex flex-col items-center mt-10">
                    <h4 className="text-lg font-semibold">안녕하세요👋</h4>
                    <div className="flex flex-col items-center justify-center mt-2 mb-4">
                        <div className="text-sm text-muted-foreground">
                            <small className="text-sm text-[#E79057] font-medium leading-none">
                                TASK 관리 앱
                            </small>
                            에 방문해주셔서 감사합니다.
                        </div>
                        <p className="text-sm text-muted-foreground">
                            서비스를 이용하려면 로그인을 진행해주세요.
                        </p>
                    </div>
                </div>
                <Card className="w-[400px]">
                    <CardHeader>
                        <CardTitle className="text-xl">회원가입</CardTitle>
                        <CardDescription>
                            계정을 생성하기 위해 아래 내용을 입력해주세요.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="flex flex-col w-full gap-2">
                                <div className="flex items-end gap-2">
                                    <div className="flex flex-col flex-1 gap-2">
                                        <Label htmlFor="phone_number">
                                            휴대폰 번호
                                        </Label>
                                        <Input
                                            id="phone_number"
                                            placeholder="휴대폰 번호"
                                            maxLength={13}
                                            value={phoneNumber}
                                            required
                                            onChange={handlePhoneNumberChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">이메일</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="이메일을 입력하세요."
                                    required
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div className="relative grid gap-2">
                                <Label htmlFor="password">비밀번호</Label>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="비밀번호를 입력하세요."
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <Button
                                    size="icon"
                                    className="absolute top-1/2 right-2 -translate-y-1/4 bg-transparent hover:bg-transparent"
                                    onClick={showToggle}
                                >
                                    {showPassword ? (
                                        <Eye className="h-5 w-5 text-muted-foreground" />
                                    ) : (
                                        <EyeOff className="h-5 w-5 text-muted-foreground" />
                                    )}
                                </Button>
                            </div>
                            <div className="relative my-2">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        간편 회원가입을 원하시면 이전 버튼을
                                        클릭하세요.
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Button
                                    variant={"outline"}
                                    className="w-full"
                                    onClick={() => router.push("/")}
                                >
                                    이전
                                </Button>
                                <CommonAlertDialog
                                    triggerElement={
                                        <Button
                                            className="w-full text-white bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg"
                                            onClick={signupUser}
                                        >
                                            회원가입
                                        </Button>
                                    }
                                    title={dialogState.title}
                                    description={dialogState.description}
                                >
                                    <Button onClick={() => router.push("/")}>
                                        확인
                                    </Button>
                                </CommonAlertDialog>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            이미 계정이 있으신가요?{" "}
                            <Link href="/" className="underline">
                                로그인
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default SignupPage;
