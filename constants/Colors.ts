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
}
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

const APP_THEME: AppTheme = {
  background: "#ffffff",
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

const STUDENT_GRADIENT: StudentGradient = {
  primary: "rgba(118, 250, 178, 1)",
  secondary: "rgba(91, 216, 148, 1)",
  ternary: "rgba(91, 216, 148, 0.8)",
};

const TAB_COLORS: TabColors = {
  active: "#ffffff",
  inactive: "#265451",
};

export {
  APP_THEME,
  TEXT_THEME,
  BUTTON_THEME,
  COLOR_THEME,
  STUDENT_GRADIENT,
  TAB_COLORS,
};
