import { atom } from "jotai";

export interface UserType {
    id: string;
    email: string;
    phone: string;
    imgUrl: string;
}
export const userAtom = atom<UserType>({
    id: "",
    email: "",
    phone: "",
    imgUrl: "",
});
