import { describe, it } from "vitest";
import { parseMarkdown, rerenderInterval, toHTML } from "../index.js";

describe("text", () => {
	const markdown = "text";

	it("parseMarkdown", ({ expect }) => {
		expect(parseMarkdown(markdown)).toStrictEqual([
			{
				type: "text",
				content: "text",
			},
		]);
	});

	it("toHTML", ({ expect }) => {
		expect(toHTML(markdown)).toBe(`<span>text</span>`);
	});

	it("rerenderInterval", ({ expect }) => {
		expect(rerenderInterval(markdown)).toBeUndefined();
	});
});
