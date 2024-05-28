import { defaultRules } from "simple-markdown";
import { extendRule, type Rule } from "../functions/extendRule.js";

const HeadingRegex = /^(#{1,3}) +([^\n]+?)(\n|$)/;

export const heading: Rule = extendRule(
  {
    match: function (source, state) {
      if (state.prevCapture === null || state.prevCapture[0] === '\n') {
        return HeadingRegex.exec(source);
      }
      return null;
    },
  },
  defaultRules.heading
);
