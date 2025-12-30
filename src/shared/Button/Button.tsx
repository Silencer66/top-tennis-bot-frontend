import type { ButtonHTMLAttributes, FC } from "react";

import { classNames } from "@/helpers/classnames";

import styles from "./button.module.scss";

export type ButtonVariant = "default" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
};

export const Button: FC<ButtonProps> = ({
    className,
    variant = "default",
    size = "md",
    ...rest
}) => {
    return (
        <button
            {...rest}
            className={classNames(
                styles.root,
                styles[`variant_${variant}`],
                styles[`size_${size}`],
                className
            )}
        />
    );
};
