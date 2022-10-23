import _ from "lodash";

export const matrixGenerator = (m) => {
  const arr = [];
  for (let i = 0; i < m; i++) {
    for (let si = 0; si < m; si++) {
      arr.push({ xy: `${si},${i}`, check: false });
    }
  }
  const matrixArr = [];
  for (let i = 0; i < m * m; i++) {
    matrixArr.push({ id: i, num: 0 });
  }
  return arr;
};

const genPlayerWArr = (player, count) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(player);
  }
  return arr.toString();
};

const checkLogic = (diagonal, ps, logic) => {
  const findCoord = ps.find((i) => i.xy === logic);
  diagonal.push(findCoord ? findCoord.check : false);
};

const comparator = (diagonal, checker) =>
  _.compact(diagonal).toString().includes(checker);

export const checkWin = (playerStepsM, player, mNumber) => {
  const checker = genPlayerWArr(player, mNumber);
  const gameBoard = Math.sqrt(playerStepsM.length);

  // Horizontal and vertical render
  for (let indx = 0; indx < gameBoard; indx++) {
    const checkVertArr = [];
    const checkHorArr = [];
    for (let si = 0; si < gameBoard; si++) {
      checkVertArr.push(
        playerStepsM.find((i) => i.xy === `${si},${indx}`).check
      );
      checkHorArr.push(
        playerStepsM.find((i) => i.xy === `${indx},${si}`).check
      );
    }

    if (comparator(checkVertArr, checker) || comparator(checkHorArr, checker)) {
      return true;
    }
  }
  // Diagonal render
  const checkDiagonal1 = [];
  const checkDiagonal2 = [];
  for (let indx = 0; indx < gameBoard; indx++) {
    checkDiagonal1.push(
      playerStepsM.find((i) => i.xy === `${indx},${indx}`).check
    );
    checkDiagonal2.push(
      playerStepsM.find((i) => i.xy === `${gameBoard - 1 - indx},${indx}`).check
    );
  }

  const diagonalChecker =
    comparator(checkDiagonal1, checker) || comparator(checkDiagonal2, checker);
  if (diagonalChecker) {
    return true;
  }

  // Additional diagonal
  if (gameBoard > mNumber) {
    const steps = gameBoard - mNumber;
    for (let pi = 1; pi < steps + 1; pi++) {
      const checkDiagonal3 = [];
      const checkDiagonal4 = [];
      const checkDiagonal5 = [];
      const checkDiagonal6 = [];
      for (let indx = 0; indx < gameBoard; indx++) {
        checkLogic(checkDiagonal3, playerStepsM, `${indx + pi},${indx}`);
        checkLogic(checkDiagonal4, playerStepsM, `${indx},${indx + pi}`);
        checkLogic(
          checkDiagonal5,
          playerStepsM,
          `${gameBoard - indx - pi},${indx}`
        );
        checkLogic(
          checkDiagonal6,
          playerStepsM,
          `${gameBoard - 1 - indx},${indx + 1}`
        );
      }

      const diagonalChecker =
        comparator(checkDiagonal3, checker) ||
        comparator(checkDiagonal4, checker) ||
        comparator(checkDiagonal5, checker) ||
        comparator(checkDiagonal6, checker);
      if (diagonalChecker) {
        return true;
      }
    }
  }

  return false;
};
