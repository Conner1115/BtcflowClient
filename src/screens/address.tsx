import { rcss } from "src/lib/css";
import Screen from "src/components/Screen";
import Styles from "src/styles";
import { useAtom } from "jotai";
import { UserInput } from "src/state";
import { breakdownAddress } from "src/lib/breakdown";
import { useMemo } from "react";
import BreakdownContainer from "src/components/breakdown/container";

export default function () {
  const [userInput] = useAtom(UserInput);

  const breakdown = useMemo(() => breakdownAddress(userInput), [userInput]);

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
            <h1 css={Styles.header}>Bitcoin Address</h1>

            <p>
              Bitcoin addresses are unique identifiers consisting of letters and
              numbers used to send or receive bitcoins. They are associated with
              a private key that is known only to the owner of the address.
            </p>

            <BreakdownContainer
              breakdown={breakdown.breakdownDetails}
              initialValue={userInput}
            />
          </div>
        </div>
      </div>
    </Screen>
  );
}
