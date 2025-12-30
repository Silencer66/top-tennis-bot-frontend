export type TrainingLevel = "beginner" | "intermediate" | "advanced" | "all";

export interface Training {
    id: string;
    title: string;
    description: string;
    level: TrainingLevel;
    date: Date;
    time: string; // e.g. "18:00"
    duration: number; // minutes
    location: string;
    maxPlayers: number;
    registeredPlayers: string[];
    price: number;
}
