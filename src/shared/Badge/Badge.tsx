import type { HTMLAttributes } from "react";

import { classNames } from "@/helpers/classnames";

import styles from "./badge.module.scss";

export type BadgeVariant = "outline";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
    variant?: BadgeVariant;
};

export function Badge({ className, variant = "outline", ...rest }: BadgeProps) {
    return (
        <span
            {...rest}
            className={classNames(
                styles.root,
                styles[`variant_${variant}`],
                className
            )}
        />
    );
}
