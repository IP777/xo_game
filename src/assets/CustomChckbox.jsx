import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: block;
  margin: 4px;
  font-size: 12px;
  cursor: pointer;
  .chckbox {
    padding: 3px 7px;
    border-radius: 3px;
    border: 1px solid #ffffff;
  }
  .on {
    border: 1px solid gray;
  }
  .disable {
    color: lightgray;
    cursor: default;
  }
`;

export default function CustomChckbox({
  text,
  checkbox,
  onCheck,
  disable,
  isActive = true,
}) {
  return (
    <Wrapper
      onClick={() => {
        if (!disable && isActive && text !== checkbox) onCheck(text);
      }}
    >
      <div
        className={`chckbox ${text === checkbox ? "on" : ""} ${
          disable ? "disable" : ""
        }`}
      >
        {text}
      </div>
    </Wrapper>
  );
}
