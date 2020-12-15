import chroma from "chroma-js";

let levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
function generatePalette(initialPalette) {
  let generate = {
    paletteName: initialPalette.paletteName,

    id: initialPalette.id,

    emoji: initialPalette.emoji,

    colors: {},
  };
  for (let level of levels) {
    generate.colors[level] = [];
  }
  for (let color of initialPalette.colors) {
    let scale = generateScale(color.color, 10).reverse();
    for (let i in scale) {
      generate.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace("rgb", "rgba")
          .replace(")", ",1.0)"),
      });
    }
  }
  return generate;
}
function getcolor(hexColor) {
  const start = "#fff";
  return [chroma(hexColor).darken(1.5).hex(), hexColor, start];
}
function generateScale(hexColor, numberofcolors) {
  return chroma.scale(getcolor(hexColor)).mode("lab").colors(numberofcolors);
}
export { generatePalette };
