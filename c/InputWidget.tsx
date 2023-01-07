import * as React from "react";

interface AdderWidgetProps {
  onSubmit: (value: string) => void;
  initValue: string;
  label: string;
}

const InputWidget: React.FC<AdderWidgetProps> = ({
  onSubmit,
  initValue,
  label,
}) => {
  const [value, setValue] = React.useState(initValue);

  const submit = () => {
    onSubmit(value);
  };

  const handleKeydown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div style={{ width: 200, display: "flex" }}>
      <div>
        <input
          style={{
            width: 100,
            fontSize: 12,
            fontFamily: "Inter",
            backgroundColor: "#E7DFDA",
          }}
          value={value}
          onKeyDown={handleKeydown}
          onChange={(e: any) => setValue(e.target.value)}
        />
        <button
          onClick={submit}
          style={{
            backgroundColor: "#4BA3D2",
            fontFamily: "Inter",
            fontSize: 10,
            marginLeft: 10,
            borderRadius: 48,
            color: "#F9F7F5",
            borderWidth: 0,
            cursor: "pointer",
          }}
        >
          ok
        </button>
      </div>
    </div>
  );
};

export default InputWidget;
