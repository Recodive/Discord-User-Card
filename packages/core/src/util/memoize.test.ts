import { describe, it, vitest } from "vitest";
import { memoize } from "./memoize.js";

describe("memoize", () => {
	it("should memoize a function", ({ expect }) => {
		const fn = vitest.fn((a: number, b: number) => a + b);
		const memoized = memoize(fn);

		expect(memoized(1, 2)).toBe(3);
		expect(memoized(1, 2)).toBe(3);
		expect(fn).toHaveBeenCalledTimes(1);

		expect(memoized(2, 3)).toBe(5);
		expect(memoized(2, 3)).toBe(5);
		expect(fn).toHaveBeenCalledTimes(2);
	});
});
