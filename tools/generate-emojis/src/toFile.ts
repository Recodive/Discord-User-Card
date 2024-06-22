/* eslint-disable no-console */
import { readFile, writeFile } from "node:fs/promises";
import type { UnicodeEmoji } from "./UnicodeEmoji.js";
import type { Category, FinalEmoji } from "./types.js";
import { uploadToCdn } from "./uploadToCdn.js";

const header = `/**
 * This file was generated by tools/generate-emojis.
 * Do not modify this file manually.
 *
 * @version ${new Date().toISOString()}
 */
import type { Emoji } from "../emojis.js";`;
export async function toFile(
	emojis: UnicodeEmoji[],
	svgMap: Record<string, string>,
) {
	const allEmojis = emojis.flatMap((emoji) => {
		return [emoji, ...emoji.diversityChildrenArray];
	});

	console.log(
		`A total of ${
			allEmojis.length
			} emojis were found (including diversity children).`,
	);

	const finalEmojis: FinalEmoji[] = [];
	for (const emoji of allEmojis) {
		const url = emoji.getDiscordURL(svgMap);
		if (!url)
			continue;

		const emojiObject: FinalEmoji = {
			asset: await uploadToCdn(
				url,
				`https://cdn.rcd.gg/discord/emojis/${emoji.emoji.names[0]}.svg`,
			),
			category: emoji.category,
			names: emoji.emoji.names,
			surrogates: [
				emoji.emoji.surrogates,
				...(emoji.processedSurrogates !== emoji.emoji.surrogates
					? [emoji.processedSurrogates]
					: []),
			],
		};

		finalEmojis.push(emojiObject);

		console.log(
			`Processed ${finalEmojis.length}/${allEmojis.length} emojis...`,
		);
	}

	const emojisByCategory = {} as Record<Category, FinalEmoji[]>;
	for (const emoji of finalEmojis) {
		if (!emojisByCategory[emoji.category])
			emojisByCategory[emoji.category] = [];
		emojisByCategory[emoji.category]!.push(emoji);
	}

	for (const [category, emojis] of Object.entries(emojisByCategory)) {
		console.log(`Category: ${category}, Emoji count: ${emojis.length}`);

		const finalFile = `${header}

export const ${category}: Emoji[] = ${JSON.stringify(emojis, null, 2)}`;

		// ? Compare this snippet to the existing file at packages/emojis/src/emojis/[category].ts
		const existingFileLocation = new URL(
			`../../../packages/emojis/src/emojis/${category}.ts`,
			import.meta.url,
		).pathname;
		const existingFile = await readFile(existingFileLocation, "utf-8");

		// ? Compare without the header
		if (existingFile === finalFile) {
			console.log("No changes detected.");
			continue;
		}

		console.log(`Writing ${emojis.length} emojis to ${category}.ts`);
		await writeFile(
			new URL(`../../../packages/emojis/src/emojis/${category}.ts`, import.meta.url).pathname,
			finalFile,
		);
	}
}
