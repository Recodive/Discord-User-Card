import type { HtmlOutputRule, NodeOutput, ParserRule } from "simple-markdown";

export type Rule = ParserRule & HtmlOutputRule & {
	readonly rerenderInterval?: NodeOutput<number | undefined>;
};

export function extendRule<T extends Rule>(additionalRules: Partial<T>, defaultRule: T): T {
	return Object.assign({}, defaultRule, additionalRules);
}
