import React, { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [firstOp, setFirstOp] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waiting, setWaiting] = useState(false);

  const inputDigit = (digit) => {
    if (waiting) {
      setDisplay(digit);
      setWaiting(false);
    } else {
      setDisplay((prev) => (prev === "0" ? digit : prev + digit));
    }
  };

  const inputDecimal = () => {
    if (waiting) {
      setDisplay("0.");
      setWaiting(false);
    } else if (!display.includes(".")) {
      setDisplay((prev) => prev + ".");
    }
  };

  const performOperation = (nextOp) => {
    const inputValue = parseFloat(display);

    if (firstOp === null) {
      setFirstOp(inputValue);
    } else if (operator) {
      let result;
      switch (operator) {
        case "+":
          result = firstOp + inputValue;
          break;
        case "-":
          result = firstOp - inputValue;
          break;
        case "*":
          result = firstOp * inputValue;
          break;
        case "/":
          result = inputValue === 0 ? "Error" : firstOp / inputValue;
          break;
        default:
          result = inputValue;
      }
      setDisplay(String(result));
      setFirstOp(result === "Error" ? null : result);
    }

    setWaiting(true);
    setOperator(nextOp);
  };

  const clearAll = () => {
    setDisplay("0");
    setFirstOp(null);
    setOperator(null);
    setWaiting(false);
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        {[
          "7",
          "8",
          "9",
          "/",
          "4",
          "5",
          "6",
          "*",
          "1",
          "2",
          "3",
          "-",
          "0",
          ".",
          "=",
          "+",
        ].map((btn) => {
          if (btn === ".")
            return (
              <button key={btn} onClick={inputDecimal}>
                .
              </button>
            );
          if (btn === "=")
            return (
              <button key={btn} onClick={() => performOperation("=")}>
                =
              </button>
            );
          if (["+", "-", "*", "/"].includes(btn))
            return (
              <button key={btn} onClick={() => performOperation(btn)}>
                {btn}
              </button>
            );
          return (
            <button key={btn} onClick={() => inputDigit(btn)}>
              {btn}
            </button>
          );
        })}
        <button onClick={clearAll}>C</button>
      </div>
    </div>
  );
}

export default Calculator;
