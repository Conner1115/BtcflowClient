import { css } from "@emotion/react";
import { rcss, tokens } from "./lib/css";

const Styles = {
  // Textarea
  textarea: css([
    rcss.p(8),
    rcss.borderRadius(8),
    {
      background: tokens.backgroundHigher,
      border: `solid 1px ${tokens.backgroundHighest}`,
      color: tokens.foregroundDefault,
      "&::placeholder": {
        color: tokens.foregroundDimmest,
      },
      fontFamily: '"IBM plex sans", sans-serif',
      "&:focus": {
        borderColor: tokens.accentPrimaryDefault,
      },
      resize: "vertical",
    },
  ]),

  // Normal UI button
  button: css([
    rcss.p(8),
    rcss.borderRadius(8),
    {
      background: tokens.backgroundHigher,
      color: tokens.foregroundDefault,
      "&:hover": {
        background: tokens.backgroundHighest,
      },
      border: "solid 1px transparent",
      cursor: "pointer",
      transition: "0.25s",
      fontFamily: '"IBM plex sans", sans-serif',
      "&:active": {
        borderColor: tokens.accentPrimaryStronger,
      },
    },
  ]),

  // Detailed / Large UI button
  buttonLarge: css([
    rcss.px(16),
    rcss.py(12),
    rcss.borderRadius(64),
    {
      minWidth: 124,
      background: `linear-gradient(90deg, ${tokens.accentPrimaryDimmer}, ${tokens.accentPrimaryDefault})`,
      border: `solid 1px ${tokens.accentPrimaryStronger}`,
      fontSize: 20,
      color: tokens.foregroundDefault,
      fontFamily: '"IBM plex sans", sans-serif',
      fontWeight: 500,
      transition: "0.25s",
      cursor: "pointer",
      boxShadow: `0 0 8px 0px ${tokens.accentPrimaryDimmer}`,
      "&:hover": {
        borderColor: tokens.accentPrimaryStrongest,
        transform: `scale(1.05)`,
        boxShadow: `0 0 24px 4px ${tokens.accentPrimaryDimmer}`,
      },
    },
  ]),

  // Text Header
  header: css({
    textAlign: "center",
  }),

  smallParagraph: css({
    maxWidth: "100vw",
    fontSize: 12,
  }),
};

export default Styles;
