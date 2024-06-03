import type { HtmlOutputRule, ParserRule } from "simple-markdown";

export type Rule = ParserRule & HtmlOutputRule;

export function extendRule<T extends Rule>(additionalRules: Partial<T>, defaultRule: T): T {
	return Object.assign({}, defaultRule, additionalRules);
}
