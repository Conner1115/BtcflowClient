import { rcss, tokens } from "src/lib/css";
import { useAtom } from "jotai";
import Styles from "src/styles";
import { OpenAIApiKey, ScreenEnum, TabAtom, ChatOpen } from "src/state";
import { useEffect, useState, useRef } from "react";
import useCurrentUser from "src/hooks/useCurrentUser";
import usePostJson from "src/hooks/usePostJson";
import { useReplit } from "@replit/extensions-react";
import { Loader, ChevronRight, X } from "react-feather";

interface Message {
  text: string;
  isUser: boolean;
}

const Message = ({
  text,
  isUser = false,
  last,
  first,
}: {
  text: string;
  isUser?: boolean;
  last?: boolean;
  first?: boolean;
}) => {
  const user = useCurrentUser();
  const [, setChatOpen] = useAtom(ChatOpen);

  return (
    user && (
      <div
        css={[
          rcss.p(8),
          rcss.flex.row,
          rcss.rowWithGap(8),
          last
            ? undefined
            : {
                borderBottom: `solid 1px ${tokens.backgroundHighest}`,
              },
          rcss.align.start,
        ]}
      >
        <img
          src={isUser ? user.image : "/openai.png"}
          width={24}
          height={24}
          css={[
            rcss.borderRadius(8),
            {
              border: `solid 1px ${tokens.backgroundHighest}`,
            },
          ]}
        />
        <p css={Styles.smallParagraph}>{text}</p>
        {first && (
          <button css={Styles.button} onClick={() => setChatOpen(false)}>
            <X size={16} />
          </button>
        )}
      </div>
    )
  );
};

export default function AIChat({
  initialMessage,
}: {
  initialMessage?: string;
}) {
  const [apiKey] = useAtom(OpenAIApiKey);
  const [, setTab] = useAtom(TabAtom);

  const [text, setText] = useState("");
  const [history, setHistory] = useState<Array<Message>>([]);
  const [chatOpen, setChatOpen] = useAtom(ChatOpen);

  const taRef = useRef<HTMLTextAreaElement>(null);
  const scroller = useRef<HTMLDivElement>(null);

  const { replit } = useReplit();

  const [sendChatMessage, { loading }] = usePostJson("/chat", {
    body: {
      input: text,
      apiKey,
      history,
    },
    onComplete: (r) => {
      if (r.success) {
        setHistory((h) => [...h, { text: r.message, isUser: false }]);
        setText("");
        taRef?.current?.focus();
      } else {
        replit?.messages.showError("Failed to send message");
      }
    },
  });

  const send = () => {
    if (text.length > 0) {
      setHistory((h) => [...h, { text, isUser: true }]);
      sendChatMessage();
    }
  };

  useEffect(() => {
    if (initialMessage && setHistory) {
      setHistory([
        {
          text: initialMessage,
          isUser: false,
        },
      ]);
    }
  }, [initialMessage, setHistory]);

  useEffect(() => {
    if (scroller.current) {
      scroller.current.scrollIntoView();
    }
  }, [scroller, history, loading, chatOpen]);

  if (!apiKey) {
    return (
      <div
        css={[
          rcss.p(16),
          rcss.borderRadius(8),
          rcss.align.center,
          rcss.justify.center,
          {
            border: `dashed 2px ${tokens.backgroundHighest}`,
          },
        ]}
      >
        <div css={[rcss.flex.column, rcss.colWithGap(16), rcss.align.center]}>
          <h3>
            Add your{" "}
            <a href="https://platform.openai.com" target="_blank">
              OpenAI API key
            </a>{" "}
            to learn more
          </h3>

          <button css={Styles.button} onClick={() => setTab(ScreenEnum.OpenAI)}>
            Take me there
          </button>
        </div>
      </div>
    );
  }

  if (!chatOpen) {
    return (
      <div
        css={[
          rcss.flex.row,
          rcss.rowWithGap(8),
          rcss.borderRadius(8),
          rcss.p(8),
          rcss.align.start,
          {
            border: `solid 1px ${tokens.backgroundHighest}`,
          },
        ]}
      >
        <img
          src="/openai.png"
          width={24}
          height={24}
          css={[
            rcss.borderRadius(8),
            {
              border: `solid 1px ${tokens.backgroundHighest}`,
            },
          ]}
        />
        <p css={Styles.smallParagraph}>{initialMessage}</p>
        <button css={Styles.button} onClick={() => setChatOpen(true)}>
          <ChevronRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div
      css={[
        rcss.flex.column,
        rcss.colWithGap(8),
        rcss.borderRadius(8),
        rcss.flex.growAndShrink(1),
        {
          border: `solid 1px ${tokens.backgroundHighest}`,
          overflow: "hidden",
          maxHeight: "75vh",
        },
      ]}
    >
      <div css={[rcss.flex.column, rcss.flex.grow(1), rcss.position.relative]}>
        <div
          css={[
            rcss.position.absolute,
            rcss.flex.column,
            rcss.flex.grow(1),
            {
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              overflowY: "auto",
            },
          ]}
        >
          {history.map((message, i) => (
            <Message
              {...message}
              last={i === history.length - 1}
              first={i === 0}
              key={i}
            />
          ))}

          {history.length === 1 ? (
            <div css={[rcss.flex.row, rcss.rowWithGap(8), rcss.align.center]}>
              <div
                css={[
                  rcss.flex.grow(1),
                  {
                    borderTop: `dashed 1px ${tokens.backgroundHighest}`,
                  },
                ]}
              ></div>

              <span
                css={[
                  Styles.smallParagraph,
                  {
                    color: tokens.foregroundDimmest,
                  },
                ]}
              >
                Ask a follow-up question
              </span>

              <div
                css={[
                  rcss.flex.grow(1),
                  {
                    borderTop: `dashed 1px ${tokens.backgroundHighest}`,
                  },
                ]}
              ></div>
            </div>
          ) : null}

          {loading ? (
            <div
              css={[
                rcss.p(8),
                rcss.flex.row,
                rcss.rowWithGap(8),
                rcss.align.center,
                {
                  borderBottom: `solid 1px ${tokens.backgroundHighest}`,
                },
              ]}
            >
              <img
                src="/openai.png"
                width={24}
                height={24}
                css={[
                  rcss.borderRadius(8),
                  {
                    border: `solid 1px ${tokens.backgroundHighest}`,
                  },
                ]}
              />
              <Loader
                color={tokens.foregroundDimmest}
                className="load"
                size={16}
              />
            </div>
          ) : null}

          <div ref={scroller} />
        </div>
      </div>

      <div
        css={[
          rcss.px(8),
          rcss.pb(8),
          rcss.flex.row,
          rcss.rowWithGap(8),
          rcss.align.start,
        ]}
      >
        <textarea
          css={[Styles.textarea, rcss.flex.grow(1)]}
          placeholder="..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (!e.shiftKey) {
                e.preventDefault();
                send();
              }
            }
          }}
          disabled={loading}
          ref={taRef}
        />

        <button css={Styles.button} onClick={send} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}
