import * as React from "react";
import BuildThreadSelect from "./BuildThreadSelect";
import ResetThreadButton from "./ResetThreadButton";

const FunctionBar: React.FC = () => {
  return (
    <div
      style={{
        height: 44,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#CBE6F6",
        paddingTop: 16,
        alignItems: "baseline",
        justifyContent: "space-between",
      }}
    >
      <div style={{ marginLeft: 20 }}>
        <ResetThreadButton />
      </div>
      <div style={{ marginRight: 24 }}>
        <BuildThreadSelect />
      </div>
    </div>
  );
};

export default FunctionBar;
