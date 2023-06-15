import React from "react";
import "./App.css";
import Board from "./components/Board";
import styles from "./App.module.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className={styles.heading}>Tic Tac Toe</h1>
      <Board />
    </div>
  );
};

export default App;
