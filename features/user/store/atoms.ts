import { atomWithStorage } from "jotai/utils";
import { UserType } from "../types";

export const initUserAtom: UserType = {
    id: "",
    email: "",
    phoneNumber: "",
    nickname: "",
    imgUrl: "",
};

export const userAtom = atomWithStorage<UserType | null>("user", null);
