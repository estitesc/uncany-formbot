import * as React from "react";
import HeadWithFonts from "./HeadWithFonts";

const PleaseDesktop: React.FC = () => {
  return (
    <div>
      <HeadWithFonts />
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#fbfbf8",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Inconsolata",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <div>please come back on a desktop</div>
          <div>love, the developer</div>
        </div>
      </div>
    </div>
  );
};

export default PleaseDesktop;
