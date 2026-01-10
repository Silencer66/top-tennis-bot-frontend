import type { PlayerLevel, User } from "@/types";

import { Badge } from "@/shared/Badge/Badge";
import { classNames } from "@/helpers/classnames";
import {
    CheckCircle,
    Phone,
    TrendingUp,
    User as UserIcon,
    XCircle,
} from "lucide-react";

import styles from "./PlayerCard.module.scss";

interface IPlayerCardProps {
    user: User;
    showStats?: boolean;
    isNoShow?: boolean;
    onToggleNoShow?: (playerId: string) => void;
}

const levelLabels: Record<PlayerLevel, string> = {
    beginner: "Начинающий",
    intermediate: "Средний",
    advanced: "Продвинутый",
};

const levelStyleByLevel: Record<PlayerLevel, string> = {
    beginner: styles.levelBeginner,
    intermediate: styles.levelIntermediate,
    advanced: styles.levelAdvanced,
};

export function PlayerCard(props: IPlayerCardProps) {
    const { user, showStats = false, isNoShow = false, onToggleNoShow } = props;

    const attendanceRate =
        user.totalTrainings && user.attendedTrainings && user.totalTrainings > 0
            ? Math.round((user.attendedTrainings / user.totalTrainings) * 100)
            : 0;

    return (
        <div
            className={classNames(styles.root, {
                [styles.noShow]: isNoShow,
            })}
        >
            <div className={styles.inner}>
                <div
                    className={classNames(styles.avatar, {
                        [styles.avatarNoShow]: isNoShow,
                    })}
                >
                    <UserIcon
                        className={classNames(styles.avatarIcon, {
                            [styles.avatarIconNoShow]: isNoShow,
                        })}
                    />
                </div>

                <div className={styles.content}>
                    <div className={styles.nameRow}>
                        <h4 className={styles.name}>{user.name}</h4>
                        <Badge
                            variant="outline"
                            className={classNames(
                                styles.levelBadge,
                                levelStyleByLevel[user.level]
                            )}
                        >
                            {levelLabels[user.level]}
                        </Badge>
                    </div>

                    {user.phone && (
                        <div className={styles.phoneRow}>
                            <Phone className={styles.phoneIcon} />
                            <span className={styles.phoneText}>
                                {user.phone}
                            </span>
                        </div>
                    )}

                    {showStats && (
                        <div className={styles.statsRow}>
                            <div className={styles.statItem}>
                                <TrendingUp className={styles.statIcon} />
                                <span className={styles.statText}>
                                    Посещаемость: {attendanceRate}%
                                </span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statText}>
                                    Тренировок: {user.totalTrainings}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {onToggleNoShow && (
                    <button
                        type="button"
                        onClick={() => onToggleNoShow(user.id)}
                        className={classNames(styles.toggle, {
                            [styles.toggleNoShow]: isNoShow,
                        })}
                        aria-label={
                            isNoShow
                                ? "Отметить как пришёл"
                                : "Отметить как не пришёл"
                        }
                    >
                        {isNoShow ? (
                            <CheckCircle className={styles.toggleIcon} />
                        ) : (
                            <XCircle className={styles.toggleIcon} />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
