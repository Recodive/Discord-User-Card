import { ColorUtils, DiscordUserCardUser } from "@discord-user-card/core";
import chroma from "chroma-js";

export function getUserTheming(user: DiscordUserCardUser): {
	primaryColor: string;
	secondaryColor: string;
	overlayColor: string;
	buttonColor: string;
	backgroundColor: string;
	dividerColor: string;
	themeMixBaseHsl?: string;
	themeMixBase?: string;
	themeMixText?: string;
	themeMixAmountBase?: string;
	themeMixAmountText?: string;
	themeOverwrite?: string;
} {
	if (!user.themeColors)
		return {
			primaryColor: "var(--background-secondary-alt)",
			secondaryColor: "var(--background-secondary-alt)",
			overlayColor: "rgba(0, 0, 0, 0)",
			buttonColor: "var(--button-secondary-background)",
			backgroundColor: "var(--background-floating)",
			dividerColor: "var(--background-modifier-accent)",
		};

	function getHslString(color: [number, number, number], opacity = 1): string {
		return `hsla(${color[0].toFixed(0)}, ${(color[1] * 100).toFixed(1)}%, ${(
			color[2] * 100
		).toFixed(1)}%, ${opacity})`;
	}
	const theme =
		ColorUtils.getDarkness(user.themeColors.primary) > 0.5 ? "dark" : "light";
	const buttonColor = getContrastingColor(user.themeColors.primary, "#FFFFFF");
	const dividerOpactity = theme === "dark" ? 0.24 : 0.12;
	const diverColor: [number, number, number] =
		theme === "dark" ? [0, 0, 100] : buttonColor;

	return {
		primaryColor: getHslString(
			chroma(ColorUtils.intToHex(user.themeColors.primary)).hsl()
		),
		secondaryColor: getHslString(chroma(user.themeColors.secondary).hsl()),
		overlayColor:
			theme === "dark" ? "hsla(0,0%,0%,0.6)" : "hsla(0,0%,100%,0.6)",
		backgroundColor:
			theme === "dark" ? "hsla(0,0%,0%,0.45)" : "hsla(0,0%,100%,0.45)",
		buttonColor: getHslString(buttonColor),
		dividerColor: getHslString(diverColor, dividerOpactity),
		themeOverwrite: theme,
		...getThemeMix({
			primaryColor: user.themeColors.primary,
			secondaryColor: user.themeColors.secondary,
			isDarkTheme: theme === "dark",
		}),
	};
}
function getContrastingColor(color: string | number, base: string | number) {
	const tolerance = 3;
	const contrastRatio = 7;

	// Convert colors to luminance values
	const baseLuminance = chroma(base).luminance();
	let adjustedColor = chroma(color);
	let currentContrastRatio = chroma.contrast(chroma(base), adjustedColor);

	// Adjust color brightness to meet desired contrast ratio
	for (let i = 0; i < 100; i++) {
		const isBelowMinContrast = currentContrastRatio < contrastRatio;
		const isAboveMaxContrast = currentContrastRatio > contrastRatio + tolerance;

		if (!isBelowMinContrast && !isAboveMaxContrast) {
			break;
		}

		const isBrighterThanBase = adjustedColor.luminance() > baseLuminance;
		if (
			(isAboveMaxContrast && isBrighterThanBase) ||
			(isBelowMinContrast && !isBrighterThanBase)
		) {
			adjustedColor = adjustedColor.darken();
		} else {
			adjustedColor = adjustedColor.brighten();
		}

		currentContrastRatio = chroma.contrast(chroma(base), adjustedColor);
	}

	return adjustedColor.hsl();
}

interface ThemeOptions {
	primaryColor: number;
	secondaryColor: number;
	isDarkTheme: boolean;
}

function getThemeMix(options: ThemeOptions) {
	let { primaryColor, secondaryColor, isDarkTheme } = options;

	let primaryColorObj = chroma(primaryColor);
	let secondaryColorObj = chroma(secondaryColor);

	let [darkerColor, lighterColor] =
		primaryColorObj.luminance() > secondaryColorObj.luminance()
			? [primaryColorObj, secondaryColorObj]
			: [secondaryColorObj, primaryColorObj];

	let textColor = isDarkTheme
		? darkerColor.set("lch.l", 98).set("lch.c", 15)
		: lighterColor.set("lch.l", 10);

	let baseColor = isDarkTheme
		? lighterColor.set("hsl.s", 1).set("hsl.l", 0.05)
		: darkerColor.set("hsl.s", 1).set("hsl.l", 0.94);

	let [hue, saturation, lightness] = baseColor.hsl();

	return {
		themeMixBaseHsl: `${Number.isNaN(hue) ? 0 : hue} ${100 * saturation}% ${
			100 * lightness
		}%`,
		themeMixBase: baseColor.css(),
		themeMixText: textColor.css(),
		themeMixAmountBase: `30%`,
		themeMixAmountText: `70%`,
	};
}
