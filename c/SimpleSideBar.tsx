import * as React from "react";
import SideBarMemoryPanel from "./SideBarMemoryPanel";

const SimpleSideBar: React.FC = () => {
  return (
    <div
      style={{
        height: "100%",
        maxWidth: 500,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#E7DFDA",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SideBarMemoryPanel />
      </div>
    </div>
  );
};

export default SimpleSideBar;
