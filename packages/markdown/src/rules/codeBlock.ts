import { defaultRules, inlineRegex } from "simple-markdown";
import { extendRule, type Rule } from "../functions/extendRule.js";

const codeBlockRegex = /^```(([a-z0-9-]+?)\n+)?\n*([^]+?)\n*```/i;

export const codeBlock: Rule = extendRule(
  {
    match: inlineRegex(codeBlockRegex),
    parse: function (capture, _parse, state) {
      return {
        lang: (capture[2] || '').trim(),
        content: capture[3] || '',
        inQuote: state.inQuote || false,
      };
    },
  },
  defaultRules.codeBlock
);
