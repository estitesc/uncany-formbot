import * as React from "react";

interface TermLineBubProps {
  content: string;
  sender: string;
  senderColor: string;
  isFromUser?: boolean;
}

const TermLineBub: React.FC<TermLineBubProps> = ({
  content,
  sender,
  senderColor,
  isFromUser,
}) => {
  return (
    <div
      style={{
        padding: 12,
        marginLeft: 12,
        marginRight: 12,
        borderRadius: 12,
        fontFamily: "Inconsolata",
        fontSize: 14,
      }}
    >
      <span
        style={{ color: senderColor, fontWeight: "bold" }}
      >{`${sender} > `}</span>
      <span style={{ color: "#fbfbf8" }}>{content}</span>
    </div>
  );
};

export default TermLineBub;
