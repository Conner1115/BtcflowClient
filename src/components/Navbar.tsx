import { rcss, tokens } from "src/lib/css";
import { ScreenEnum, TabAtom } from "src/state";
import Styles from "src/styles";
import { useAtom } from "jotai";
import { Key } from "react-feather";

export default function Navbar() {
  const [, setTab] = useAtom(TabAtom);

  return (
    <nav
      css={[
        rcss.flex.row,
        rcss.p(8),
        rcss.align.center,
        rcss.rowWithGap(8),
        {
          borderBottom: `1px solid ${tokens.backgroundHigher}`,
        },
      ]}
    >
      <button css={Styles.button} onClick={() => setTab(ScreenEnum.Prompt)}>
        Back
      </button>

      <div
        css={[
          rcss.flex.grow(1),
          rcss.center,
          rcss.flex.row,
          rcss.rowWithGap(8),
        ]}
      >
        <img
          src="/logo.png"
          width={32}
          height={32}
          css={[
            rcss.borderRadius("full"),
            {
              border: `solid 1px ${tokens.backgroundHigher}`,
              background: tokens.backgroundRoot,
            },
          ]}
        />
        <span>
          <strong>BtcFlow</strong>
        </span>
      </div>

      <button css={Styles.button} onClick={() => setTab(ScreenEnum.OpenAI)}>
        <Key size={16} />
      </button>
    </nav>
  );
}
