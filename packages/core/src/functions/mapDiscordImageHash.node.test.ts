import { describe, it } from "vitest";
import { mapDiscordImageHash } from "./mapDiscordImageHash.js";

describe("mapDiscordImageHash", () => {
	it("should return undefined if the hash is not specified", ({ expect }) => {
		expect(mapDiscordImageHash(undefined)).toBeUndefined();
		expect(mapDiscordImageHash("")).toBeUndefined();
		expect(mapDiscordImageHash(null)).toBeUndefined();
	});

	it("should map a Discord image hash to a user card image", ({ expect }) => {
		expect(mapDiscordImageHash("a_123")).toEqual({
			animated: true,
			id: "123",
		});
		expect(mapDiscordImageHash("123")).toEqual({
			animated: false,
			id: "123",
		});
	});
});
