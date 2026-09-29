const base = 4;

export const spacing = {
  0: 0,
  1: base * 1,
  2: base * 2,
  3: base * 3,
  4: base * 4,
  6: base * 6,
  8: base * 8,
  12: base * 12,
  16: base * 16,
  24: base * 24,
  32: base * 32,
} as const;

export type SpacingKey = keyof typeof spacing;
