import { add } from "./StringCalculator";

describe("String Calculator", () => {
  test("returns 0 for empty string", () => {
    expect(add("")).toBe(0);
  });

  test("returns number for single input", () => {
    expect(add("1")).toBe(1);
  });

  test("adds two numbers", () => {
    expect(add("1,5")).toBe(6);
  });

  test("adds multiple numbers", () => {
    expect(add("1,2,3,4")).toBe(10);
  });

  test("supports newline as delimiter", () => {
    expect(add("1\n2,3")).toBe(6);
  });

  test("supports custom delimiter ;", () => {
    expect(add("//;\n1;2")).toBe(3);
  });

  test("throws error for single negative number", () => {
    expect(() => add("1,-2,3")).toThrow("negative numbers not allowed: -2");
  });

  test("throws error for multiple negative numbers", () => {
    expect(() => add("1,-2,-5,3")).toThrow(
      "negative numbers not allowed: -2, -5"
    );
  });

  test("supports long custom delimiter", () => {
    expect(add("//[***]\n1***2***3")).toBe(6);
  });

  test("supports multiple custom delimiters", () => {
    expect(add("//[*][%]\n1*2%3")).toBe(6);
  });

  test("supports multiple long custom delimiters", () => {
    expect(add("//[***][%%]\n1***2%%3")).toBe(6);
  });

  test("handles special regex characters in delimiters", () => {
    expect(add("//[.*+?^${}()|[\\]]\n1.*+?^${}()|[\\]2")).toBe(3);
  });
});
