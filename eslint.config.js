import antfu from "@antfu/eslint-config";

export default antfu({
	stylistic: {
		indent: "tab",
		quotes: "double",
		semi: true,
	},
	vue: true,
	ignores: ["lib", "dist", "**/src/emojis/*"],
});
