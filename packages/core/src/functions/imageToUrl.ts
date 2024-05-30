import type {
	DiscordImageScope,
	DiscordUserCardImage,
} from "../types/generic.js";

export function imageToUrl({
	image,
	scope,
	animation = true,
	relatedId,
}: {
	/**
	 * The scope of the image
	 */
	scope: DiscordImageScope;
	/**
	 * The image object
	 */
	image: DiscordUserCardImage;
	/**
	 * The related ID to the image
	 */
	relatedId?: string;
	/**
	 * Whether the image should be animated or not
	 * @default true
	 */
	animation?: boolean;
}): string {
	const animatedPrefix = image.animated ? "a_" : "",
		animated = animation && image.animated;

	switch (scope) {
		case "avatar-decoration-presets": {
			return `https://cdn.discordapp.com/${scope}/${animatedPrefix}${
				image.id
			}.png?passthrough=${animated ? "true" : "false"}`;
		}
		case "embed/avatars": {
			return `https://cdn.discordapp.com/${scope}/${image.id}.png`;
		}
		default: {
			if (!relatedId) {
				return `https://cdn.discordapp.com/${scope}/${animatedPrefix}${
					image.id
				}.${animated ? "gif" : "webp"}`;
			}
			return `https://cdn.discordapp.com/${scope}/${relatedId}/${animatedPrefix}${
				image.id
			}.${animated ? "gif" : "webp"}`;
		}
	}
}
