export function stringAdd(input) {
  if (!input || input.trim() === "") return 0;

  let delimiter = /,|\n/;
  let numbers = input;

  if (input.startsWith("//")) {
    const parts = input.split("\n");
    const delimiterLine = parts[0];
    numbers = parts.slice(1).join("\n");

    // Match custom delimiter format
    const delimiterMatch = delimiterLine.match(/\/\/(\[.*?\]|.)/g);

    if (delimiterMatch) {
      const delimiters = delimiterMatch.map((d) => d.replace(/\/|\[|\]/g, ""));
      delimiter = new RegExp(delimiters.map((d) => escapeRegExp(d)).join("|"));
    }
  }

  const tokens = numbers.split(delimiter).filter((n) => n.trim() !== "");
  const negatives = tokens.filter((n) => parseFloat(n) < 0);

  if (negatives.length > 0) {
    throw new Error("Negatives not allowed: " + negatives.join(", "));
  }

  return tokens.reduce((sum, val) => {
    let num = parseFloat(val);
    if (!isNaN(num)) sum += num;
    return sum;
  }, 0);
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
