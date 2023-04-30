import { useAtom } from "jotai";
import { ScreenEnum, TabAtom } from "src/state";
import PromptScreen from "src/screens/prompt";
import ErrorScreen from "src/screens/error";
import AddressScreen from "src/screens/address";
import TransactionScreen from "src/screens/transaction";
import OpenAIScreen from "src/screens/openai";
import IntroScreen from "src/screens/index";
import UnknownScreen from "src/screens/unknown";
import { useReplit } from "@replit/extensions-react";
import { HandshakeStatus } from "@replit/extensions";
import { rcss } from "src/lib/css";

const Home = () => {
  const [tab] = useAtom(TabAtom);
  const { status } = useReplit();

  if (status === HandshakeStatus.Error) {
    return (
      <div
        css={[
          rcss.flex.column,
          rcss.align.center,
          rcss.justify.center,
          rcss.flex.grow(1),
        ]}
      >
        <div css={[rcss.flex.column, rcss.colWithGap(16)]}>
          <h1>Handshake timed out</h1>

          <p>We couldn't establish a handshake with the Replit workspace.</p>

          <p>
            If you've already installed this Repl as an extension, refresh the
            extension by hitting the Reload button in the top of the tab.
          </p>
        </div>
      </div>
    );
  } else if (status === HandshakeStatus.Loading) {
    return <div>Loading...</div>;
  }

  if (tab === ScreenEnum.Prompt) {
    return <PromptScreen />;
  } else if (tab === ScreenEnum.WalletAddress) {
    return <AddressScreen />;
  } else if (tab === ScreenEnum.TransactionHash) {
    return <TransactionScreen />;
  } else if (tab === ScreenEnum.OpenAI) {
    return <OpenAIScreen />;
  } else if (tab === ScreenEnum.Intro) {
    return <IntroScreen />;
  } else if (tab === ScreenEnum.Unknown) {
    return <UnknownScreen />;
  } else {
    return <ErrorScreen />;
  }
};

export default Home;
