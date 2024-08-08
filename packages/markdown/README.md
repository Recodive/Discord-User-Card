<h1 align="center">
	@Discord-User-Card/Markdown
</h1>
<div align="center">
	<a href="https://www.npmjs.com/package/@discord-user-card/markdown">
		<img src="https://img.shields.io/npm/v/@discord-user-card/markdown.svg?logo=npm" alt="NPM Version"/>
	</a>
	<a href="https://github.com/Recodive/Discord-User-Card/actions/workflows/ci.yaml">
		<img src="https://github.com/Recodive/Discord-User-Card/actions/workflows/ci.yaml/badge.svg" alt="CI Status"/>
	</a>
</div>
<p align="center">
	A markdown parser for Discord
<p>

## Usage

```TypeScript
import { type SingleASTNode, parseMarkdown, toHTML, rerenderInterval } from "@discord-user-card/markdown";

const markdown = `# Hello, World!\n\nThis is a **test**.||This is a spoiler.||`;

// Parse markdown and get the AST nodes
console.log(parseMarkdown(markdown)); // SingleASTNode[]

// Parse markdown and get the HTML
console.log(toHTML(markdown)); // string (Raw HTML)

// Parse markdown and get the rerender interval (some markdown elements need to be rerendered periodically to work properly)
console.log(rerenderInterval(markdown)); // number | undefined (Interval in milliseconds, undefined if no interval)
```

You can also import the styles from the package:

```TypeScript
// css
import "@discord-user-card/markdown/style.css";
// scss
import "@discord-user-card/markdown/style.scss";
```
