// theme.ts

export interface AppVariant {
    first: string;
    second: string;
    third: string;
}
export interface AppTheme {
    background: string;
    primary: AppVariant;
    secondary: AppVariant;
    ternary: AppVariant;
}

export interface ButtonVariant {
    background: string;
    color: string;
}
export interface ButtonTheme {
    primary: ButtonVariant;
    secondary: ButtonVariant;
    success: ButtonVariant;
    danger: ButtonVariant;
}

export type ThemeType = "light" | "dark";
export interface TextTheme {
    light: {
        primary: string;
        secondary: string;
        danger: string;
        warning: string;
        info: string;
    };
    dark: {
        primary: string;
        secondary: string;
        danger: string;
        warning: string;
        info: string;
    };
}

export interface ColorThemes {
    light: { backgound: string };
    dark: { backgound: string };
}

const APP_THEME: AppTheme = {
    background: "#ffffff",
    primary: {
        first: "#93D1BF",
        second: "#A5D7B9",
        third: "#95CF9C",
    },
    secondary: {
        first: "#9CD292",
        second: "#B1D788",
        third: "#CAE18E",
    },
    ternary: {
        first: "#192119",
        second: "#484D48",
        third: "#7A827A",
    },
};

const COLOR_THEME: ColorThemes = {
    light: { backgound: "#f8f9fa" },
    dark: { backgound: "#343a40" },
};

const TEXT_THEME: TextTheme = {
    light: {
        primary: "#343a40",
        secondary: "#6c757d",
        danger: "#dc3545",
        warning: "#ffc107",
        info: "#17a2b8",
    },
    dark: {
        primary: "#ffffff",
        secondary: "#6c757d",
        danger: "#dc3545",
        warning: "#ffc107",
        info: "#17a2b8",
    },
};

const BUTTON_THEME: ButtonTheme = {
    primary: {
        background: "#3498db",
        color: "#ffffff",
    },
    secondary: {
        background: "#2ecc71",
        color: "#ffffff",
    },
    success: {
        background: "#28a745",
        color: "#ffffff",
    },
    danger: {
        background: "#dc3545",
        color: "#ffffff",
    },
};

export { APP_THEME, TEXT_THEME, BUTTON_THEME, COLOR_THEME };
