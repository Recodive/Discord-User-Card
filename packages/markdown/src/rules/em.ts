import { defaultRules } from "simple-markdown";
import { extendRule, type Rule } from "../functions/extendRule.js";

export const em: Rule = extendRule(
  {
    parse: function (capture, parse, state) {
      const parsed = defaultRules.em.parse(
        capture,
        parse,
        Object.assign({}, state, { inEmphasis: true })
      );

      return state.inEmphasis ? parsed.content : parsed;
    },
  },
  defaultRules.em
);
