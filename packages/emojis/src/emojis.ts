import { people } from "./emojis/people.js";
import { nature } from "./emojis/nature.js";
import { food } from "./emojis/food.js";
import { activity } from "./emojis/activity.js";
import { travel } from "./emojis/travel.js";
import { objects } from "./emojis/objects.js";
import { symbols } from "./emojis/symbols.js";
import { flags } from "./emojis/flags.js";

/**
 * The category of an emoji.
 */
export type Category = "people" | "nature" | "food" | "activity" | "travel" | "objects" | "symbols" | "flags";

/**
 * A twemoji that Discord supports.
 */
export interface Emoji {
	/**
	 * The category of the emoji.
	 */
	category: Category;
	/**
	 * The names of the emoji.
	 *
	 * The first name is the primary name of the emoji.
	 */
	names: [string, ...string[]];
	/**
	 * The Unicode surrogates of the emoji.
	 */
	surrogates: [string, ...string[]];
	/**
	 * The URL of the asset of the emoji.
	 */
	asset: string;
}

export const emojis: Emoji[] = [
	...people,
	...nature,
	...food,
	...activity,
	...travel,
	...objects,
	...symbols,
	...flags,
];

export const emojisByCategory: Record<Category, Emoji[]> = {
	people,
	nature,
	food,
	activity,
	travel,
	objects,
	symbols,
	flags,
};
