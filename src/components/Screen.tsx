import { rcss } from "src/lib/css";
import Navbar from "./Navbar";

export default function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div css={[rcss.flex.column, rcss.flex.grow(1)]}>
      <Navbar />
      <div
        css={[
          rcss.flex.column,
          rcss.align.center,
          rcss.justify.center,
          rcss.flex.grow(1),
        ]}
      >
        {children}
      </div>
    </div>
  );
}
