import * as React from "react";
import WordMark from "./WordMark";

const MarkBarSimple: React.FC = () => {
  return (
    <div
      style={{
        height: 44,
        width: "100%",
        display: "flex",
        backgroundColor: "#F9F7F5",
        paddingTop: 16,
        alignItems: "baseline",
        justifyContent: "space-between",
      }}
    >
      <WordMark />
    </div>
  );
};

export default MarkBarSimple;
