import { describe, it } from "vitest";
import { parseMarkdown, rerenderInterval, toHTML } from "../index.js";

describe("here", () => {
	const markdown = "@here";

	it("parseMarkdown", ({ expect }) => {
		expect(parseMarkdown(markdown)).toStrictEqual([
			{
				type: "here",
			},
		]);
	});

	it("toHTML", ({ expect }) => {
		expect(toHTML(markdown)).toBe(`<span class="duc_role_mention"><span>@here</span></span>`);
	});

	it("rerenderInterval", ({ expect }) => {
		expect(rerenderInterval(markdown)).toBeUndefined();
	});
});
