import { toHTML } from "@discord-user-card/markdown";

export function renderMarkdown(markdown: string, classes: string) {
	const finalClasses = classes ? `duc_markdown ${classes}` : "duc_markdown";

	return `<div class="${finalClasses}">${toHTML(markdown)}</div>`;
}
