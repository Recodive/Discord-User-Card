import { defaultRules, htmlTag, sanitizeUrl } from "simple-markdown";
import { type Rule, extendRule } from "../functions/extendRule.js";

export const link: Rule = extendRule({
	html: (node, output, state) => {
		return htmlTag("a", htmlTag("span", output(node.content, state)), {
			href: sanitizeUrl(node.target),
			title: node.title,
			target: "_blank",
			rel: "noopener noreferrer",
		});
	},
}, defaultRules.link);
