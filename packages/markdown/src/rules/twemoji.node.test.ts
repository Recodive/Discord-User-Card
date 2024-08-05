import { describe, it } from "vitest";
import { parseMarkdown, rerenderInterval, toHTML } from "../index.js";

describe("twemoji", () => {
	const markdown = "☺️";

	it("parseMarkdown", ({ expect }) => {
		expect(parseMarkdown(markdown)).toStrictEqual([
			{
				type: "twemoji",
				name: "☺️",
			},
		]);
	});

	it("toHTML", ({ expect }) => {
		expect(toHTML(markdown)).toBe(`<span class="duc_emoji_container"><img aria-label="☺️" src="https://cdn.rcd.gg/discord/emojis/relaxed.svg" alt="☺️" draggable="false" class="duc_emoji"></img></span>`);
	});

	it("rerenderInterval", ({ expect }) => {
		expect(rerenderInterval(markdown)).toBeUndefined();
	});
});
