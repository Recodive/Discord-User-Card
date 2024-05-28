import { anyScopeRegex, defaultRules } from 'simple-markdown';
import { extendRule, type Rule } from '../functions/extendRule.js';

export const br: Rule = extendRule(
  {
		match: anyScopeRegex(/^\n/),
		html: () => "<span>\n</span>",
  },
	defaultRules.br
);
