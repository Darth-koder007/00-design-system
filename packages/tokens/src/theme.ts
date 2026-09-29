import { amber, blue, gray, green, red } from "./color";

export type Theme = {
  colorSurface: string;
  colorSurfaceRaised: string;
  colorTextPrimary: string;
  colorTextSecondary: string;
  colorBorder: string;
  colorAccent: string;
  colorAccentHover: string;
  colorDanger: string;
  colorSuccess: string;
  colorWarning: string;
};

export const lightTheme: Theme = {
  colorSurface: gray[100],
  colorSurfaceRaised: "#ffffff",
  colorTextPrimary: gray[900],
  colorTextSecondary: gray[700],
  colorBorder: gray[300],
  colorAccent: blue[500],
  colorAccentHover: blue[700],
  colorDanger: red[500],
  colorSuccess: green[500],
  colorWarning: amber[500],
};

export const darkTheme: Theme = {
  colorSurface: gray[900],
  colorSurfaceRaised: gray[700],
  colorTextPrimary: gray[100],
  colorTextSecondary: gray[300],
  colorBorder: gray[700],
  colorAccent: blue[300],
  colorAccentHover: blue[100],
  colorDanger: red[300],
  colorSuccess: green[300],
  colorWarning: amber[300],
};
