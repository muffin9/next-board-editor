import { createClient } from "@/app/config/client";

const supabase = createClient();

export const getAuthUser = async () => {
    try {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (user) return user.id;
    } catch (error) {
        console.error(error);
    }
};

export const updateUserInfo = async (nickname: string, phoneNumber: string) => {
    try {
        const {
            data: { user },
        } = await supabase.auth.updateUser({
            data: { nickname: nickname, phone_number: phoneNumber },
        });

        if (user) return user;
    } catch (error) {
        console.error(error);
    }
};
