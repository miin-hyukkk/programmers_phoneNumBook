import React from "react";

interface SelectBoxProps {
  value: string;
  onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

const SelectBox: React.FC<SelectBoxProps> = ({
  value,
  onSelectChange,
  options,
}) => {
  return (
    <select value={value} onChange={onSelectChange}>
      <option value="">그룹 선택</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
