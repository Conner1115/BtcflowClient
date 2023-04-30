import { rcss, tokens } from "src/lib/css";
import { breakdownInfo, BreakdownInfo, BreakdownItem } from "src/lib/types";
import BreakdownBar from "./breakdownBar";
import Span from "./span";
import { createContext, useEffect, useState } from "react";
import { colors } from "./colors";
import DetailContainer from "./detailContainer";

// Need to pass the color map to different components
export const colorMapCtx = createContext<Array<string>>([]);

// Order an array randomly so we can choose some random colors
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

  // Which chunk of the address are we viewing?
  const [viewing, setViewing] = useState<BreakdownInfo | null>(null);

  // Upon mount, randomize the color map
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
        <span>Breakdown</span>
        <BreakdownBar breakdown={breakdown} initialValue={initialValue} />

        {viewing ? (
          <DetailContainer
            item={viewing}
            value={breakdown.find((x) => x.type === viewing.type)}
            close={() => setViewing(null)}
          />
        ) : (
          <>
            <span>Chunks</span>
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

            <span>
              <a
                href={`https://mempool.space/address/${initialValue}`}
                target="_blank"
                rel="noreferrer"
              >
                View on Mempool
              </a>
            </span>
          </>
        )}
      </div>
    </colorMapCtx.Provider>
  );
}
