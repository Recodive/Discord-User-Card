import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import dts from "vite-plugin-dts";

import { version } from "./package.json";

export default defineConfig({
	build: {
		emptyOutDir: true,
		lib: {
			entry: {
				index: "src/index.ts",
			},
			formats: ["es", "cjs", "umd"],
			name: "Discord-User-Card",
		},
		outDir: "lib",
		rollupOptions: {
			external: ["@discord-user-card/core"],
			output: {
				banner: `/* Discord-User-Card v${version} */`,
				exports: "named",
				globals: {
					"@discord-user-card/core": "DUCCore",
				},
			},
		},
		sourcemap: true,
	},
	plugins: [
		checker({
			typescript: true,
		}),
		dts({
			exclude: ["vite.config.*"],
		}),
	],
});
