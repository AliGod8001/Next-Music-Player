export const rgbaToHex = (r: number, g: number, b: number, a: number) => {
    const rgba = `rgba(${r}, ${g}, ${b}, ${a})`
    const [red, green, blue, alpha] = rgba.slice(5, -1).split(',').map((val) => parseFloat(val));

    const rHex = Math.round(red).toString(16).padStart(2, '0');
    const gHex = Math.round(green).toString(16).padStart(2, '0');
    const bHex = Math.round(blue).toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`;
}