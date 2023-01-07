import Head from "next/head";
import * as React from "react";

const HeadWithFonts: React.FC = () => {
  return (
    <Head>
      <title>hf0 formbot</title>
      <meta name="description" content="it really is something" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Inter:wght@500&family=Inconsolata:wght@400;700&family=Roboto+Condensed:wght@400;700&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
};

export default HeadWithFonts;
