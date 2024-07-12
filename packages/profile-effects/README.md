<h1 align="center">
	@Discord-User-Card/Profile-Effects
</h1>
<div align="center">
	<a href="https://www.npmjs.com/package/@discord-user-card/profile-effects">
		<img src="https://img.shields.io/npm/v/@discord-user-card/profile-effects.svg?logo=npm" alt="NPM Version"/>
	</a>
	<a href="https://github.com/Recodive/Discord-User-Card/actions/workflows/ci.yaml">
		<img src="https://github.com/Recodive/Discord-User-Card/actions/workflows/ci.yaml/badge.svg" alt="CI Status"/>
	</a>
</div>
<p align="center">
	All the profile effects supported by Discord (User Card)
<p>

## Usage

```TypeScript
import { type ProfileEffect, findProfileEffect, profileEffects } from "@discord-user-card/profile-effects";

// Get all profile effects
console.log(profileEffects); // ProfileEffect[]

// Find an emoji by name
console.log(findProfileEffect("Sakura Dreams")); // ProfileEffect | undefined

// Find an emoji by id
console.log(findProfileEffect("1174460912699191336")); // ProfileEffect | undefined

// Find an emoji by SKU
console.log(findProfileEffect("1139323093991575696")); // ProfileEffect | undefined
```

## Contributing

Discord does not provide a public API for profile effects.
The list of profile effects is manually maintained.
If a profile effect is missing or incorrect, please open an issue or a pull request.
You can find the list in your network tab when viewing an user's (that has effects) profile on Discord.
