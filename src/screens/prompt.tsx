import { useReplit } from "@replit/extensions-react";
import { useAtom } from "jotai";
import usePostJson from "src/hooks/usePostJson";
import { rcss } from "src/lib/css";
import {
  InputType,
  ScreenEnum,
  TabAtom,
  UserInput,
  UserInputType,
} from "src/state";
import Styles from "src/styles";

// Prompts the user for a piece of information to input
export default function () {
  const { replit } = useReplit();

  const [input, setInput] = useAtom(UserInput);
  const [, setType] = useAtom(UserInputType);
  const [, setTab] = useAtom(TabAtom);

  const [identify, { loading }] = usePostJson("/identify", {
    body: {
      info: input,
    },
    onComplete: (res) => {
      if (res.success) {
        setType(res.message as InputType);
        if (res.message === InputType.BtcAddress) {
          setTab(ScreenEnum.WalletAddress);
        } else if (res.message === InputType.TransactionHash) {
          setTab(ScreenEnum.TransactionHash);
        } else {
          setTab(ScreenEnum.Unknown);
        }
        replit?.messages.showConfirm("Identified");
      } else {
        replit?.messages.showError("Failed to identify");
        replit?.messages.showError(res.error);
      }
    },
  });

  return (
    <div
      css={[
        rcss.flex.column,
        rcss.align.center,
        rcss.justify.center,
        rcss.flex.grow(1),
      ]}
    >
      <div css={[rcss.flex.column, rcss.colWithGap(16), rcss.align.center]}>
        {/* TODO [Nathan/Ironclad/bit-json]: Random title / better title */}
        <h1 css={Styles.header}>Define the nitty-gritty of Bitcoin</h1>

        {/* TODO [Nathan]: Add better definition/description */}
        <p>Anything goes</p>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          css={[
            Styles.textarea,
            {
              minWidth: 400,
            },
          ]}
          rows={3}
          placeholder="Place Information Here"
          // TODO [IroncladDev/bit-json]: Typing animation for placeholder (Maybe)
        />

        <button css={Styles.buttonLarge} onClick={identify}>
          {loading ? "Loading..." : "Go for it"}
        </button>
      </div>
    </div>
  );
}
