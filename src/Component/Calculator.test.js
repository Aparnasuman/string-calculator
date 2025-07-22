import { add } from "./StringCalculator";

describe("String Calculator", () => {
  test("returns 0 for empty input", () => {
    expect(add("")).toBe(0);
  });

  test("returns 0 for null input", () => {
    expect(add(null)).toBe(0);
  });

  test("returns 0 for undefined input", () => {
    expect(add(undefined)).toBe(0);
  });

  test("adds comma-separated numbers", () => {
    expect(add("1,2,3")).toBe(6);
  });

  test("adds plus-separated numbers", () => {
    expect(add("1+2+3")).toBe(6);
  });

  test("adds mixed comma and plus", () => {
    expect(add("1+2,3")).toBe(6);
  });

  test("ignores invalid numbers and sums valid ones", () => {
    expect(add("1,abc,2")).toBe(3);
  });

  test("handles custom single-character delimiter", () => {
    expect(add("//;\n1;2")).toBe(3);
  });

  test("handles custom multi-character delimiter", () => {
    expect(add("//***\n1***2***3")).toBe(6);
  });

  test("handles space as delimiter", () => {
    expect(add("// \n1 2 3")).toBe(6);
  });

  test("handles escaped characters correctly", () => {
    expect(add('"Line\\n1"')).toBe(0); // Should return 0 as it's not numeric
  });

  test("handles decimal values", () => {
    expect(add("1.5+2.5")).toBe(4);
  });

  test("handles whitespace around numbers", () => {
    expect(add(" 1 , 2 , 3 ")).toBe(6);
  });

  test("ignores trailing delimiters", () => {
    expect(add("1,2,")).toBe(3);
  });

  test("returns 0 if custom delimiter has no newline", () => {
    expect(add("//;\n")).toBe(0);
  });

  test("returns 0 if custom delimiter format is broken", () => {
    expect(add("//;")).toBe(0);
  });

  test("supports zero as input", () => {
    expect(add("0,0,0")).toBe(0);
  });

  test("handles negative numbers", () => {
    expect(add("-1,-2,3")).toBe(0);
  });

  test("handles input with unicode escape \\u0031", () => {
    expect(add('"\\u0031"')).toBe(1);
  });

  test("handles hex escape \\x32", () => {
    expect(add('"\\x32"')).toBe(2);
  });

  test("ignores null characters \\0", () => {
    expect(add('"3\\0"')).toBe(3);
  });
});
