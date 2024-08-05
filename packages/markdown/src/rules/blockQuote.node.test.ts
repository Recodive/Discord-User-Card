import { describe, it } from "vitest";
import { parseMarkdown, rerenderInterval, toHTML } from "../index.js";

describe("blockQuote", () => {
	const markdown = ">>> this is a blockquote\nwith multiple lines";
	const markdown2 = "> this is a blockquote\n> and another line\n\nand a new paragraph";

	it("parseMarkdown", ({ expect }) => {
		expect(parseMarkdown(markdown)).toStrictEqual([
			{
				type: "blockQuote",
				content: [
					{
						type: "text",
						content: "this is a blockquote",
					},
					{
						type: "br",
					},
					{
						type: "text",
						content: "with multiple lines",
					},
				],
			},
		]);
		expect(parseMarkdown(markdown2)).toStrictEqual([
			{
				type: "blockQuote",
				content: [
					{
						type: "text",
						content: "this is a blockquote",
					},
					{
						type: "br",
					},
					{
						type: "text",
						content: "and another line",
					},
					{
						type: "br",
					},
				],
			},
			{
				type: "br",
			},
			{
				type: "text",
				content: "and a new paragraph",
			},
		]);
	});

	it("toHTML", ({ expect }) => {
		expect(toHTML(markdown)).toBe(
			`<div class="duc_blockquote_container"><div class="duc_blockquote_divider"></div><blockquote><span>this is a blockquote</span><span>\n</span><span>with multiple lines</span></blockquote></div>`,
		);
		expect(toHTML(markdown2)).toBe(
			`<div class="duc_blockquote_container"><div class="duc_blockquote_divider"></div><blockquote><span>this is a blockquote</span><span>\n</span><span>and another line</span><span>\n</span></blockquote></div><span>\n</span><span>and a new paragraph</span>`,
		);
	});

	it("rerenderInterval", ({ expect }) => {
		expect(rerenderInterval(markdown)).toBeUndefined();
		expect(rerenderInterval(markdown2)).toBeUndefined();
	});
});
