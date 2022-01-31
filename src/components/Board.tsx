import {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./Board.module.css";
import Cell from "./Cell";
import Modal from "./Modal";

const Board: React.FC = () => {
  let firstLoad = useRef(false);
  const [humanMoved, setHumanMoved]: [boolean, Function] = useState(false);
  const [cellStatus, setCellStatus]: [(string | null)[], Function] = useState(
    new Array(9).fill(null, 0)
  );
  const [openCells, setOpenCells]: [number[], Function] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8,
  ]);
  const [computerMoves, setComputerMoves]: [number[], Function] = useState([]);
  const [showModal, setShowModal]: [boolean, Function] = useState(false);

  let cells: ReactElement[] = [];

  const WINNING_CONDITIONS: number[][] = useMemo(
    () => [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ],
    []
  );

  const checkForWinner = useCallback((board: (null | string)[]) => {
    for (let idx = 0; idx < WINNING_CONDITIONS.length; idx += 1) {
      let [index0, index1, index2] = [
        WINNING_CONDITIONS[idx][0],
        WINNING_CONDITIONS[idx][1],
        WINNING_CONDITIONS[idx][2],
      ];
      console.log(board[index0], board[index1], board[index2]);

      if (
        [index0, index1, index2].every((index) => {
          return board[index] === "X";
        })
      ) {
        return "human";
      } else if (
        [index0, index1, index2].every((index) => {
          return board[index] === "O";
        })
      ) {
        return "computer";
      }
    }
    return false;
  }, []);

  const humanMovedHandler = (cellNumber: number) => {
    let open = openCells.filter((cell) => cell !== cellNumber);
    if (open.length === 0) setShowModal(true);
    setOpenCells(open);
    let cellStatusCopy = cellStatus.slice(0);
    cellStatusCopy[cellNumber] = "X";
    let winner = checkForWinner(cellStatusCopy);
    console.log("winner", winner);
    if (winner) {
      setShowModal(true);
      return;
    }
    setCellStatus(cellStatusCopy);
    setHumanMoved(true);
  };

  const computerMove = useCallback(() => {
    let index = Math.floor(Math.random() * openCells.length);
    let cell = openCells[index];

    //setComputerMoves([...computerMoves, cell]);
    let open = openCells.filter((cellNumber) => cellNumber !== cell);
    if (open.length === 0) setShowModal(true);
    let cellStatusCopy = cellStatus.slice(0);
    cellStatusCopy[cell] = "O";
    let winner = checkForWinner(cellStatusCopy);
    if (winner) {
      setShowModal(true);
      return;
    }
    setOpenCells(open);
  }, [openCells, cellStatus, checkForWinner]);

  const closeModalHandler = () => {
    setShowModal(false);
  };

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

  return (
    <>
      {showModal && <Modal onClose={closeModalHandler}>Hi</Modal>}
      <div className={styles.board}>{cells}</div>
    </>
  );
};

export default Board;
