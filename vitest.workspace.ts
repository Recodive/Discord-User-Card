import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
	{
		test: {
			include: ["**/*.browser.test.{ts,js}"],
			name: "browser",
			environment: "happy-dom",
		},
	},
	{
		test: {
			include: ["**/*.node.test.{ts,js}"],
			name: "node",
			environment: "node",
		},
	},
]);
