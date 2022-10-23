import React from "react";

export default function ChoiceBtn({ text, onClick }) {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
}
