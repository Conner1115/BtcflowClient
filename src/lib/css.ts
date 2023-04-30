import { css } from "@emotion/react";

export type Space =
  | 0
  | 2
  | 4
  | 8
  | 12
  | 16
  | 24
  | 32
  | 40
  | 48
  | 64
  | 80
  | 128
  | 256;
const toSpace = (space: Space) => `${space}px`;

type BorderRadius = 0 | 1 | 2 | 4 | 8 | 12 | 16 | 64 | "full";
const toBorderRadius = (radius: BorderRadius) => {
  if (radius === "full") {
    return "50%";
  }

  if (radius === 0) {
    return "0";
  }

  return `${radius}px`;
};

export const rcss = {
  //padding
  p: (space: Space) => css({ padding: toSpace(space) }),
  px: (space: Space) =>
    css({ paddingLeft: toSpace(space), paddingRight: toSpace(space) }),
  py: (space: Space) =>
    css({ paddingTop: toSpace(space), paddingBottom: toSpace(space) }),
  pt: (space: Space) => css({ paddingTop: toSpace(space) }),
  pb: (space: Space) => css({ paddingBottom: toSpace(space) }),
  pl: (space: Space) => css({ paddingLeft: toSpace(space) }),
  pr: (space: Space) => css({ paddingRight: toSpace(space) }),

  position: {
    static: css({ position: "static" }),
    relative: css({ position: "relative" }),
    absolute: css({ position: "absolute" }),
    fixed: css({ position: "fixed" }),
    sticky: css({ position: "sticky" }),
  },

  flex: {
    row: css({ display: "flex", flexDirection: "row" }),
    column: css({ display: "flex", flexDirection: "column" }),
    rowReverse: css({ display: "flex", flexDirection: "row-reverse" }),
    columnReverse: css({ display: "flex", flexDirection: "column-reverse" }),
    grow: (flexGrow: number) => css({ flexGrow }),
    growAndShrink: (flex: number) => css({ flexGrow: flex, flexShrink: flex }),
    shrink: (flex: number) => css({ flexShrink: flex }),
    wrap: css({ flexWrap: "wrap" }),
    wrapReverse: css({ flexWrap: "wrap-reverse" }),
  },

  center: css({ alignItems: "center", justifyContent: "center" }),
  align: {
    start: css({ alignItems: "flex-start" }),
    center: css({ alignItems: "center" }),
    stretch: css({ alignItems: "stretch" }),
    baseline: css({ alignItems: "baseline" }),
    end: css({ alignItems: "flex-end" }),
  },
  justify: {
    start: css({ justifyContent: "flex-start" }),
    center: css({ justifyContent: "center" }),
    end: css({ justifyContent: "flex-end" }),
    spaceBetween: css({ justifyContent: "space-between" }),
    spaceAround: css({ justifyContent: "space-around" }),
    spaceEvenly: css({ justifyContent: "space-evenly" }),
  },

  rowWithGap: (space: Space) =>
    css({
      flexDirection: "row",
      "& > *": { marginRight: toSpace(space) },
      "& > *:last-child": { marginRight: 0 },
    }),

  colWithGap: (space: Space) =>
    css({
      flexDirection: "column",
      "& > *": { marginBottom: toSpace(space) },
      "& > *:last-child": { marginBottom: 0 },
    }),

  rowReverseWithGap: (space: Space) =>
    css({
      flexDirection: "row-reverse",
      "& > *": { marginRight: toSpace(space) },
      "& > *:first-child": { marginRight: 0 },
    }),

  colReverseWithGap: (space: Space) =>
    css({
      flexDirection: "column-reverse",
      "& > *": { marginBottom: toSpace(space) },
      "& > *:first-child": { marginBottom: 0 },
    }),

  borderRadius: (
    ...radius:
      | [BorderRadius]
      | [BorderRadius, BorderRadius, BorderRadius, BorderRadius]
  ) => {
    return css({
      borderRadius: radius.map(toBorderRadius).join(" "),
    });
  },
};

export const tokens = {
  backgroundRoot: "var(--background-root)",
  backgroundDefault: "var(--background-default)",
  backgroundHigher: "var(--background-higher)",
  backgroundHighest: "var(--background-highest)",
  backgroundOverlay: "var(--background-overlay)",
  foregroundDefault: "var(--foreground-default)",
  foregroundDimmer: "var(--foreground-dimmer)",
  foregroundDimmest: "var(--foreground-dimmest)",
  outlineDimmest: "var(--outline-dimmest)",
  outlineDimmer: "var(--outline-dimmer)",
  outlineDefault: "var(--outline-default)",
  outlineStronger: "var(--outline-stronger)",
  outlineStrongest: "var(--outline-strongest)",
  accentPrimaryDimmest: "var(--accent-primary-dimmest)",
  accentPrimaryDimmer: "var(--accent-primary-dimmer)",
  accentPrimaryDefault: "var(--accent-primary-default)",
  accentPrimaryStronger: "var(--accent-primary-stronger)",
  accentPrimaryStrongest: "var(--accent-primary-strongest)",
  accentPositiveDimmest: "var(--accent-positive-dimmest)",
  accentPositiveDimmer: "var(--accent-positive-dimmer)",
  accentPositiveDefault: "var(--accent-positive-default)",
  accentPositiveStronger: "var(--accent-positive-stronger)",
  accentPositiveStrongest: "var(--accent-positive-strongest)",
  accentNegativeDimmest: "var(--accent-negative-dimmest)",
  accentNegativeDimmer: "var(--accent-negative-dimmer)",
  accentNegativeDefault: "var(--accent-negative-default)",
  accentNegativeStronger: "var(--accent-negative-stronger)",
  accentNegativeStrongest: "var(--accent-negative-strongest)",
};
