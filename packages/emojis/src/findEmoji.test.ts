import { describe, it } from "vitest";
import { findEmoji } from "./findEmoji.js";

describe("findEmoji", () => {
	it("should find an emoji by name", ({ expect }) => {
		expect(findEmoji("+1")).toEqual({
			category: "people",
			names: ["thumbsup", "+1", "thumbup", "thumbs_up"],
			surrogates: ["👍"],
			asset: "https://cdn.rcd.gg/discord/emojis/thumbsup.svg",
		});
		expect(findEmoji("thumbsup")).toEqual({
			category: "people",
			names: ["thumbsup", "+1", "thumbup", "thumbs_up"],
			surrogates: ["👍"],
			asset: "https://cdn.rcd.gg/discord/emojis/thumbsup.svg",
		});

		// ? Test for case-insensitivity
		expect(findEmoji("ThumbsUp")).toEqual({
			category: "people",
			names: ["thumbsup", "+1", "thumbup", "thumbs_up"],
			surrogates: ["👍"],
			asset: "https://cdn.rcd.gg/discord/emojis/thumbsup.svg",
		});
	});

	it("should find an emoji by surrogate", ({ expect }) => {
		expect(findEmoji("👍")).toEqual({
			category: "people",
			names: ["thumbsup", "+1", "thumbup", "thumbs_up"],
			surrogates: ["👍"],
			asset: "https://cdn.rcd.gg/discord/emojis/thumbsup.svg",
		});
	});

	it("should return undefined if the emoji is not found", ({ expect }) => {
		expect(findEmoji("doesnotexist")).toBeUndefined();
	});
});
