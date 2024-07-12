<h1 align="center">
	@Discord-User-Card/Emojis
</h1>
<div align="center">
	<a href="https://www.npmjs.com/package/@discord-user-card/emojis">
		<img src="https://img.shields.io/npm/v/@discord-user-card/emojis.svg?logo=npm" alt="NPM Version"/>
	</a>
	<a href="https://github.com/Recodive/Discord-User-Card/actions/workflows/ci.yaml">
		<img src="https://github.com/Recodive/Discord-User-Card/actions/workflows/ci.yaml/badge.svg" alt="CI Status"/>
	</a>
</div>
<p align="center">
	All the emojis supported by Discord (User Card)
<p>

## Usage

```TypeScript
import { type Category, type Emoji, emojis, emojisByCategory, findEmoji } from "@discord-user-card/emojis";

// Get all emojis
console.log(emojis); // Emoji[]

// Get emojis by category
console.log(emojisByCategory); // { [category: Category]: Emoji[] }

// Find an emoji by name
console.log(findEmoji("+1")); // Emoji | undefined
console.log(findEmoji("thumbsup")); // Emoji | undefined

// Find an emoji by the surrogate
console.log(findEmoji("👍")); // Emoji | undefined
```

## Contributing

The list of emojis is automatically generated from the Discord Source Code (see [here](https://github.com/Recodive/Discord-User-Card/tree/main/tools/generate-emojis)).
Please do not manually edit the list of emojis.
If an emoji is missing or incorrect, please open an issue or a pull request.
