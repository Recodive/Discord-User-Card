import { describe, it } from "vitest";
import { parseMarkdown, rerenderInterval, toHTML } from "../index.js";

describe("emoji", () => {
	const markdown = "<a:heejinthumbsup:625101593389301780><:bruh:556220314476871703>";

	it("parseMarkdown", ({ expect }) => {
		expect(parseMarkdown(markdown)).toStrictEqual([
			{
				animated: true,
				id: "625101593389301780",
				name: "heejinthumbsup",
				type: "emoji",
			},
			{
				animated: false,
				id: "556220314476871703",
				name: "bruh",
				type: "emoji",
			},
		]);
	});

	it("toHTML", ({ expect }) => {
		expect(toHTML(markdown)).toBe(`<span class="duc_emoji_container"><img aria-label="heejinthumbsup" src="https://cdn.discordapp.com/emojis/a_625101593389301780.gif" alt="heejinthumbsup" draggable="false" class="duc_emoji"></img></span><span class="duc_emoji_container"><img aria-label="bruh" src="https://cdn.discordapp.com/emojis/556220314476871703.webp" alt="bruh" draggable="false" class="duc_emoji"></img></span>`);
	});

	it("rerenderInterval", ({ expect }) => {
		expect(rerenderInterval(markdown)).toBeUndefined();
	});
});
