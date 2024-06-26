import { describe, it } from "vitest";
import { findProfileEffect } from "./findProfileEffect.js";

describe("findProfileEffect", () => {
	it("should find a profile effect by name", ({ expect }) => {
		expect(findProfileEffect("Sakura Dreams")).toMatchObject({
			id: "1174460912699191336",
			sku_id: "1139323093991575696",
			title: "Sakura Dreams",
		});

		// ? Test for case-insensitivity
		expect(findProfileEffect("saKuRa dreAMs")).toMatchObject({
			id: "1174460912699191336",
			sku_id: "1139323093991575696",
			title: "Sakura Dreams",
		});
	});

	it("should find a profile effect by id", ({ expect }) => {
		expect(findProfileEffect("1174460912699191336")).toMatchObject({
			id: "1174460912699191336",
			sku_id: "1139323093991575696",
			title: "Sakura Dreams",
		});
	});

	it("should find a profile effect by SKU", ({ expect }) => {
		expect(findProfileEffect("1139323093991575696")).toMatchObject({
			id: "1174460912699191336",
			sku_id: "1139323093991575696",
			title: "Sakura Dreams",
		});
	});

	it("should return undefined if the profile effect is not found", ({ expect }) => {
		expect(findProfileEffect("doesnotexist")).toBeUndefined();
	});
});
