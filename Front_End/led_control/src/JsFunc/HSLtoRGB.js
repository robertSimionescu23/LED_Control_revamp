function hslToRgb(h, s, l) {
    // Ensure the hue is within the range of 0-360
    h = h % 360;

    // Convert percentage values to decimals
    s /= 100;
    l /= 100;

    // Calculate the chroma
    let c = (1 - Math.abs(2 * l - 1)) * s;

    // Calculate the hue prime (h')
    let x = c * (1 - Math.abs(((h / 60) % 2) - 1));

    // Determine the RGB values before adjustment for lightness
    let m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (h >= 0 && h < 60) {
        r = c;
        g = x;
    } else if (h >= 60 && h < 120) {
        r = x;
        g = c;
    } else if (h >= 120 && h < 180) {
        g = c;
        b = x;
    } else if (h >= 180 && h < 240) {
        g = x;
        b = c;
    } else if (h >= 240 && h < 300) {
        r = x;
        b = c;
    } else if (h >= 300 && h < 360) {
        r = c;
        b = x;
    }

    // Adjust the RGB values by adding the match value
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { r, g, b };
}

export default hslToRgb
