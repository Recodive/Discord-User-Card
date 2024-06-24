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
		return [(int >> 16) & 0xFF, (int >> 8) & 0xFF, int & 0xFF];
	}

	static getDarkness(int: number) {
		return (
			1
			- (0.299 * ((int >> 16) & 255)
			+ 0.587 * ((int >> 8) & 255)
			+ 0.114 * (255 & int))
			/ 255
		);
	}
}
