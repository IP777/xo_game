import React from "react";
import styled from "styled-components";
import draw from "../assets/image/draw.jpg";

const DrawModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: #02020242;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 10px 60px;
    .wmw_title {
      font-weight: 500;
      font-size: 20px;
      margin-bottom: 10px;
    }
    .wmw_IMG {
      width: 350px;
      margin: 30px 0;
    }
    .btn_block {
      display: flex;
      .button_block_s {
        width: 140px;
        padding: 3px;
      }
    }
  }
`;

export default function DrawModal({
  setModalIsOpen,
  setDrawModalOpen,
  callBackFunction,
}) {
  return (
    <DrawModalWrapper>
      <div className="modal">
        <div className="wmw_title">Нічія</div>
        <img src={draw} alt="" className="wmw_IMG" />

        <div className="btn_block">
          <button
            className="button_block_s"
            type="button"
            onClick={() => {
              setDrawModalOpen(false);
              callBackFunction();
            }}
          >
            Зіграти ще раз?
          </button>
          <button
            className="button_block_s"
            type="button"
            style={{ marginLeft: 10 }}
            onClick={() => {
              setModalIsOpen(true);
              setDrawModalOpen(false);
              callBackFunction();
            }}
          >
            Розпочати нову гру
          </button>
        </div>
      </div>
    </DrawModalWrapper>
  );
}
