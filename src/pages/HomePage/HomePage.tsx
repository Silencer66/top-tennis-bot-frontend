import { Bell, Calendar } from "lucide-react";
import { useMemo, type FC } from "react";

import { classNames } from "@/css/classnames";

import styles from "./HomePage.module.scss";

import logo from "/logo.webp";

function capitalizeFirstLetter(value: string): string {
    return value.length ? value[0].toUpperCase() + value.slice(1) : value;
}

export const HomePage: FC = () => {
    const now = useMemo(() => new Date(), []);

    const greeting = useMemo(() => {
        const hours = now.getHours();
        if (hours < 12) return "Доброе утро";
        if (hours < 18) return "Добрый день";
        return "Добрый вечер";
    }, [now]);

    const dateLabel = useMemo(() => {
        return new Intl.DateTimeFormat("ru-RU", {
            day: "numeric",
            month: "long",
        }).format(now);
    }, [now]);

    const weekdayLabel = useMemo(() => {
        const weekday = new Intl.DateTimeFormat("ru-RU", {
            weekday: "long",
        }).format(now);
        return capitalizeFirstLetter(weekday);
    }, [now]);

    return (
        <div className={styles.root}>
            <header className={styles.topbar}>
                <div className={styles.brand}>
                    <img
                        src={logo}
                        alt="Top Tennis Community"
                        className={styles.logo}
                    />
                    <div>
                        <h1 className={styles.brandTitle}>Top Tennis</h1>
                        <p className={styles.brandSubtitle}>Community</p>
                    </div>
                </div>

                <button className={styles.bellButton} type="button">
                    <Bell className={styles.bellIcon} />
                    <span className={styles.bellDot} />
                </button>
            </header>

            <div className={styles.header}>
                <p className={styles.greeting}>{greeting}</p>
                <h2 className={styles.title}>Пользователь</h2>
            </div>

            <section className={styles.dateCard} aria-label="Сегодня">
                <div className={styles.dateCardTop}>
                    <Calendar className={styles.dateCardIcon} />
                    <span className={styles.dateCardCaption}>Сегодня</span>
                </div>

                <p className={styles.date}>{dateLabel}</p>
                <p className={classNames(styles.weekday)}>{weekdayLabel}</p>
            </section>
        </div>
    );
};
