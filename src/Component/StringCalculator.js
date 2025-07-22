// StringCalculator.js

export function add(input) {
  if (typeof input !== "string") return 0;

  if (input.trim() === "") return 0;

  // Handle escaped string
  if (input.startsWith('"') && input.endsWith('"')) {
    input = input.slice(1, -1);
    input = input
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\r/g, "\r")
      .replace(/\\b/g, "\b")
      .replace(/\\u[0-9a-fA-F]{4}/g, (match) =>
        String.fromCharCode(parseInt(match.replace("\\u", ""), 16))
      );
  }

  let delimiterRegex = /,|\n/; // default delimiter

  if (input.startsWith("//")) {
    const newlineIndex = input.indexOf("\n");
    if (newlineIndex === -1) throw new Error("Invalid custom delimiter format");

    const delimiterLine = input.substring(2, newlineIndex);
    input = input.substring(newlineIndex + 1);

    // Support multiple delimiters
    const delimiterMatches = delimiterLine.matchAll(/\[(.*?)\]/g);
    const delimiters = Array.from(delimiterMatches, (m) => m[1]);

    if (delimiters.length > 0) {
      delimiterRegex = new RegExp(
        delimiters.map((d) => escapeRegex(d)).join("|")
      );
    } else {
      delimiterRegex = new RegExp(escapeRegex(delimiterLine));
    }
  }

  const numberStrings = input.split(delimiterRegex);
  const numbers = numberStrings
    .map((num) => parseInt(num))
    .filter((n) => !isNaN(n));

  const negatives = numbers.filter((n) => n < 0);
  if (negatives.length > 0) {
    throw new Error(`negative numbers not allowed: ${negatives.join(",")}`);
  }

  return numbers.reduce((acc, val) => acc + val, 0);
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
