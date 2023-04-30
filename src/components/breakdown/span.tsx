import { useContext } from "react";
import { rcss, tokens } from "src/lib/css";
import { colorMapCtx } from "./container";
import { BreakdownChunk, breakdownInfo } from "src/lib/types";

export default function Span({
  onClick,
  index, // TODO: use index for getting a color
  value,
  type,
}: {
  onClick: (v: string) => void;
  index: number;
  value: string;
  type: BreakdownChunk;
}) {
  const colors = useContext(colorMapCtx);

  return (
    <span
      css={[
        rcss.px(4),
        rcss.py(2),
        rcss.borderRadius(4),
        {
          background: colors[index] + "99",
          cursor: "pointer",
          color: tokens.foregroundDefault,
          border: `solid 1px transparent`,
          "&:hover": {
            background: colors[index] + "cc",
          },
          "&:active": {
            borderColor: tokens.accentPrimaryDefault,
          },
          lineHeight: `calc(1em + 12px)`,
          margin: "0 2px",
          transition: "0.25s",
          fontSize: 12,
          position: "relative",
          "&:hover::after": {
            position: "absolute",
            bottom: "calc(100% + 4px)",
            left: "50%",
            transform: "translatex(-50%)",
            width: "auto",
            whiteSpace: "nowrap",
            fontSize: 12,
            background: tokens.backgroundHigher,
            padding: "4px 8px",
            borderRadius: 8,
            zIndex: 10,
            textAlign: "center",
            content: `"${breakdownInfo[type].tooltip}"`,
          },
        },
      ]}
      onClick={() => onClick(value)}
    >
      {value}
    </span>
  );
}
