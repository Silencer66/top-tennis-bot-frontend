import type { Training } from "@/types";

import { Badge } from "@/shared/Badge/Badge";
import { Button } from "@/shared/Button/Button";
import { classNames } from "@/helpers/classnames";
import { Calendar, Clock, Coins, MapPin, Users } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import styles from "./TrainingCard.module.scss";

interface ITrainingCardProps {
    training: Training;
    onSelect?: (training: Training) => void;
    onRegister?: (trainingId: string) => void;
    isCoach?: boolean;
    isRegistered?: boolean;
}

const levelLabels: Record<Training["level"], string> = {
    beginner: "Начинающий",
    intermediate: "Средний",
    advanced: "Продвинутый",
    all: "Все уровни",
};

const levelStyleByLevel: Record<Training["level"], string> = {
    beginner: styles.levelBeginner,
    intermediate: styles.levelIntermediate,
    advanced: styles.levelAdvanced,
    all: styles.levelAll,
};

export function TrainingCard(props: ITrainingCardProps) {
    const {
        training,
        onSelect,
        onRegister,
        isCoach = false,
        isRegistered = false,
    } = props;

    const spotsLeft = training.maxPlayers - training.registeredPlayers.length;
    const isFull = spotsLeft <= 0;

    return (
        <div
            className={styles.root}
            role={onSelect ? "button" : undefined}
            tabIndex={onSelect ? 0 : undefined}
            onClick={() => onSelect?.(training)}
        >
            <div className={styles.top}>
                <div className={styles.topLeft}>
                    <h3 className={styles.title}>{training.title}</h3>
                    <p className={styles.description}>{training.description}</p>
                </div>

                <Badge
                    variant="outline"
                    className={classNames(
                        styles.level,
                        levelStyleByLevel[training.level]
                    )}
                >
                    {levelLabels[training.level]}
                </Badge>
            </div>

            <div className={styles.meta}>
                <div className={styles.metaRow}>
                    <Calendar className={styles.metaIcon} />
                    <span>
                        {format(training.date, "d MMMM, EEEE", { locale: ru })}
                    </span>
                </div>

                <div className={styles.metaRow}>
                    <Clock className={styles.metaIcon} />
                    <span>
                        {training.time} • {training.duration} мин
                    </span>
                </div>

                <div className={styles.metaRow}>
                    <MapPin className={styles.metaIcon} />
                    <span className={styles.metaTruncate}>
                        {training.location}
                    </span>
                </div>

                <div className={styles.metaRow}>
                    <Users className={styles.metaIcon} />
                    <span>
                        {training.registeredPlayers.length}/
                        {training.maxPlayers} участников{" "}
                        {!isFull && (
                            <span className={styles.spotsOk}>
                                ({spotsLeft} мест)
                            </span>
                        )}
                        {isFull && (
                            <span className={styles.spotsFull}>(мест нет)</span>
                        )}
                    </span>
                </div>
            </div>

            <div className={styles.bottom}>
                <div className={styles.price}>
                    <Coins className={styles.priceIcon} />
                    <span className={styles.priceValue}>
                        {training.price} ₽
                    </span>
                </div>

                {!isCoach && (
                    <Button
                        size="sm"
                        variant={
                            isRegistered
                                ? "secondary"
                                : isFull
                                ? "outline"
                                : "default"
                        }
                        disabled={isFull && !isRegistered}
                        onClick={(e) => {
                            e.stopPropagation();
                            onRegister?.(training.id);
                        }}
                    >
                        {isRegistered
                            ? "Вы записаны"
                            : isFull
                            ? "Мест нет"
                            : "Записаться"}
                    </Button>
                )}

                {isCoach && (
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect?.(training);
                        }}
                    >
                        Подробнее
                    </Button>
                )}
            </div>
        </div>
    );
}
