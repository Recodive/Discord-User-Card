import { describe, it } from "vitest";
import { parseMarkdown, rerenderInterval, toHTML } from "../index.js";

describe("spoiler", () => {
	const markdown = "||This text is hidden||";

	it("parseMarkdown", ({ expect }) => {
		expect(parseMarkdown(markdown)).toStrictEqual([
			{
				type: "spoiler",
				content: [
					{
						type: "text",
						content: "This text is hidden",
					},
				],
			},
		]);
	});

	it("toHTML", ({ expect }) => {
		expect(toHTML(markdown)).toBe(`<span class="duc_spoiler_container" aria-expanded="false" role="button" tabindex="0" onclick="this.setAttribute(&#x27;aria-expanded&#x27;, &#x27;true&#x27;); this.querySelector(&#x27;.duc_spoiler_content&#x27;).setAttribute(&#x27;aria-hidden&#x27;, &#x27;false&#x27;);"><span class="duc_spoiler_obscured"><span class="duc_spoiler_content" aria-hidden="true"><span>This text is hidden</span></span></span></span>`);
	});

	it("rerenderInterval", ({ expect }) => {
		expect(rerenderInterval(markdown)).toBeUndefined();
	});
});
