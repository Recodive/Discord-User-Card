import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			all: true,
			enabled: true,
			provider: "istanbul",
			reportOnFailure: true,
			thresholds: {
				100: true,
			},
		},
		isolate: false,
		passWithNoTests: true,
	},
});
