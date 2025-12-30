import { Calendar } from "lucide-react";
import { useMemo, useState } from "react";
import type { Training } from "@/types";

import styles from "./AllTennisSessionsPage.module.scss";
import { TrainingCard } from "@/shared/TrainingCard/TrainingCard";

export const AllTennisSessionsPage = () => {
    // TODO: заменить на реальные роли/авторизацию (см. TabsLayout.tsx)
    const isCoach = false;

    // TODO: заменить на текущего пользователя из auth/session
    const currentUserId = "me";

    const [trainings, setTrainings] = useState<Training[]>(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        return [
            {
                id: "t-1",
                title: "ОФП + техника",
                description: "Разминка, работа ног, базовые удары.",
                level: "beginner",
                date: today,
                time: "19:00",
                duration: 90,
                location: "Корт №1",
                maxPlayers: 6,
                registeredPlayers: ["u-1", currentUserId],
                price: 800,
            },
            {
                id: "t-2",
                title: "Спарринги",
                description: "Игровая практика + короткий разбор.",
                level: "all",
                date: tomorrow,
                time: "20:00",
                duration: 120,
                location: "Корт №2",
                maxPlayers: 8,
                registeredPlayers: ["u-2", "u-3"],
                price: 1000,
            },
        ];
    });

    const registeredTrainingIds = useMemo(() => {
        return trainings
            .filter((t) => t.registeredPlayers.includes(currentUserId))
            .map((t) => t.id);
    }, [trainings]);

    const onSelectTraining = (training: Training) => {
        // TODO: открыть экран деталей
        console.log("Selected training:", training);
    };

    const onRegister = (trainingId: string) => {
        setTrainings((prev) =>
            prev.map((t) => {
                if (t.id !== trainingId) return t;
                if (t.registeredPlayers.includes(currentUserId)) return t;
                if (t.registeredPlayers.length >= t.maxPlayers) return t;
                return {
                    ...t,
                    registeredPlayers: [...t.registeredPlayers, currentUserId],
                };
            })
        );
    };

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <Calendar className={styles.headerIcon} />
                <h2 className={styles.title}>Тренировки</h2>
                <span className={styles.countPill}>{trainings.length}</span>
            </div>

            <div className={styles.list}>
                {trainings.map((training) => (
                    <TrainingCard
                        key={training.id}
                        training={training}
                        onSelect={onSelectTraining}
                        onRegister={onRegister}
                        isCoach={isCoach}
                        isRegistered={registeredTrainingIds.includes(
                            training.id
                        )}
                    />
                ))}

                {trainings.length === 0 && (
                    <div className={styles.empty}>
                        <p className={styles.emptyText}>
                            {isCoach
                                ? "Создайте свою первую тренировку"
                                : "Нет доступных тренировок"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
