import { describe, it } from "vitest";
import { parseMarkdown, rerenderInterval, toHTML } from "../index.js";

describe("codeBlock", () => {
	const markdown = "```ts\nconsole.log(\"Hello World\");\n```";

	it("parseMarkdown", ({ expect }) => {
		expect(parseMarkdown(markdown)).toStrictEqual([
			{
				type: "codeBlock",
				content: "console.log(\"Hello World\");",
				lang: "ts",
				inQuote: false,
			},
		]);
	});

	it("toHTML", ({ expect }) => {
		expect(toHTML(markdown)).toBe(`<pre><code class="hljs duc_scrollbar_ghost_hairline ts"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&quot;Hello World&quot;</span>);</code></pre>`);
	});

	it("rerenderInterval", ({ expect }) => {
		expect(rerenderInterval(markdown)).toBeUndefined();
	});
});
