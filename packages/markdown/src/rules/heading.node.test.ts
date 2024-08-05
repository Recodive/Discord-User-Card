import { describe, it } from "vitest";
import { parseMarkdown, rerenderInterval, toHTML } from "../index.js";

describe("heading", () => {
	const markdown = "# Header 1\n## Header 2\n### Header 3";

	it("parseMarkdown", ({ expect }) => {
		expect(parseMarkdown(markdown)).toStrictEqual([
			{
				content: [
					{
						content: "Header 1",
						type: "text",
					},
				],
				level: 1,
				type: "heading",
			},
			{
				content: [
					{
						content: "Header 2",
						type: "text",
					},
				],
				level: 2,
				type: "heading",
			},
			{
				content: [
					{
						content: "Header 3",
						type: "text",
					},
				],
				level: 3,
				type: "heading",
			},
		]);
	});

	it("toHTML", ({ expect }) => {
		expect(toHTML(markdown)).toBe(`<h1><span>Header 1</span></h1><h2><span>Header 2</span></h2><h3><span>Header 3</span></h3>`);
	});

	it("rerenderInterval", ({ expect }) => {
		expect(rerenderInterval(markdown)).toBeUndefined();
	});
});
