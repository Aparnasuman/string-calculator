import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Calculator from "./Calculator";

const getDisplay = () => screen.getByTestId("display");

test("initial display shows 0", () => {
  render(<Calculator />);
  expect(getDisplay().textContent).toBe("0");
});

test("clicking a digit displays that digit", () => {
  render(<Calculator />);
  fireEvent.click(screen.getByText("5"));
  expect(getDisplay().textContent).toBe("5");
});

test("performs addition: 1 + 2 = 3", () => {
  render(<Calculator />);
  fireEvent.click(screen.getByText("1"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("2"));
  fireEvent.click(screen.getByText("="));
  expect(getDisplay().textContent).toBe("3");
});

test("division by zero shows Error", () => {
  render(<Calculator />);
  fireEvent.click(screen.getByText("7"));
  fireEvent.click(screen.getByText("/"));
  fireEvent.click(screen.getByText("0"));
  fireEvent.click(screen.getByText("="));
  expect(getDisplay().textContent).toBe("Error");
});

test("clear button resets display to 0", () => {
  render(<Calculator />);
  fireEvent.click(screen.getByText("9"));
  fireEvent.click(screen.getByText("C"));
  expect(getDisplay().textContent).toBe("0");
});
