import { useContext } from "react";
import { rcss, tokens } from "src/lib/css";
import { breakdownInfo, BreakdownItem } from "src/lib/types";
import { colorMapCtx } from "./container";

export default function BreakdownBar({
  breakdown,
  initialValue,
}: {
  breakdown: Array<BreakdownItem>;
  initialValue: string;
}) {
  const colors = useContext(colorMapCtx);

  return (
    <div
      css={[
        rcss.position.relative,
        {
          width: "100%",
          height: 8,
        },
      ]}
    >
      {breakdown.map((x, i) => {
        const percentage = x.value.length / initialValue.length;

        let pos = 0;

        for (let j = 0; j < i; j++) {
          pos += breakdown[j].value.length / initialValue.length;
        }

        return (
          <div
            css={[
              rcss.position.absolute,
              {
                width: `${percentage * 100}%`,
                height: 8,
                top: 0,
                left: `${pos * 100}%`,
                background: colors[i] + "aa",
                cursor: "pointer",
                transition: "0.25s",
                "&:hover::after": {
                  position: "absolute",
                  content: `"${breakdownInfo[x.type].tooltip} (${
                    x.value.length
                  } bytes)"`,
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
                },
              },
            ]}
          ></div>
        );
      })}
    </div>
  );
}
