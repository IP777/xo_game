import React from "react";
import styled from "styled-components";

const CustomTextInputWrapper = styled.div`
  .cti_name {
    font-size: 12px;
  }
  .cti_input {
    padding: 3px;
  }
`;

export default function CustomTextInput({
  value,
  onChange,
  className,
  helperText,
}) {
  return (
    <CustomTextInputWrapper className={className}>
      <div className="cti_name">{helperText}</div>
      <input
        value={value}
        className="cti_input"
        onChange={(e) => onChange(e.target.value)}
        type="text"
        placeholder="Введіть нік гравця"
      />
    </CustomTextInputWrapper>
  );
}
