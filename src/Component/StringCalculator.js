export function add(input) {
  if (typeof input !== "string") return 0;

  input = input.trim();
  if (input === "") return 0;

  if (input.startsWith('"') && input.endsWith('"')) {
    input = input.slice(1, -1);
    input = input
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\r/g, "\r")
      .replace(/\\b/g, "\b")
      .replace(/\\x([0-9a-fA-F]{2})/g, (_, hex) =>
        String.fromCharCode(parseInt(hex, 16))
      )
      .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
        String.fromCharCode(parseInt(hex, 16))
      );
  }

  let delimiterRegex = /,|\n|\+/;

  if (input.startsWith("//")) {
    const newlineIndex = input.indexOf("\n");
    if (newlineIndex === -1) {
      return 0;
    }

    const delimiterLine = input.substring(2, newlineIndex);
    input = input.substring(newlineIndex + 1);

    const delimiterMatches = delimiterLine.matchAll(/\[(.*?)\]/g);
    const delimiters = Array.from(delimiterMatches, (m) => m[1]);

    if (delimiters.length > 0) {
      delimiterRegex = new RegExp(
        delimiters.map((d) => escapeRegex(d)).join("|"),
        "g"
      );
    } else {
      delimiterRegex = new RegExp(escapeRegex(delimiterLine), "g");
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
