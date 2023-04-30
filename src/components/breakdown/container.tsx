import { rcss, tokens } from "src/lib/css";
import { breakdownInfo, BreakdownInfo, BreakdownItem } from "src/lib/types";
import BreakdownBar from "./breakdownBar";
import Span from "./span";
import { createContext, useEffect, useState } from "react";
import { colors } from "./colors";
import DetailContainer from "./detailContainer";

export const colorMapCtx = createContext<Array<string>>([]);

function shuffle<T = any>(array: Array<T>) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default function BreakdownContainer({
  breakdown,
  initialValue,
}: {
  breakdown: Array<BreakdownItem>;
  initialValue: string;
}) {
  const [colorMap, setColorMap] = useState<Array<string>>([]);
  const [viewing, setViewing] = useState<BreakdownInfo | null>(null);

  useEffect(() => {
    setColorMap(shuffle<string>(colors).reverse());
  }, []);

  return (
    <colorMapCtx.Provider value={colorMap}>
      <div
        css={[
          rcss.p(8),
          rcss.flex.column,
          rcss.colWithGap(8),
          rcss.flex.grow(1),
          {
            border: `solid 1px ${tokens.backgroundHighest}`,
            width: "100%",
            maxWidth: `calc(100vw - 32px)`,
          },
        ]}
      >
        <BreakdownBar breakdown={breakdown} initialValue={initialValue} />

        {viewing ? (
          <DetailContainer
            item={viewing}
            value={breakdown.find((x) => x.type === viewing.type)}
            close={() => setViewing(null)}
          />
        ) : (
          <div
            css={{
              wordWrap: "break-word",
            }}
          >
            {breakdown.map((x, i) => (
              <Span
                key={i}
                index={i}
                value={x.value}
                type={x.type}
                onClick={() => {
                  setViewing(breakdownInfo[x.type]);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </colorMapCtx.Provider>
  );
}
