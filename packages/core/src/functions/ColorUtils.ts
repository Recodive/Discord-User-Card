export class ColorUtils {
	/**
	 * Converts an integer to a hexadecimal color code
	 * @param int The integer representation of the color code
	 * @returns The hexadecimal color code
	 */
	static intToHex(int: number): string {
		return int.toString(16).padStart(6, "0");
	}

	/**
	 * Converts an integer to an RGB color code
	 * @param int The integer representation of the color code
	 * @returns The RGB color code
	 */
	static intToRgb(int: number): [number, number, number] {
		return [(int >> 16) & 0xff, (int >> 8) & 0xff, int & 0xff];
	}

	/**
	 * Converts an integer to an HSL color code
	 * @param int The integer representation of the color code
	 * @returns The HSL color code
	 */
	static intToHsl(int: number): [number, number, number] {
		const [r, g, b] = ColorUtils.intToRgb(int).map((c) => c / 255) as [
			number,
			number,
			number
		];
		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		const l = (max + min) / 2;
		let h = 0;
		let s = 0;

		if (max !== min) {
			const d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

			switch (max) {
				case r:
					h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
					break;
				case g:
					h = ((b - r) / d + 2) / 6;
					break;
				case b:
					h = ((r - g) / d + 4) / 6;
					break;
			}
		}

		return [
			Math.round(h * 360),
			Math.round(s * 1000) / 10,
			Math.round(l * 1000) / 10,
		];
	}

	static getDarkness(int: number) {
		return (
			1 -
			(0.299 * ((int >> 16) & 255) +
				0.587 * ((int >> 8) & 255) +
				0.114 * (255 & int)) /
				255
		);
	}
}
