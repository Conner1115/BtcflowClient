import "../styles/globals.css";
import type { AppProps } from "next/app";
import { HandshakeProvider, useThemeValues } from "@replit/extensions-react";
import Head from "next/head";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // Get Replit's theme colors so we can sync the theme
  const themeValues = useThemeValues();

  // Insert the theme colors into the extension as CSS variables
  const mappedThemeValues = themeValues
    ? Object.entries(themeValues).map(
        ([key, val]) =>
          `--${key.replace(
            /[A-Z]/g,
            (c) => "-" + c.toLowerCase()
          )}: ${val} !important;`
      )
    : [];

  return (
    <>
      <Head>
        <style>{`:root, .replit-ui-theme-root {
${mappedThemeValues.join("\n")}
        }`}</style>
        <title>Btcflow</title>
        <meta name="description" content="Bitcoin but it flows" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        css={{
          overflowX: "hidden",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
        }}
      >
        {children}
      </div>
    </>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HandshakeProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </HandshakeProvider>
  );
}

export default MyApp;
