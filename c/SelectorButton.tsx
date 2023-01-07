import * as React from "react";
import BuildContext from "../contexts/BuildContext";

interface SelectorButtonProps {
  message: any;
  selected?: boolean;
  index: number;
}

const SelectorButton: React.FC<SelectorButtonProps> = ({
  message,
  selected,
  index,
}) => {
  // const [selected, setSelected] = React.useState(false);

  // const handleClick = () => {
  //   setSelected(!selected);
  //   onClick(selected);
  // };
  // console.log("message is", message);

  const { handleSelectLine, selMessages } = React.useContext(BuildContext);

  const handleClick = () => {
    handleSelectLine(message);
  };

  const selMsgIds = selMessages.map((m: any) => m.id);

  return (
    <button
      onClick={handleClick}
      style={{
        borderStyle: "none",
        backgroundColor: selMsgIds.includes(message.id) ? "#ffaa33" : "#aa5599",
        margin: "10px 0px 10px 10px",
        borderRadius: 2,
        cursor: "pointer",
        height: 18,
        width: 18,
      }}
    />
  );
};

export default SelectorButton;
