import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import BubbleWordMark from "../c/BubbleWordMark";
import "react-phone-number-input/style.css";

const Start: NextPage = () => {
  return (
    <div>
      <Head>
        <title>tht.ooo</title>
        <meta name="description" content="it really is something" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Inter:wght@500&family=Roboto+Condensed:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div
        style={{
          height: "100vh",
          backgroundColor: "#fbfbf8",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 0,
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <BubbleWordMark />
        </div>
      </div>
    </div>
  );
};

export default Start;
