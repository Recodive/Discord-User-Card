import { anyScopeRegex, defaultRules } from "simple-markdown";
import type { Rule } from "../functions/extendRule.js";

export const heading: Rule = {
	order: defaultRules.heading.order,
	match: (capture, state, prevCapture) =>
		prevCapture === null || prevCapture === "" || prevCapture.match(/\n$/) !== null
		// eslint-disable-next-line regexp/no-super-linear-backtracking, regexp/no-useless-non-capturing-group, regexp/no-useless-character-class, regexp/optimal-lookaround-quantifier
			? anyScopeRegex(/^ *(#{1,3})(?:\s+)((?![#]+)[^\n]+?)#*\s*(?:\n|$)/)(capture, state, prevCapture)
			: null,
	parse: defaultRules.heading.parse,
	html: defaultRules.heading.html,
};
