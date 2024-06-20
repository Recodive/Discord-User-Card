import { defaultRules, htmlTag } from "simple-markdown";
import { formatTimestamp } from "@discord-user-card/core";
import type { Rule } from "../functions/extendRule.js";

const timestampRegex = /^<t:(\d+)(?::([RtTdDfF]))?>/;

export const timestamp: Rule = {
	order: defaultRules.strong.order,
	match: source => timestampRegex.exec(source),
	parse(capture) {
		return {
			// Discord timestamps are in seconds, but we need milliseconds
			timestamp: Number.parseInt(capture[1] || "0") * 1000,
			format: capture[2],
		};
	},
	html: (node) => {
		return htmlTag("span", formatTimestamp(node.timestamp, node.format)[0], {
			"aria-label": formatTimestamp(node.timestamp, "F")[0],
			"class": "duc_timestamp",
		});
	},
	rerenderInterval: (node) => {
		return formatTimestamp(node.timestamp, node.format)[1];
	},
};
