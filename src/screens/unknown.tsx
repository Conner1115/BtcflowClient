import { rcss } from "src/lib/css";
import Screen from "src/components/Screen";
import { useAtom } from "jotai";
import { ChatOpen, OpenAIApiKey, UserInput } from "src/state";
import Styles from "src/styles";
import AIChat from "src/components/AIChat";
import usePostJson from "src/hooks/usePostJson";
import { useEffect, useState } from "react";
import * as replit from "@replit/extensions";

export default function () {
  const [apiKey] = useAtom(OpenAIApiKey);
  const [userInput] = useAtom(UserInput);

  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [chatOpen] = useAtom(ChatOpen);

  const [identifyInput, { loading }] = usePostJson("/identify-noun", {
    body: {
      apiKey,
      input: userInput,
    },
    onComplete: (res) => {
      if (res.success) {
        setWord(res.noun);
        setDefinition(res.description);
      }
    },
    onError: (e) => replit?.messages.showError(e),
  });

  useEffect(() => {
    if (apiKey) {
      identifyInput();
    }
  }, [apiKey]);

  if (loading) {
    return (
      <Screen>
        <div
          css={[
            rcss.flex.column,
            rcss.colWithGap(16),
            rcss.flex.grow(1),
            rcss.p(16),
          ]}
        >
          <div
            css={[
              rcss.flex.grow(1),
              rcss.flex.column,
              rcss.align.center,
              rcss.justify.center,
            ]}
          >
            <div
              css={[rcss.flex.column, rcss.colWithGap(16), rcss.align.center]}
            >
              <h1 css={Styles.header}>Fetching Definition</h1>

              <p>
                We're currently attempting to define your input. Please wait a
                few seconds.
              </p>
            </div>
          </div>
        </div>
      </Screen>
    );
  }

  if (chatOpen) {
    return (
      <Screen>
        <div
          css={[
            rcss.flex.column,
            rcss.colWithGap(16),
            rcss.flex.grow(1),
            rcss.p(16),
            {
              width: "100%",
            },
          ]}
        >
          <div css={[rcss.flex.column, rcss.align.center, rcss.justify.center]}>
            <div
              css={[rcss.flex.column, rcss.colWithGap(16), rcss.align.center]}
            >
              <h1 css={Styles.header}>{word}</h1>
            </div>
          </div>

          <AIChat initialMessage={definition} />
        </div>
      </Screen>
    );
  }

  return (
    <Screen>
      <div
        css={[
          rcss.flex.column,
          rcss.colWithGap(16),
          rcss.flex.grow(1),
          rcss.p(16),
          {
            width: "100%",
          },
        ]}
      >
        <div
          css={[
            rcss.flex.grow(1),
            rcss.flex.column,
            rcss.align.center,
            rcss.justify.center,
          ]}
        >
          <div css={[rcss.flex.column, rcss.colWithGap(16), rcss.align.center]}>
            <h1 css={Styles.header}>
              {apiKey ? "We've identifed your input as" : "Unknown Data Type"}
            </h1>

            <h1
              css={[
                Styles.header,
                {
                  transform: `scale(1.25)`,
                },
              ]}
            >
              {word}
            </h1>

            {apiKey ? (
              <p>Escalating to GPT-3, fingers crossed.</p>
            ) : (
              <p>We weren't able to identify what your provided data was.</p>
            )}
          </div>
        </div>

        <AIChat initialMessage={definition} />
      </div>
    </Screen>
  );
}
