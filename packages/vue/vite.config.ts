import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { version } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
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
			external: ["vue", "discord-user-card"],
			output: {
				banner: `/* Discord-User-Card (Vue) v${version} */`,
				exports: "named",
				globals: {
					vue: "Vue",
				},
			},
		},
		sourcemap: true,
	},
});
