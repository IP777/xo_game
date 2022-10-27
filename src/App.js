import React, { useState } from "react";
import { matrixGenerator, checkWin } from "./utils";
import NewGameModal from "./modal/NewGameModal";
import styled from "styled-components";
import WinModal from "./modal/WinModal";
import DrawModal from "./modal/DrawModal";
// import CircumIcon from "@klarr-agency/circum-icons-react";

const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: blanchedalmond;

  .game_subwrapper {
    .player_counter {
      display: flex;
      justify-content: space-between;
      padding: 0;
      .player_name {
        margin-left: 5px;
        font-weight: 600;
      }
      .player_symbol {
        margin-left: 5px;
        font-family: "Comfortaa";
        font-weight: 500;
      }
    }
    .game_deck {
      display: grid;
      margin: 0, auto;
      .click_box {
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        outline: 2px solid black;
        background-color: aliceblue;
        font-family: "Comfortaa";
        font-weight: 600;
        font-size: 35px;
        .x {
          color: #000;
        }
        .o {
          color: #b83e3e;
        }
        .z {
          color: #0f8ab7;
        }
      }
    }
    .new_game_btn {
      width: 100%;
      margin-top: 10px;
    }
    .score_box {
      margin-top: 5px;
    }
  }
`;

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [playerCounter, setPlayerCounter] = useState(2);
  const [mNumber, setMNumber] = useState(3);
  const [deltaMatrix, setDeltaMatrix] = useState(3);
  const [gameMatrix, setGameMatrix] = useState(matrixGenerator(deltaMatrix));
  const [player, setPlayer] = useState(1);
  const [playersName, setPlayersName] = useState([
    { id: 1, name: "", score: 0, symbol: "X", color: "#000" },
    { id: 2, name: "", score: 0, symbol: "O", color: "#b83e3e" },
    { id: 3, name: "", score: 0, symbol: "Z", color: "#0f8ab7" },
  ]);
  const [winModalOpen, setWinModalOpen] = useState(false);
  const [drawModalOpen, setDrawModalOpen] = useState(false);

  const clickOnBoard = ({ xy, check }) => {
    if (!check) {
      const stepArr = gameMatrix.map((iter) => {
        if (xy === iter.xy) return { ...iter, check: player };
        return iter;
      });

      if (checkWin(stepArr, player, mNumber, playerCounter)) {
        setPlayersName(
          playersName.map((i) =>
            i.id === player ? { ...i, score: i.score + 1 } : i
          )
        );
        setWinModalOpen(true);
        return;
      }
      const stepArrLength = stepArr.filter((i) => i.check);
      if (stepArrLength.length === gameMatrix.length) setDrawModalOpen(true);
      setGameMatrix(stepArr);
      const playerStep = playerCounter === player ? 1 : player + 1;
      setPlayer(playerStep);
    }
  };

  const targetPlayer = playersName.find((i) => i.id === player);

  return (
    <AppWrapper>
      {modalIsOpen && (
        <NewGameModal
          setMNumber={setMNumber}
          setGameMatrix={setGameMatrix}
          setPlayerCounter={setPlayerCounter}
          setDeltaMatrix={setDeltaMatrix}
          setModalIsOpen={setModalIsOpen}
          deltaMatrix={deltaMatrix}
          playersName={playersName}
          setPlayersName={setPlayersName}
          playerCounter={playerCounter}
        />
      )}

      {winModalOpen && (
        <WinModal
          setModalIsOpen={setModalIsOpen}
          setWinModalOpen={setWinModalOpen}
          playersName={targetPlayer}
          callBackFunction={() => {
            setGameMatrix(matrixGenerator(deltaMatrix));
            setPlayer(1);
          }}
        />
      )}
      {drawModalOpen && (
        <DrawModal
          setModalIsOpen={setModalIsOpen}
          setDrawModalOpen={setDrawModalOpen}
          callBackFunction={() => {
            setGameMatrix(matrixGenerator(deltaMatrix));
            setPlayer(1);
          }}
        />
      )}

      <div className="game_subwrapper">
        <p className="player_counter">
          <span>
            Ходить
            <span className="player_name">{targetPlayer.name}</span>:
            <span
              className="player_symbol"
              style={{ color: targetPlayer.color }}
            >
              {targetPlayer.symbol}
            </span>
          </span>
          <span>{gameMatrix.filter((i) => i.check === player).length}</span>
        </p>

        <div
          className="game_deck"
          style={{
            gridTemplateColumns: `repeat(${Math.sqrt(
              gameMatrix.length
            )}, 60px)`,
          }}
        >
          {gameMatrix.map((item) => (
            <div
              onClick={() => clickOnBoard(item)}
              className="click_box"
              key={item.xy}
            >
              {item.check === 1 && <div className="x">X</div>}
              {item.check === 2 && <div className="o">O</div>}
              {item.check === 3 && <div className="z">Z</div>}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="new_game_btn"
          onClick={() => {
            setGameMatrix(matrixGenerator(deltaMatrix));
            setModalIsOpen(true);
          }}
        >
          Нова гра
        </button>

        <div className="score_box">
          {playersName
            .filter((item, index) => index < playerCounter)
            .map((i) => (
              <div key={i.symbol}>{`${i.name} : ${i.score}`}</div>
            ))}
        </div>
      </div>
    </AppWrapper>
  );
}

export default App;
