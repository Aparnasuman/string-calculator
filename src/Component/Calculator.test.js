import { stringAdd } from "./StringCalculator";

describe("String Calculator", () => {
  test("returns 0 for empty string", () => {
    expect(stringAdd("")).toBe(0);
  });

  test("returns number for single input", () => {
    expect(stringAdd("5")).toBe(5);
  });

  test("adds comma-separated numbers", () => {
    expect(stringAdd("1,2,3")).toBe(6);
  });

  test("supports new line as delimiter", () => {
    expect(stringAdd("1\n2,3")).toBe(6);
  });

  test("supports custom single-character delimiter", () => {
    expect(stringAdd("//;\n1;2")).toBe(3);
  });

  test("throws error for negative numbers", () => {
    expect(() => stringAdd("1,-2,3")).toThrow("Negatives not allowed: -2");
  });

  test("supports custom delimiter of any length", () => {
    expect(stringAdd("//[***]\n1***2***3")).toBe(6);
  });

  test("supports multiple custom delimiters", () => {
    expect(stringAdd("//[*][%]\n1*2%3")).toBe(6);
  });

  test("ignores non-numeric and blank tokens", () => {
    expect(stringAdd("1,,2")).toBe(3);
  });

  test("handles custom delimiters with special regex characters", () => {
    expect(stringAdd("//[.*+?^${}()|[]\\]\n1.*+?^${}()|[]\\2")).toBe(3);
  });
});
