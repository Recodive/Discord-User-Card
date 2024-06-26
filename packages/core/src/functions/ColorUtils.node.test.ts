import { describe, it } from "vitest";
import { ColorUtils } from "./ColorUtils.js";

// eslint-disable-next-line test/prefer-lowercase-title
describe("ColorUtils", () => {
	it("intToHex", ({ expect }) => {
		expect(ColorUtils.intToHex(0)).toBe("000000");
		expect(ColorUtils.intToHex(1)).toBe("000001");
		expect(ColorUtils.intToHex(255)).toBe("0000ff");
		expect(ColorUtils.intToHex(256)).toBe("000100");
		expect(ColorUtils.intToHex(16777215)).toBe("ffffff");
	});

	it("intToRgb", ({ expect }) => {
		expect(ColorUtils.intToRgb(0)).toEqual([0, 0, 0]);
		expect(ColorUtils.intToRgb(1)).toEqual([0, 0, 1]);
		expect(ColorUtils.intToRgb(255)).toEqual([0, 0, 255]);
		expect(ColorUtils.intToRgb(256)).toEqual([0, 1, 0]);
		expect(ColorUtils.intToRgb(16777215)).toEqual([255, 255, 255]);
	});

	it("getDarkness", ({ expect }) => {
		expect(ColorUtils.getDarkness(0)).toBe(1);
		expect(ColorUtils.getDarkness(1)).toBeCloseTo(0.999);
		expect(ColorUtils.getDarkness(255)).toBeCloseTo(0.886);
		expect(ColorUtils.getDarkness(256)).toBeCloseTo(0.999);
		expect(ColorUtils.getDarkness(16777215)).toBeCloseTo(0);
	});
});
