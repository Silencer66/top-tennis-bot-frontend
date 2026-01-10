export type PlayerLevel = "beginner" | "intermediate" | "advanced";

export type UserRole = "coach" | "player";

export interface User {
    id: string;
    name: string;
    role: UserRole;
    level: PlayerLevel;
    phone?: string;
    avatarUrl?: string;
    telegramId?: number;
    attendedTrainings?: number;
    totalTrainings?: number;
}

/** Начальное состояние пользователя (не авторизован) */
export const DEFAULT_USER: User = {
    id: "",
    name: "",
    role: "player",
    level: "beginner",
};
