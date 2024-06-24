import { describe, it } from "vitest";
import { userIdToTimestamp } from "./userIdToTimestamp.js";

describe("userIdToTimestamp", () => {
	it("should convert a user ID to a timestamp", ({ expect }) => {
		expect(userIdToTimestamp("241278257335500811")).toBe(1477595619282);
		expect(userIdToTimestamp("1254757880293228598")).toBe(1719227990936);
	});
});
