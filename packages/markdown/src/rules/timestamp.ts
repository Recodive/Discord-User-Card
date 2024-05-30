import { defaultRules, htmlTag } from "simple-markdown";
import type { Rule } from "../functions/extendRule.js";
import { formatTimestamp } from "@discord-user-card/core";

const timestampRegex = /^<t:(\d+)(?::(R|t|T|d|D|f|F))?>/;

export const timestamp: Rule = {
	order: defaultRules.strong.order,
	match: (source) => timestampRegex.exec(source),
	parse: function (capture) {
		return {
			// Discord timestamps are in seconds, but we need milliseconds
			timestamp: parseInt(capture[1] || "0") * 1000,
			format: capture[2],
		};
	},
	html: (node) => {
		return htmlTag("span", formatTimestamp(node.timestamp, node.format), {
			"aria-label": formatTimestamp(node.timestamp, "F"),
			class: "duc_timestamp",
		});
	},
};
