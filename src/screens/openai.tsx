import { rcss } from "src/lib/css";
import Screen from "src/components/Screen";
import Styles from "src/styles";
import { useAtom } from "jotai";
import { OpenAIApiKey, ScreenEnum, TabAtom } from "src/state";
import usePostJson from "src/hooks/usePostJson";
import { useReplit } from "@replit/extensions-react";

export default function () {
  const [key, setKey] = useAtom(OpenAIApiKey);
  const [, setTab] = useAtom(TabAtom);

  const { replit } = useReplit();

  const [checkValid] = usePostJson("/validate-key", {
    body: {
      apiKey: key,
    },
    onComplete: (res) => {
      if (res.success && replit) {
        replit.messages.showConfirm("API Key added");
        setTab(ScreenEnum.Prompt);
      } else {
        replit?.messages.showError("Invalid API Key");
      }
    },
  });

  return (
    <Screen>
      <div
        css={[
          rcss.flex.grow(1),
          rcss.flex.column,
          rcss.align.center,
          rcss.justify.center,
        ]}
      >
        <div css={[rcss.colWithGap(16)]}>
          <h1>OpenAI Configuration</h1>

          <p>
            Insert your{" "}
            <a href="https://platform.openai.com" target="_blank">
              OpenAI API key
            </a>{" "}
            to get access to better explanations and a chat interface where you
            can ask follow-up questions about Bitcoin.
          </p>

          <div css={[rcss.flex.row, rcss.rowWithGap(8)]}>
            <input
              css={[Styles.textarea, rcss.flex.grow(1)]}
              placeholder="sk_Aj30fs..."
              value={key || ""}
              onChange={(e) => setKey(e.target.value)}
            />

            <button css={Styles.button} onClick={checkValid}>
              I'm Ready
            </button>
          </div>
        </div>
      </div>
    </Screen>
  );
}
