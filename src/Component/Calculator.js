import React, { useState } from "react";
import { add } from "./StringCalculator";
import "./Calculator.css";

function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    try {
      const output = add(input);
      setResult(output);
      setError("");
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div className="string-calculator">
      <h2>String Calculator</h2>
      <textarea
        rows="5"
        placeholder='Enter input like "//;\n1;2" or "1,2,3"'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleCalculate}>Calculate</button>

      {error && <h3 style={{ color: "crimson" }}>{error}</h3>}
      {result !== null && !error && <h3>Result: {result}</h3>}
    </div>
  );
}

export default Calculator;
