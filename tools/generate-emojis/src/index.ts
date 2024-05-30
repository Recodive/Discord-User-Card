import { type } from "arktype";
import ky from "ky";
import { types } from "./types.js";
import { UnicodeEmoji } from "./UnicodeEmoji.js";
import { toFile } from "./toFile.js";
import { writeFile } from "fs/promises";

if (!process.env.TOKEN) {
	console.error("Missing TOKEN environment variable");
	process.exit(1);
}

const thisFolder = new URL(".", import.meta.url);

console.log("Starting...");
const html = await ky.get("https://discord.com/channels/@me").text();

console.log("Getting all javascript files...");
const allUrls = Array.from(
	html.matchAll(/<script src="(\/assets\/[a-z0-9.]+\.js)"/g)
).map((match) => match[1]!);

let svgMap1: Record<string, string> = {};
const emojis: UnicodeEmoji[] = [];

console.log("Getting all emojis and svg maps...");
for (const url of allUrls) {
	const js = await ky.get(new URL(url, "https://discord.com")).text();

	if (emojis.length === 0) {
		const emojiIndex = js.indexOf("face_holding_back_tears");
		if (emojiIndex !== -1) emojisFromJSIndex(js, emojiIndex);
	}

	if (Object.keys(svgMap1).length === 0) {
		const mapIndex = js.indexOf("./1f004.svg");
		if (mapIndex !== -1) svgMap1 = svgMap1FromJSIndex(js, mapIndex);
	}
}

if (Object.keys(svgMap1).length === 0) {
	console.error("Failed to find svgMap");
	process.exit(1);
}

const idToFind = Object.values(svgMap1)[0];
const svgMap2: Record<string, string> = {};
for (const url of allUrls) {
	if (!idToFind) break;
	const js = await ky.get(new URL(url, "https://discord.com")).text();
	const idIndex = js.indexOf(`${idToFind}:`);
	if (idIndex !== -1) svgMap2FromJSIndex(js, idIndex);
}

if (Object.keys(svgMap2).length === 0) {
	console.error("Failed to find svgMap2");
	process.exit(1);
}

if (Object.keys(svgMap1).length !== Object.keys(svgMap2).length) {
	console.error("svgMap and svgMap2 have different lengths");
	process.exit(1);
}

//? Take the first svgMap1 and svgMap2 and merge them into one
//? Use the key from svyMap1 as the key and use they value of svgMap1 to match with the key of svgMap2 to get the value
const svgMapFinal: Record<string, string> = {};
for (const [key, value] of Object.entries(svgMap1)) {
	const svgMap2Value = svgMap2[value];
	if (!svgMap2Value) {
		console.error(`Failed to find value for key ${value}`);
		process.exit(1);
	}
	svgMapFinal[key] = svgMap2Value;
}

console.log("Found all emojis and svg maps!");

await toFile(emojis, svgMapFinal);

console.log("Done!");
process.exit(0);

async function emojisFromJSIndex(js: string, index: number) {
	await writeFile(
		new URL("emojis.js", thisFolder).pathname,
		`export const emojis = JSON.parse('${js.slice(
			js.lastIndexOf("'", index) + 1,
			js.indexOf("'", index)
		)}')`
	);
	const out = types.emojiList(
		await import(new URL("emojis.js", thisFolder).href).then((m) => m.emojis)
	);

	if (out instanceof type.errors) {
		console.error(out.summary);
		process.exit(1);
	}

	console.log("Found emojis!");
	for (const [category, emojisOut] of Object.entries(out)) {
		console.log("Category:", category, "Emoji count:", emojisOut.length);
		for (const emoji of emojisOut) {
			const emojiObject = new UnicodeEmoji(emoji, category);
			emojis.push(emojiObject);
		}
	}
}

function svgMap1FromJSIndex(js: string, index: number): Record<string, string> {
	const out = types.svgMap(
		JSON.parse(js.slice(js.lastIndexOf("{", index), js.indexOf("}", index) + 1))
	);

	if (out instanceof type.errors) return {};

	console.log("Found svgMap1!");
	return out;
}

function svgMap2FromJSIndex(js: string, index: number) {
	console.log("Found svgMap2!");
	/**
	 * They look like this:
	 * 949555: function(e, t, n) {
	 *  "use strict";
	 *  e.exports = n.p + "ddac74b80f5e387325cb.svg"
	 * },
	 *
	 * Note that the number can include e (2e3 = 2000)
	 */
	const regex = /([\de]+):[\s\S]*?"([\dabcdef]+\.svg)"/g;
	for (const match of js.slice(index).matchAll(regex)) {
		const mapToCorrectNumber = String(Number(match[1]!));
		svgMap2[mapToCorrectNumber] = match[2]!;
	}
}
