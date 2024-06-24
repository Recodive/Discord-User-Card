import { describe, it } from "vitest";
import { rerenderInterval, toHTML } from "./index.js";

describe("rerenderInterval", () => {
	it.skip("format: R", ({ expect }) => {
		const secondAgo = Math.round(Date.now() / 1000);
		expect(toHTML(`<t:${secondAgo}:R>`)).toEqual(expect.any(String));
		expect(rerenderInterval(`<t:${secondAgo}:R>`)).toEqual(1000);

		const minuteAgo = secondAgo - 60;
		expect(toHTML(`<t:${minuteAgo}:R>`)).toEqual(expect.any(String));
		expect(rerenderInterval(`<t:${minuteAgo}:R>`)).toEqual(60_000);

		const hourAgo = minuteAgo - 60 * 60;
		expect(toHTML(`<t:${hourAgo}:R>`)).toEqual(expect.any(String));
		expect(rerenderInterval(`<t:${hourAgo}:R>`)).toEqual(60_000);

		const dayAgo = hourAgo - 60 * 60 * 24;
		expect(toHTML(`<t:${dayAgo}:R>`)).toEqual(expect.any(String));
		expect(rerenderInterval(`<t:${dayAgo}:R>`)).toBeUndefined();

		const monthAgo = dayAgo - 60 * 60 * 24 * 30;
		expect(toHTML(`<t:${monthAgo}:R>`)).toEqual(expect.any(String));
		expect(rerenderInterval(`<t:${monthAgo}:R>`)).toBeUndefined();

		const yearAgo = dayAgo - 60 * 60 * 24 * 365;
		expect(toHTML(`<t:${yearAgo}:R>`)).toEqual(expect.any(String));
		expect(rerenderInterval(`<t:${yearAgo}:R>`)).toBeUndefined();
	});
});
