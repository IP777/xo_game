import _ from "lodash";
import React, { useState } from "react";
import styled from "styled-components";
import CustomChckbox from "../assets/CustomChckbox";
import CustomTextInput from "../assets/CustomTextInput";
import { matrixGenerator } from "../utils";

const Wrapper = styled.div`
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
    .main {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .title {
        font-size: 18px;
        margin-bottom: 10px;
        font-weight: 600;
      }
      .player_choice {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
      }
    }
    .button_block_s {
      display: flex;
      justify-content: center;
    }
  }
  .sub_title {
    display: flex;
    justify-content: center;
    margin: 5px;
    font-size: 14px;
  }
  .checkbox_group {
    display: flex;
  }
  .players_name_block {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    .name_input {
      margin-bottom: 5px;
    }
  }
`;

const players = {
  c2: "2 Гравці",
  c3: "3 Гравці",
};

const board = {
  x3: "3x3",
  x4: "4x4",
  x5: "5x5",
  x6: "6x6",
  x7: "7x7",
};

export default function NewGameModal({
  setMNumber,
  setGameMatrix,
  setPlayerCounter,
  setDeltaMatrix,
  setModalIsOpen,
  deltaMatrix,
  playersName,
  setPlayersName,
  playerCounter,
}) {
  const [checkboxPlayer, setCheckboxPlayer] = useState(
    playerCounter === 2 ? players.c2 : players.c3
  );
  const [checkboxBoard, setCheckboxBoard] = useState(
    `${deltaMatrix}x${deltaMatrix}`
  );

  const createGameHandler = () => {
    // setPlayersName(playersName.map((i) => ({ ...i, score: 0 })));
    setModalIsOpen(false);
  };

  const checkboxHandler = (id) => {
    setCheckboxBoard(id);
    if (id === "3x3") {
      setMNumber(3);
      setGameMatrix(matrixGenerator(3));
      setPlayerCounter(2);
      setDeltaMatrix(3);
    }
    if (id === "4x4") {
      setMNumber(4);
      setGameMatrix(matrixGenerator(4));
      setPlayerCounter(2);
      setDeltaMatrix(4);
    }
    if (id === "5x5") {
      setMNumber(4);
      setGameMatrix(matrixGenerator(5));
      setPlayerCounter(2);
      setDeltaMatrix(5);
    }
    if (id === "6x6") {
      setMNumber(4);
      setGameMatrix(matrixGenerator(6));
      setPlayerCounter(3);
      setDeltaMatrix(6);
    }
    if (id === "7x7") {
      setMNumber(4);
      setGameMatrix(matrixGenerator(7));
      setPlayerCounter(3);
      setDeltaMatrix(7);
    }
  };

  const playerCheckboxHandler = (id) => {
    setCheckboxPlayer(id);

    if (id === players.c2) {
      setMNumber(3);
      setGameMatrix(matrixGenerator(3));
      setPlayerCounter(2);
      setDeltaMatrix(3);

      setCheckboxBoard(board.x3);
    }
    if (id === players.c3) {
      setMNumber(4);
      setGameMatrix(matrixGenerator(6));
      setPlayerCounter(3);
      setDeltaMatrix(6);

      setCheckboxBoard(board.x6);
    }
  };

  const gameDisabledHandler = () => {
    const nameArr = playersName
      .filter((i, index) => index < playerCounter)
      .map((i) => i.name);

    return !(_.compact(nameArr).length === playerCounter);
  };

  return (
    <Wrapper>
      <div className="modal">
        <div className="main">
          <div className="title">Хрестики-нолики</div>
          <div className="deck_choice">
            <div className="sub_title">Вибрати розмір поля</div>
            <div className="checkbox_group">
              <CustomChckbox
                text="3x3"
                checkbox={checkboxBoard}
                onCheck={checkboxHandler}
                disable={checkboxPlayer === players.c3}
              />
              <CustomChckbox
                text="4x4"
                checkbox={checkboxBoard}
                onCheck={checkboxHandler}
                disable={checkboxPlayer === players.c3}
              />
              <CustomChckbox
                text="5x5"
                checkbox={checkboxBoard}
                onCheck={checkboxHandler}
                disable={checkboxPlayer === players.c3}
              />
              <CustomChckbox
                text="6x6"
                checkbox={checkboxBoard}
                onCheck={checkboxHandler}
                disable={checkboxPlayer === players.c2}
              />
              <CustomChckbox
                text="7x7"
                checkbox={checkboxBoard}
                onCheck={checkboxHandler}
                disable={checkboxPlayer === players.c2}
              />
            </div>
          </div>
          <div className="player_choice">
            <div className="sub_title">Кількість гравців</div>
            <div className="checkbox_group">
              <CustomChckbox
                text={players.c2}
                checkbox={checkboxPlayer}
                onCheck={playerCheckboxHandler}
              />
              <CustomChckbox
                text={players.c3}
                checkbox={checkboxPlayer}
                onCheck={playerCheckboxHandler}
              />
            </div>
          </div>

          <div className="players_name_block">
            {playersName
              .filter((item, index) =>
                checkboxPlayer === players.c2 ? index !== 2 : true
              )
              .map((item) => (
                <CustomTextInput
                  helperText={`Гравець ${item.id}`}
                  key={item.id}
                  value={item.name}
                  className="name_input"
                  onChange={(e) => {
                    setPlayersName(
                      playersName.map((i) =>
                        i.id === item.id ? { ...i, name: e, score: 0 } : i
                      )
                    );
                  }}
                />
              ))}
          </div>
        </div>

        <button
          className="button_block_s"
          type="button"
          onClick={createGameHandler}
          disabled={gameDisabledHandler()}
        >
          Нова гра
        </button>
      </div>
    </Wrapper>
  );
}
