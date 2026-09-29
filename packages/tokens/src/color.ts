export type ColorRamp = {
  100: string;
  300: string;
  500: string;
  700: string;
  900: string;
};

export const gray: ColorRamp = {
  100: "#f5f6f7",
  300: "#d3d7dc",
  500: "#8b93a1",
  700: "#4a5162",
  900: "#1c2029",
};

export const blue: ColorRamp = {
  100: "#e6f0ff",
  300: "#8fbaff",
  500: "#2f7ff0",
  700: "#1c56b0",
  900: "#12356e",
};

export const red: ColorRamp = {
  100: "#fdebe9",
  300: "#f1968c",
  500: "#dd4b3a",
  700: "#a3301f",
  900: "#6b1c11",
};

export const green: ColorRamp = {
  100: "#e7f7ee",
  300: "#8ed7ab",
  500: "#2fa562",
  700: "#1e7a47",
  900: "#144e2e",
};

export const amber: ColorRamp = {
  100: "#fef3e0",
  300: "#f7c471",
  500: "#e59a1c",
  700: "#a86e0f",
  900: "#6e470a",
};

export const color = { gray, blue, red, green, amber } as const;
