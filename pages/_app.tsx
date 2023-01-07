import * as React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";

import SessionUserProvider from "../contexts/SessionUserProvider";
import BuildProvider from "../contexts/BuildProvider";

function MyApp({ Component, pageProps }: AppProps) {
  const [initialRenderComplete, setInitialRenderComplete] =
    React.useState(false);
  // This useEffect will only run once, during the first render
  React.useEffect(() => {
    // Updating a state causes a re-render
    setInitialRenderComplete(true);
  }, []);
  return initialRenderComplete ? (
    <SessionUserProvider>
      <BuildProvider>
        <Component {...pageProps} />
      </BuildProvider>
    </SessionUserProvider>
  ) : (
    <div>loading...</div>
  );
}

export default MyApp;
