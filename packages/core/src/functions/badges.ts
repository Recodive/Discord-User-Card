import {
	DiscordUserCardBadges,
	DiscordUserCardBotBadges,
} from "../types/badges.js";
import { imageToUrl } from "./imageToUrl.js";

export function badgeToUrl(
	badge: DiscordUserCardBadges | DiscordUserCardBotBadges,
): string {
	const id = badgeToId(badge);
	return imageToUrl({
		scope: "badge-icons",
		image: { id, animated: false },
	});
}

function badgeToId(
	badge: DiscordUserCardBadges | DiscordUserCardBotBadges,
): string {
	switch (badge) {
		case DiscordUserCardBadges.EARLY_SUPPORTER:
			return "7060786766c9c840eb3019e725d2b358";
		case DiscordUserCardBadges.PREMIUM:
			return "2ba85e8026a8614b640c2837bcdfe21b";
		case DiscordUserCardBadges.HYPESQUAD_EVENTS:
			return "bf01d1073931f921909045f3a39fd264";
		case DiscordUserCardBadges.HYPESQUAD_HOUSE_BRAVERY:
			return "8a88d63823d8a71cd5e390baa45efa02";
		case DiscordUserCardBadges.HYPESQUAD_HOUSE_BRILLIANCE:
			return "011940fd013da3f7fb926e4a1cd2e618";
		case DiscordUserCardBadges.HYPESQUAD_HOUSE_BALANCE:
			return "3aa41de486fa12454c3761e8e223442e";
		case DiscordUserCardBadges.GUILD_BOOSTER_LVL1:
			return "51040c70d4f20a921ad6674ff86fc95c";
		case DiscordUserCardBadges.GUILD_BOOSTER_LVL2:
			return "0e4080d1d333bc7ad29ef6528b6f2fb7";
		case DiscordUserCardBadges.GUILD_BOOSTER_LVL3:
			return "72bed924410c304dbe3d00a6e593ff59";
		case DiscordUserCardBadges.GUILD_BOOSTER_LVL4:
			return "df199d2050d3ed4ebf84d64ae83989f8";
		case DiscordUserCardBadges.GUILD_BOOSTER_LVL5:
			return "996b3e870e8a22ce519b3a50e6bdd52f";
		case DiscordUserCardBadges.GUILD_BOOSTER_LVL6:
			return "991c9f39ee33d7537d9f408c3e53141e";
		case DiscordUserCardBadges.GUILD_BOOSTER_LVL7:
			return "cb3ae83c15e970e8f3d410bc62cb8b99";
		case DiscordUserCardBadges.GUILD_BOOSTER_LVL8:
			return "7142225d31238f6387d9f09efaa02759";
		case DiscordUserCardBadges.GUILD_BOOSTER_LVL9:
			return "ec92202290b48d0879b7413d2dde3bab";
		case DiscordUserCardBadges.BUG_HUNTER_LVL1:
			return "2717692c7dca7289b35297368a940dd0";
		case DiscordUserCardBadges.BUG_HUNTER_LVL2:
			return "848f79194d4be5ff5f81505cbd0ce1e6";
		case DiscordUserCardBadges.ACTIVE_DEVELOPER:
			return "6bdc42827a38498929a4920da12695d9";
		case DiscordUserCardBadges.VERIFIED_DEVELOPER:
			return "6df5892e0f35b051f8b61eace34f4967";
		case DiscordUserCardBadges.CERTIFIED_MODERATOR:
			return "fee1624003e2fee35cb398e125dc479b";
		case DiscordUserCardBadges.PARTNER:
			return "3f9748e53446a137a052f3454e2de41e";
		case DiscordUserCardBadges.STAFF:
			return "5e74e9b61934fc1f67c65515d1f7e60d";
		case DiscordUserCardBadges.QUEST:
			return "7d9ae358c8c5e118768335dbe68b4fb8";
		case DiscordUserCardBadges.LEGACY_USERNAME:
			return "6de6d34650760ba5551a79732e98ed60";
		case DiscordUserCardBotBadges.USES_AUTO_MOD:
			return "f2459b691ac7453ed6039bbcfaccbfcd";
		case DiscordUserCardBotBadges.SUPPORTS_SLASH_COMMANDS:
			return "6f9e37f9029ff57aef81db857890005e";
		case DiscordUserCardBotBadges.PREMIUM_APP:
			return "d2010c413a8da2208b7e4f35bd8cd4ac";
	}
}

const badgeOrder: Record<
	DiscordUserCardBadges | DiscordUserCardBotBadges,
	number
