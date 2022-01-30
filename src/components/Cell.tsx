import React, { useState } from "react";
import styles from "./Cell.module.css";

interface CellProps {
  moved: (key: number) => void;
  cellNumber: number;
  computerSelected: boolean;
}

const Cell: React.FC<CellProps> = (props: CellProps) => {
  const [selected, setSelected] = useState(false);

  let classes;

  if (selected) {
    classes = styles["human-cell"];
  } else if (props.computerSelected) {
    classes = styles["computer-cell"];
  } else {
    classes = styles["empty-cell"];
  }
  const cellClickHandler = (): void => {
    setSelected(true);
    props.moved(props.cellNumber);
  };
  return (
    <div className={classes} onClick={cellClickHandler}>
      {selected && "X"}
      {props.computerSelected && "O"}
    </div>
  );
};

export default Cell;
