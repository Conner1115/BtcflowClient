import { rcss, tokens } from "src/lib/css";
import Styles from "src/styles";
import Screen from "src/components/Screen";
import { ScreenEnum, TabAtom } from "src/state";
import { useAtom } from "jotai";

export default function () {
  const [, setTab] = useAtom(TabAtom);

  return (
    <Screen>
      <div css={[rcss.flex.column, rcss.colWithGap(16), rcss.align.center]}>
        <h1 css={Styles.header}>How did we get here?</h1>

        <h3 css={{ color: tokens.foregroundDimmer }}>It's hard to tell</h3>

        <p>TL;DR, we ran into an error.</p>

        <button css={Styles.button} onClick={() => setTab(ScreenEnum.Prompt)}>
          Try again
        </button>
      </div>
    </Screen>
  );
}