> = {
	[DiscordUserCardBadges.STAFF]: 0,
	[DiscordUserCardBadges.PARTNER]: 1,
	[DiscordUserCardBadges.CERTIFIED_MODERATOR]: 2,
	[DiscordUserCardBadges.HYPESQUAD_EVENTS]: 3,
	[DiscordUserCardBadges.HYPESQUAD_HOUSE_BRAVERY]: 4,
	[DiscordUserCardBadges.HYPESQUAD_HOUSE_BRILLIANCE]: 5,
	[DiscordUserCardBadges.HYPESQUAD_HOUSE_BALANCE]: 6,
	[DiscordUserCardBadges.BUG_HUNTER_LVL1]: 7,
	[DiscordUserCardBadges.BUG_HUNTER_LVL2]: 8,
	[DiscordUserCardBadges.ACTIVE_DEVELOPER]: 9,
	[DiscordUserCardBadges.VERIFIED_DEVELOPER]: 10,
	[DiscordUserCardBadges.EARLY_SUPPORTER]: 11,
	[DiscordUserCardBadges.PREMIUM]: 12,
	[DiscordUserCardBadges.GUILD_BOOSTER_LVL1]: 13,
	[DiscordUserCardBadges.GUILD_BOOSTER_LVL2]: 14,
	[DiscordUserCardBadges.GUILD_BOOSTER_LVL3]: 15,
	[DiscordUserCardBadges.GUILD_BOOSTER_LVL4]: 16,
	[DiscordUserCardBadges.GUILD_BOOSTER_LVL5]: 17,
	[DiscordUserCardBadges.GUILD_BOOSTER_LVL6]: 18,
	[DiscordUserCardBadges.GUILD_BOOSTER_LVL7]: 19,
	[DiscordUserCardBadges.GUILD_BOOSTER_LVL8]: 20,
	[DiscordUserCardBadges.GUILD_BOOSTER_LVL9]: 21,
	[DiscordUserCardBadges.LEGACY_USERNAME]: 22,
	[DiscordUserCardBadges.QUEST]: 23,
	[DiscordUserCardBotBadges.SUPPORTS_SLASH_COMMANDS]: 24,
	[DiscordUserCardBotBadges.USES_AUTO_MOD]: 25,
	[DiscordUserCardBotBadges.PREMIUM_APP]: 26,
};

export function orderBadges(
	badges: (DiscordUserCardBadges | DiscordUserCardBotBadges)[],
): (DiscordUserCardBadges | DiscordUserCardBotBadges)[] {
	return badges.sort((a, b) => {
		const aOrder = badgeOrder[a];
		const bOrder = badgeOrder[b];
		return aOrder - bOrder;
	});
}

const badgeFlags: Record<DiscordUserCardBadges, number | undefined> = {
	[DiscordUserCardBadges.STAFF]: 1 << 0, // 1
	[DiscordUserCardBadges.PARTNER]: 1 << 1, // 2
	[DiscordUserCardBadges.HYPESQUAD_EVENTS]: 1 << 2, // 4
	[DiscordUserCardBadges.BUG_HUNTER_LVL1]: 1 << 3, // 8
	[DiscordUserCardBadges.HYPESQUAD_HOUSE_BRAVERY]: 1 << 6, // 64
	[DiscordUserCardBadges.HYPESQUAD_HOUSE_BRILLIANCE]: 1 << 7, // 128
	[DiscordUserCardBadges.HYPESQUAD_HOUSE_BALANCE]: 1 << 8, // 256
	[DiscordUserCardBadges.EARLY_SUPPORTER]: 1 << 9, // 512
	[DiscordUserCardBadges.BUG_HUNTER_LVL2]: 1 << 14, // 16384
	[DiscordUserCardBadges.VERIFIED_DEVELOPER]: 1 << 17, // 131072
	[DiscordUserCardBadges.CERTIFIED_MODERATOR]: 1 << 18, // 262144
	[DiscordUserCardBadges.ACTIVE_DEVELOPER]: 1 << 22, // 4194304
	// ? The following badges to do not have a flag
	[DiscordUserCardBadges.PREMIUM]: undefined,
	[DiscordUserCardBadges.GUILD_BOOSTER_LVL1]: undefined,
	[DiscordUserCardBadges.GUILD_BOOSTER_LVL2]: undefined,
	[DiscordUserCardBadges.GUILD_BOOSTER_LVL3]: undefined,
	[DiscordUserCardBadges.GUILD_BOOSTER_LVL4]: undefined,
	[DiscordUserCardBadges.GUILD_BOOSTER_LVL5]: undefined,
	[DiscordUserCardBadges.GUILD_BOOSTER_LVL6]: undefined,
	[DiscordUserCardBadges.GUILD_BOOSTER_LVL7]: undefined,
	[DiscordUserCardBadges.GUILD_BOOSTER_LVL8]: undefined,
	[DiscordUserCardBadges.GUILD_BOOSTER_LVL9]: undefined,
	[DiscordUserCardBadges.LEGACY_USERNAME]: undefined,
	[DiscordUserCardBadges.QUEST]: undefined,
};
const badgeBotFlags: Record<DiscordUserCardBotBadges, number | undefined> = {
	[DiscordUserCardBotBadges.USES_AUTO_MOD]: 1 << 6, // 64
	[DiscordUserCardBotBadges.SUPPORTS_SLASH_COMMANDS]: 1 << 23, // 8388608
	[DiscordUserCardBotBadges.PREMIUM_APP]: undefined,
};

export function flagsToBadges(
	flags: number,
	bot = false,
): (DiscordUserCardBadges | DiscordUserCardBotBadges)[] {
	const flagsToBadge = bot ? badgeBotFlags : badgeFlags;
	const badges: (DiscordUserCardBadges | DiscordUserCardBotBadges)[] = [];
	for (const [badge, flag] of Object.entries(flagsToBadge)) {
		if (flag && flags & flag)
			badges.push(badge as DiscordUserCardBadges | DiscordUserCardBotBadges);
	}

	return badges;
}
