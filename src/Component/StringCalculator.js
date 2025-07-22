export function stringAdd(input) {
  if (!input) return 0;

  let delimiters = [",", "\n"];
  let numbers = input;

  // Check for custom delimiter syntax
  if (input.startsWith("//")) {
    const delimiterSection = input.match(/^\/\/(.+)\n/)[1];
    numbers = input.split("\n").slice(1).join("\n");

    // Multiple custom delimiters (e.g. //[***][%%])
    if (delimiterSection.includes("[")) {
      const matches = delimiterSection.match(/\[([^\]]+)\]/g);
      delimiters = matches.map((d) => d.slice(1, -1)); // remove brackets
    } else {
      // Single-character delimiter (e.g. //;\n)
      delimiters = [delimiterSection];
    }
  }

  // Escape special characters in delimiters
  const escapedDelimiters = delimiters.map((d) =>
    d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );

  const splitRegex = new RegExp(escapedDelimiters.join("|"), "g");
  const tokens = numbers.split(splitRegex).filter(Boolean);

  const negatives = tokens.filter((n) => parseInt(n) < 0);
  if (negatives.length > 0) {
    throw new Error(`Negatives not allowed: ${negatives.join(", ")}`);
  }

  return tokens.reduce((sum, n) => sum + parseInt(n || 0, 10), 0);
}
