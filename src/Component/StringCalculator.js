function parseTextAreaInput(input) {
  if (!input || input.trim() === "") {
    return null;
  }

  const trimmedInput = input.trim();

  function processEscapeSequences(str) {
    return str
      .replace(/\\n/g, "\n")
      .replace(/\\t/g, "\t")
      .replace(/\\r/g, "\r")
      .replace(/\\b/g, "\b")
      .replace(/\\f/g, "\f")
      .replace(/\\v/g, "\v")
      .replace(/\\0/g, "\0")
      .replace(/\\\\/g, "\\")
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\x([0-9A-Fa-f]{2})/g, (match, hex) => {
        return String.fromCharCode(parseInt(hex, 16));
      })
      .replace(/\\u([0-9A-Fa-f]{4})/g, (match, hex) => {
        return String.fromCharCode(parseInt(hex, 16));
      });
  }

  if (trimmedInput.startsWith('"') && trimmedInput.endsWith('"')) {
    const unquoted = trimmedInput.slice(1, -1);
    return processEscapeSequences(unquoted);
  } else {
    const num = Number(trimmedInput);

    if (!isNaN(num) && trimmedInput !== "") {
      return num;
    }

    return processEscapeSequences(trimmedInput);
  }
}

function sumNumbers(numberStrings) {
  console.log(numberStrings);
  return numberStrings.reduce((sum, numStr) => {
    const trimmed = numStr.trim();

    const num = parseFloat(trimmed);

    if (!isNaN(num)) {
      return sum + num;
    }

    return sum;
  }, 0);
}

export function add(input) {
  if (!input || typeof input !== "string") {
    return 0;
  }
  input = parseTextAreaInput(input);
  console.log(`input is ${input}`);

  if (input.startsWith("//")) {
    const newlineIndex = input.indexOf("\n");

    if (newlineIndex === -1) {
      return 0;
    }

    const delimiter = input.substring(2, newlineIndex);

    const numbersString = input.substring(newlineIndex + 1);

    return sumNumbers(numbersString.split(delimiter));
  } else {
    const normalizedInput = input.replace(/\+/g, ",");

    return sumNumbers(normalizedInput.split(","));
  }
}

function escapeRegex(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
