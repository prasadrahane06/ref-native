// theme.ts

export interface AppVariant {
    first: string;
    second: string;
    third: string;
}
export interface AppTheme {
    background: string;
    gray: string;
    lightGray: string;
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
    disabled: ButtonVariant;
}
export interface TextTheme {
    light: {
        primary: string;
        secondary: string;
        danger: string;
        warning: string;
        info: string;
        gray: string;
    };
    dark: {
        primary: string;
        secondary: string;
        danger: string;
        warning: string;
        info: string;
        gray: string;
    };
}
export interface ColorThemes {
    light: { backgound: string };
    dark: { backgound: string };
}
export interface StudentGradient {
    primary: string;
    secondary: string;
    ternary: string;
}
export interface TabColors {
    active: string;
    inactive: string;
}
export type ThemeType = "light" | "dark";

const APP_THEME: { [key in ThemeType]: AppTheme } = {
    light: {
        background: "#fff",
        gray: "#595959",
        lightGray: "",
        primary: {
            first: "#5BD894", //"#93D1BF",
            second: "#A5D7B9",
            third: "#95CF9C",
        },
        secondary: {
            first: "#76FAB2", //"#9CD292",
            second: "#B1D788",
            third: "#CAE18E",
        },
        ternary: {
            first: "#192119",
            second: "#484D48",
            third: "#7A827A",
        },
    },
    dark: {
        background: "#000",
        gray: "#fff",
        lightGray: "",
        primary: {
            first: "#5BD894", //"#93D1BF",
            second: "#A5D7B9",
            third: "#95CF9C",
        },
        secondary: {
            first: "#76FAB2", //"#9CD292",
            second: "#B1D788",
            third: "#CAE18E",
        },
        ternary: {
            first: "#192119",
            second: "#484D48",
            third: "#7A827A",
        },
    },
};
const BACKGOUND_THEME: ColorThemes = {
    light: { backgound: "#fff" },
    dark: { backgound: "#000" },
};

const TEXT_THEME: TextTheme = {
    light: {
        primary: "#000",
        secondary: "#ccc",
        danger: "#dc3545",
        warning: "#ffc107",
        info: "#17a2b8",
        gray: "#000",
    },
    dark: {
        primary: "#fff",
        secondary: "#ccc",
        danger: "#dc3545",
        warning: "#ffc107",
        info: "#17a2b8",
        gray: "#fff",
    },
};

const BUTTON_THEME: { [key in ThemeType]: ButtonTheme } = {
    light: {
        primary: {
            background: "#3498db",
            color: "#fff",
        },
        secondary: {
            background: "#2ecc71",
            color: "#fff",
        },
        success: {
            background: "#28a745",
            color: "#fff",
        },
        danger: {
            background: "#dc3545",
            color: "#fff",
        },
        disabled: {
            background: "#dcdcdd",
            color: "#fff",
        },
    },
    dark: {
        primary: {
            background: "#3498db",
            color: "#fff",
        },
        secondary: {
            background: "#2ecc71",
            color: "#fff",
        },
        success: {
            background: "#28a745",
            color: "#fff",
        },
        danger: {
            background: "#dc3545",
            color: "#fff",
        },
        disabled: {
            background: "#777777",
            color: "#fff",
        },
    },
};

const STUDENT_GRADIENT: StudentGradient = {
    primary: "rgba(118, 250, 178, 1)",
    secondary: "rgba(91, 216, 148, 1)",
    ternary: "rgba(91, 216, 148, 0.8)",
};

const TAB_COLORS: { [key in ThemeType]: TabColors } = {
    light: {
        active: "#fff",
        inactive: "#265451",
    },
    dark: {
        active: "#000",
        inactive: "#fff",
    },
};

export { APP_THEME, BUTTON_THEME, BACKGOUND_THEME, STUDENT_GRADIENT, TAB_COLORS, TEXT_THEME };
