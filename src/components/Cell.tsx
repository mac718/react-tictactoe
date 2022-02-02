import React, { useState } from "react";
import styles from "./Cell.module.css";

interface CellProps {
  moved: (key: number) => void;
  mark: string | null;
  cellNumber: number;
}

const Cell: React.FC<CellProps> = (props: CellProps) => {
  const [selected, setSelected] = useState(false);

  let classes;

  if (props.mark === "X") {
    classes = styles["human-cell"];
  } else if (props.mark === "O") {
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
      {props.mark}
    </div>
  );
};

export default Cell;
