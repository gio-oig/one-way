import Button from "../button/button";

type SelectButton = {
  value: string;
  onClick: () => void;
};

const SelectButton = ({ value, onClick }: SelectButton) => {
  return (
    <Button
      className="border px-1 py-1  font-normal capitalize"
      onClick={onClick}
    >
      {value}
    </Button>
  );
};

export default SelectButton;
