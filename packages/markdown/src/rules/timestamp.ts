import { defaultRules, htmlTag } from "simple-markdown";
import type { Rule } from "../functions/extendRule.js";

const timestampRegex = /^<t:(\d+)(?::(R|t|T|d|D|f|F))?>/,
	DATE_TYPE_FORMATS = {
		t: { timeStyle: "short" },
		T: { timeStyle: "medium" },
		d: { dateStyle: "short" },
		D: { dateStyle: "long" },
		f: { dateStyle: "long", timeStyle: "short" },
		F: { dateStyle: "full", timeStyle: "short" },
		R: { style: "long", numeric: "auto" },
	} as const,
	// max: [unit, per unit]
	RELATIVE_DATE_CONVERSION = {
		60000: ["second", 1000],
		3600000: ["minute", 60000],
		86400000: ["hour", 3600000],
		604800000: ["day", 86400000],
		2419200000: ["week", 604800000],
		29030400000: ["month", 2419200000],
		290304000000: ["year", 29030400000],
	} as const;

function getRelativeDate(date: Date): string {
	const difference = Date.now() - date.getTime();
	const diffAbsolute = Math.abs(difference);

	const ending = difference < 0 ? "from now" : "ago";

	if (diffAbsolute < 5000) {
		return "Just now";
	}

	for (const [time, [unit, per]] of Object.entries(RELATIVE_DATE_CONVERSION)) {
		if (diffAbsolute < Number(time)) {
			const amount = Math.round(diffAbsolute / per);

			return `${amount} ${unit}${amount === 1 ? "" : "s"} ${ending}`;
		}
	}

	return `${Math.floor(diffAbsolute / 290304000000)} years ${ending}`;
}

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
	html: (node, output, state) => {
		const date = new Date(node.timestamp);

		let time: string;
		if (node.format === "R") {
			const formatted = getRelativeDate(date);
			time = formatted;
		} else {
			time = date.toLocaleString(
				undefined,
				DATE_TYPE_FORMATS[node.format as "t" | "T" | "d" | "D" | "f" | "F"]
			);
		}

		const fullTime = date.toLocaleString(undefined, DATE_TYPE_FORMATS.F);

		return htmlTag("span", time, {
			"aria-label": fullTime,
			class: "duc_timestamp",
		});
	},
};
