import { rcss } from "src/lib/css";
import Screen from "src/components/Screen";
import Styles from "src/styles";
import { useAtom } from "jotai";
import { UserInput } from "src/state";
import { parseTransaction } from "src/lib/breakdown";
import { useMemo } from "react";
import BreakdownContainer from "src/components/breakdown/container";

export default function () {
  const [userInput] = useAtom(UserInput);

  const breakdown = useMemo(() => parseTransaction(userInput), [userInput]);

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
          <div
            css={[
              rcss.flex.column,
              rcss.colWithGap(16),
              rcss.align.center,
              rcss.flex.grow(1),
            ]}
          >
            <h1 css={Styles.header}>Transaction ID</h1>

            <p>
              A transaction ID is a unique identifier for a specific transaction
              on a blockchain. It is generated from the transaction data and
              helps users locate, track, and verify transaction details. In
              cryptocurrencies like Bitcoin, it is a 64-character hexadecimal
              string derived by double-hashing the transaction data using the
              SHA-256 algorithm.
            </p>

            <BreakdownContainer
              breakdown={breakdown.breakdownDetails.filter(
                (x) => x.value.length && x.value
              )}
              initialValue={userInput}
            />
          </div>
        </div>
      </div>
    </Screen>
  );
}
