import { add } from "./StringCalculator";

describe("String Calculator", () => {
  test("returns 0 for empty string", () => {
    expect(add("")).toBe(0);
  });

  test("returns number for single input", () => {
    expect(add("1")).toBe(1);
    expect(add("42")).toBe(42);
  });

  test("adds comma-separated numbers", () => {
    expect(add("1,2")).toBe(3);
    expect(add("1,2,3,4")).toBe(10);
  });

  test("adds numbers with plus signs as delimiters (converted to comma)", () => {
    expect(add("1+2+3")).toBe(6);
  });

  test("adds numbers with newline as delimiter", () => {
    expect(add("1\n2,3")).toBe(6);
  });

  test("supports custom single-character delimiter", () => {
    expect(add("//;\n1;2")).toBe(3);
    expect(add("//|\n4|5|6")).toBe(15);
  });

  test("supports custom multi-character delimiter", () => {
    expect(add("//***\n1***2***3")).toBe(6);
  });

  test("returns 0 if input starts with // but no newline present", () => {
    expect(add("//;")).toBe(0);
  });

  test("ignores non-numeric tokens", () => {
    expect(add("1,hello,3")).toBe(4);
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

  test("parses escaped newline and adds correctly", () => {
    expect(add('"1\\n2,3"')).toBe(6);
  });

  test("handles escaped tabs and other characters", () => {
    expect(add('"2\\t3"')).toBe(5);
    expect(add('"4\\r5"')).toBe(9);
  });

  test("supports hexadecimal escape \\x41 = A (non-number ignored)", () => {
    expect(add('"1\\x41,2"')).toBe(3);
  });

  test("supports unicode escape \\u0033 = 3", () => {
    expect(add('"1\\u0033"')).toBe(4);
  });

  test("returns 0 for null, undefined, or non-string input", () => {
    expect(add(null)).toBe(0);
    expect(add(undefined)).toBe(0);
    expect(add(123)).toBe(0);
  });

  test("returns correct sum when input has spaces", () => {
    expect(add(" 1 , 2 , 3 ")).toBe(6);
  });
});
