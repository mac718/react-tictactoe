import { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import styles from "./Board.module.css";
import Cell from "./Cell";

const Board: React.FC = () => {
  let firstLoad = useRef(false);
  const [humanMoved, setHumanMoved]: [boolean, Function] = useState(false);
  const [openCells, setOpenCells]: [number[], Function] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8,
  ]);
  const [computerMoves, setComputerMoves]: [number[], Function] = useState([]);

  let cells: ReactElement[] = [];

  const humanMovedHandler = (cellNumber: number) => {
    let open = openCells.filter((cell) => cell !== cellNumber);
    setOpenCells(open);
    setHumanMoved(true);
  };

  const computerMove = useCallback(() => {
    let index = Math.floor(Math.random() * openCells.length);
    let cell = openCells[index];
    console.log(index);
    setComputerMoves([...computerMoves, cell]);
    let open = openCells.filter((cellNumber) => cellNumber !== cell);
    setOpenCells(open);
  }, [computerMoves, openCells]);

  useEffect(() => {
    firstLoad.current = true;
    if (humanMoved && firstLoad.current) {
      computerMove();
    }
    setHumanMoved(false);
  }, [humanMoved, computerMove]);

  for (let i = 0; i < 9; i++) {
    cells.push(
      <Cell
        key={i}
        cellNumber={i}
        moved={humanMovedHandler}
        computerSelected={computerMoves.includes(i) ? true : false}
      />
    );
  }

  console.log(openCells);

  return <div className={styles.board}>{cells}</div>;
};

export default Board;
