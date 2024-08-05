import { describe, it } from "vitest";
import { parseMarkdown, rerenderInterval, toHTML } from "../index.js";

describe("list", () => {
	const markdown = "- Item 1\n- Item 2\n- Item 3";
	const markdown2 = "1. Item 1\n2. Item 2\n3. Item 3";
	const markdown3 = "* Item 1\n* Item 2\n* Item 3";

	it("parseMarkdown", ({ expect }) => {
		expect(parseMarkdown(markdown)).toStrictEqual([
			{
				items: [
					[
						{
							content: "Item 1",
							type: "text",
						},
					],
					[
						{
							content: "Item 2",
							type: "text",
						},
					],
					[
						{
							content: "Item 3",
							type: "text",
						},
					],
				],
				ordered: false,
				start: null,
				type: "list",
			},
		]);

		expect(parseMarkdown(markdown2)).toStrictEqual([
			{
				items: [
					[
						{
							content: "Item 1",
							type: "text",
						},
					],
					[
						{
							content: "Item 2",
							type: "text",
						},
					],
					[
						{
							content: "Item 3",
							type: "text",
						},
					],
				],
				ordered: true,
				start: 1,
				type: "list",
			},
		]);

		expect(parseMarkdown(markdown3)).toStrictEqual([
			{
				items: [
					[
						{
							content: "Item 1",
							type: "text",
						},
					],
					[
						{
							content: "Item 2",
							type: "text",
						},
					],
					[
						{
							content: "Item 3",
							type: "text",
						},
					],
				],
				ordered: false,
				start: null,
				type: "list",
			},
		]);
	});

	it("toHTML", ({ expect }) => {
		expect(toHTML(markdown)).toBe(`<ul><li><span><span>Item 1</span></span></li><li><span><span>Item 2</span></span></li><li><span><span>Item 3</span></span></li></ul>`);
		expect(toHTML(markdown2)).toBe(`<ol start="1" style="--totalCharacters: 1;"><li><span><span>Item 1</span></span></li><li><span><span>Item 2</span></span></li><li><span><span>Item 3</span></span></li></ol>`);
		expect(toHTML(markdown3)).toBe(`<ul><li><span><span>Item 1</span></span></li><li><span><span>Item 2</span></span></li><li><span><span>Item 3</span></span></li></ul>`);
	});

	it("rerenderInterval", ({ expect }) => {
		expect(rerenderInterval(markdown)).toBeUndefined();
		expect(rerenderInterval(markdown2)).toBeUndefined();
		expect(rerenderInterval(markdown3)).toBeUndefined();
	});
});
