const plugin = require("tailwindcss/plugin");
const hexToHSL = require("./hexToHSL");

/** 
 * Function used to autogenerate shades for colors defined in theme.extend.colors if 
 * theme.extend.colors.autoGenerateShades is either 'true' or a number between 0 and 10.
**/

// Check if the user has defined custom colors.
function hasExtendColors(extendColors) {
    for (const color in extendColors) {
        if (!isBuiltInColor(color, extendColors[color])) {
            return true;
        }
    }
    return false;
}

function isBuiltInColor(colorName, colorValue) {
    if (typeof colorValue === "object") {
        return true;
    }

    const builtInColors = ["inherit", "current", "transparent", "black", "white"];
    for (let i = 0; i < builtInColors.length; i++) {
        if (colorName === builtInColors[i]) {
            return true;
        }
    }
    return false;
}

const HEX = /#\w{3,6}$/;
function autoGenerateShades({ theme, addUtilities }) {
    const extendColors = theme("colors");
    const newShades = {}
    
    if (!hasExtendColors(extendColors)) {
        console.error("[shadesforcustomcolors]: No shades were generated because 'theme.extend.colors' was not found.");
        return;
    }

    // For every custom color the user defined...
    for (const colorName in extendColors) {
        const currentColor = extendColors[colorName];

        // If it's a built-in color skip.
        if (isBuiltInColor(colorName, extendColors[colorName])) {
            continue;
        }

        for (let i = 1; i < 10; i++) {
            if (!HEX.test(currentColor)) {
                console.warn("[shadesforcustomcolors]: Skipping shade creation for " + colorName + ".");
                console.warn("[shadesforcustomcolors]: Note that for this plugin to work you must write your custom colors in hex format.");
                break;
            }
            const colorInHSL = hexToHSL(currentColor);

                newShades[`.text-${colorName}-${(1000 - (i * 100))}`] = {
                    color: `hsl(${colorInHSL.h}, ${colorInHSL.s}%, ${i * 10}%)`
                }

                newShades[`.bg-${colorName}-${(1000 - (i * 100))}`] = {
                    backgroundColor: `hsl(${colorInHSL.h}, ${colorInHSL.s}%, ${i * 10}%)`
                }
            }
        }
        addUtilities({...newShades});
}

module.exports = plugin(autoGenerateShades);