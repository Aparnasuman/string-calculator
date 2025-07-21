import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Calculator from "./Calculator";

test("initial display shows 0", () => {
  render(<Calculator />);
  expect(screen.getByText("0")).toBeInTheDocument();
});

test("clicking a digit displays that digit", () => {
  render(<Calculator />);
  fireEvent.click(screen.getByText("5"));
  expect(screen.getByText("5")).toBeInTheDocument();
});

test("performs addition: 1 + 2 = 3", () => {
  render(<Calculator />);
  fireEvent.click(screen.getByText("1"));
  fireEvent.click(screen.getByText("+"));
  fireEvent.click(screen.getByText("2"));
  fireEvent.click(screen.getByText("="));
  expect(screen.getByText("3")).toBeInTheDocument();
});

test("division by zero shows Error", () => {
  render(<Calculator />);
  fireEvent.click(screen.getByText("7"));
  fireEvent.click(screen.getByText("/"));
  fireEvent.click(screen.getByText("0"));
  fireEvent.click(screen.getByText("="));
  expect(screen.getByText("Error")).toBeInTheDocument();
});

test("clear button resets display to 0", () => {
  render(<Calculator />);
  fireEvent.click(screen.getByText("9"));
  fireEvent.click(screen.getByText("C"));
  expect(screen.getByText("0")).toBeInTheDocument();
});
