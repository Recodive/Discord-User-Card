import { describe, it } from "vitest";
import { parseMarkdown, rerenderInterval, toHTML } from "../index.js";

describe("role", () => {
	const markdown = "<@606222296016879722>";

	it("parseMarkdown", ({ expect }) => {
		expect(parseMarkdown(markdown)).toStrictEqual([
			{
				id: "606222296016879722",
				type: "user",
			},
		]);
	});

	it("toHTML", ({ expect }) => {
		expect(toHTML(markdown)).toBe(`<span class="duc_user_mention"><span>@606222296016879722</span></span>`);
	});

	it("rerenderInterval", ({ expect }) => {
		expect(rerenderInterval(markdown)).toBeUndefined();
	});
});
