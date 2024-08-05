import { describe, it } from "vitest";
import { parseMarkdown, rerenderInterval, toHTML } from "../index.js";

describe("link", () => {
	const markdown = "[Duck Duck Go](https://duckduckgo.com \"The best search engine for privacy\")";

	it("parseMarkdown", ({ expect }) => {
		expect(parseMarkdown(markdown)).toStrictEqual([
			{
				type: "link",
				content: [
					{
						content: "Duck Duck Go",
						type: "text",
					},
				],
				target: "https://duckduckgo.com",
				title: "The best search engine for privacy",
			},
		]);
	});

	it("toHTML", ({ expect }) => {
		expect(toHTML(markdown)).toBe(`<a href="https://duckduckgo.com" title="The best search engine for privacy" target="_blank" rel="noopener noreferrer"><span><span>Duck Duck Go</span></span></a>`);
	});

	it("rerenderInterval", ({ expect }) => {
		expect(rerenderInterval(markdown)).toBeUndefined();
	});
});
