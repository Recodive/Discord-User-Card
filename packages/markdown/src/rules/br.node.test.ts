import { describe, it } from "vitest";
import { parseMarkdown, rerenderInterval, toHTML } from "../index.js";

describe("br", () => {
	const markdown = "text\nand more text";

	it("parseMarkdown", ({ expect }) => {
		expect(parseMarkdown(markdown)).toStrictEqual([
			{
				type: "text",
				content: "text",
			},
			{
				type: "br",
			},
			{
				type: "text",
				content: "and more text",
			},
		]);
	});

	it("toHTML", ({ expect }) => {
		expect(toHTML(markdown)).toBe(
			"<span>text</span><span>\n</span><span>and more text</span>",
		);
	});

	it("rerenderInterval", ({ expect }) => {
		expect(rerenderInterval(markdown)).toBeUndefined();
	});
});
