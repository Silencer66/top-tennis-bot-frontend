import {
    BarChart3,
    Calendar,
    Home,
    Plus,
    Users,
    type LucideIcon,
} from "lucide-react";
import { useMemo } from "react";

import { classNames } from "@/helpers/classnames";

import styles from "./BottomNav.module.scss";
import { Tab } from "@/types";

type BottomNavTabItem = {
    id: Tab;
    icon: LucideIcon;
    label: string;
    accent?: boolean;
};

const coachTabs: BottomNavTabItem[] = [
    { id: "home", icon: Home, label: "Главная" },
    { id: "trainings", icon: Calendar, label: "Тренировки" },
    {
        id: "create",
        icon: Plus,
        label: "Создать",
        accent: true,
    },
    { id: "players", icon: Users, label: "Игроки" },
    { id: "stats", icon: BarChart3, label: "Статистика" },
];

const playerTabs: BottomNavTabItem[] = [
    { id: "home", icon: Home, label: "Главная" },
    { id: "trainings", icon: Calendar, label: "Тренировки" },
    { id: "my-sessions", icon: BarChart3, label: "Мои записи" },
];

interface IBottomNavProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
    isCoach?: boolean;
}

export function BottomNav(props: IBottomNavProps) {
    const { activeTab, onTabChange, isCoach } = props;

    const tabs = useMemo(() => (isCoach ? coachTabs : playerTabs), [isCoach]);

    return (
        <nav className={styles.root}>
            <div className={styles.inner}>
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    const isAccent = !!tab.accent;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={classNames(styles.tab, {
                                [styles.tabActive]: isActive,
                                [styles.tabAccent]: isAccent,
                            })}
                        >
                            <Icon
                                className={classNames(styles.icon, {
                                    [styles.iconAccent]: isAccent,
                                })}
                            />
                            {!isAccent && (
                                <span
                                    className={classNames(styles.label, {
                                        [styles.labelActive]: isActive,
                                    })}
                                >
                                    {tab.label}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
