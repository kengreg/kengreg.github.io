const TextSizeHandler = (...args) => {
  let sizes = "";
  if (args.length === 4 && args.every((arg) => typeof arg === "number")) {
    const sizeLabels = ["", "-sm", "-md", "-lg"];
    args.forEach((size, index) => {
      sizes += `fs${sizeLabels[index]}-${size}px `;
    });
  } else {
    switch (args[0]) {
      case "normalAll":
        sizes = generateSizesString(14);
        break;
      case "smallAll":
        sizes = generateSizesString(12);
        break;
      case "normalLg":
        sizes = generateSizesString(16, 18);
        break;
      case "smallBigger":
        sizes = generateSizesString(12, 18);
        break;
      case "h1":
        sizes = generateSizesString(18, 20);
        break;
      default:
        sizes = "";
        break;
    }
  }

  return sizes.trim();
};

const generateSizesString = (...args) => {
  const values = args;
  const sizeLabels = ["", "-sm", "-md", "-lg"];
  let sizes = "";
  if (values.length === 1) {
    const value = values[0];
    sizes = sizeLabels.map((label) => `fs${label}-${value}px`).join(" ");
  } else {
    const firstValue = values[0];
    const secondValue = values.length > 1 ? values[1] : firstValue;
    sizes = sizeLabels
      .map((label, index) => {
        const value = index < 2 ? firstValue : secondValue;
        return `fs${label}-${value}px`;
      })
      .join(" ");
  }

  return sizes;
};

export default TextSizeHandler;
