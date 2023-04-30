import { rcss, tokens } from "src/lib/css";
import { breakdownInfo, BreakdownInfo, BreakdownItem } from "src/lib/types";
import Styles from "src/styles";

export default function DetailContainer({
  item,
  value,
  close,
}: {
  item: BreakdownInfo;
  value: BreakdownItem | undefined;
  close: () => void;
}) {
  return value ? (
    <div css={[rcss.flex.column, rcss.colWithGap(8), rcss.flex.grow(1)]}>
      <div css={[rcss.flex.grow(1), rcss.position.relative]}>
        <div
          css={[
            rcss.position.absolute,
            {
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              overflowY: "auto",
            },
          ]}
        >
          <p>{item.description}</p>
        </div>
      </div>

      <div
        css={[
          rcss.flex.row,
          rcss.pt(8),
          rcss.justify.spaceBetween,
          {
            borderTop: `solid 1px ${tokens.backgroundHighest}`,
          },
        ]}
      >
        <button onClick={close} css={Styles.button}>
          Back
        </button>
      </div>
    </div>
  ) : null;
}
