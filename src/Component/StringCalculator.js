// StringCalculator.js
export function add(numbers) {
  if (!numbers) return 0;

  let delimiter = /,|\n/; // default delimiter: comma or newline
  let numberString = numbers;

  // Custom delimiter syntax
  if (numbers.startsWith("//")) {
    const match = numbers.match(/^\/\/(.+)\n(.*)$/);
    if (match) {
      const custom = match[1];
      numberString = match[2];

      // Multiple delimiters: //[***][%]
      const multiDelims = [...custom.matchAll(/\[([^\]]+)\]/g)].map(
        (m) => m[1]
      );

      if (multiDelims.length > 0) {
        delimiter = new RegExp(multiDelims.map(escapeRegExp).join("|"), "g");
      } else {
        delimiter = new RegExp(escapeRegExp(custom), "g");
      }
    }
  }

  const tokens = numberString.split(delimiter).filter(Boolean);
  const negatives = tokens.filter((n) => parseInt(n) < 0);

  if (negatives.length > 0) {
    throw new Error(`negative numbers not allowed: ${negatives.join(", ")}`);
  }

  return tokens.reduce((sum, n) => sum + parseInt(n || 0, 10), 0);
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
