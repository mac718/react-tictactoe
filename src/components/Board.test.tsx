import { screen, render, queryAllByText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Board from "./Board";

describe("Board", () => {
  beforeEach(() => {
    render(<Board />);
  });

  it("renders 9 empty cells on load", () => {
    const cells = document.querySelectorAll(".empty-cell");

    expect(cells.length).toBe(9);
  });

  it("displays an 'X' when the user clicks an empty cell", () => {
    const cell = document.getElementsByClassName("empty-cell")[0];

    userEvent.click(cell);

    const clickedCell = screen.getByText("X");

    expect(clickedCell).toBeInTheDocument();
  });

  it("displays an 'O' in a different empty cell after a user marks a cell.", () => {
    const cell = document.getElementsByClassName("empty-cell")[0];

    userEvent.click(cell);

    const clickedComputerCell = screen.getByText("O");

    expect(clickedComputerCell).toBeInTheDocument();
  });

  it("does not trigger a computer move if and occupied cell is clicked by the user", () => {
    const cell = document.getElementsByClassName("empty-cell")[0];

    userEvent.click(cell);
    userEvent.click(cell);

    const clickedComputerCell = screen.queryAllByText("O");

    expect(clickedComputerCell.length).toBe(1);
  });

  it("does not allow a user to select a cell already occupied by an 'O'", () => {
    const cell = document.getElementsByClassName("empty-cell")[0];

    userEvent.click(cell);

    const computerSelected = screen.getByText("O");

    userEvent.click(computerSelected);

    const playerSelected = screen.queryAllByText("X");

    expect(playerSelected.length).toBe(1);
  });
});
