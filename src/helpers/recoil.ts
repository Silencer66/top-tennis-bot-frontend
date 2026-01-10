import { atom, selector } from "recoil";

import type { User, UserRole } from "@/types/user";

const mockUser = {} as User;

/** Основной атом с данными пользователя */
export const userState = atom<User>({
    key: "userState",
    default: mockUser,
});

/** Селектор для получения роли пользователя */
export const userRoleSelector = selector<UserRole>({
    key: "userRoleSelector",
    get: ({ get }) => get(userState).role,
});
