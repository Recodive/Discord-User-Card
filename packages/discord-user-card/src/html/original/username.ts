import { DiscordUserCardUser } from "@discord-user-card/core";

export function renderUsername(user: DiscordUserCardUser) {
	return `
		<div class="duc_username_section">
			<div>
				<div class="duc_user_text">
					<h1 class="duc_display_name">${user.displayName ?? user.username}</h1>
					<div class="duc_user_tag">
						<span class="duc_user_tag_username">${user.username}</span>
						${renderDiscriminator(user)}
						${renderBotTag(user)}
					</div>
				</div>
				${renderPronouns(user)}
			</div>
			<!-- Clan Tag -->
			<div></div>
		</div>
	`;
}

function renderDiscriminator(user: DiscordUserCardUser) {
	if (!user.discriminator || user.discriminator === "0") return "";
	return `<span class="duc_discriminator">#${user.discriminator}</span>`;
}

function renderBotTag(user: DiscordUserCardUser) {
	if (!user.app && !user.system) return "";
	return `
		<span class="duc_bot_tag">
			<svg
				aria-label="${user.system ? "System User" : "Verified App"}"
				class="duc_bot_tag_verified"
				aria-hidden="false"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					fill="currentColor"
					fill-rule="evenodd"
					d="M18.7 7.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4l3.3 3.29 7.3-7.3a1 1 0 0 1 1.4 0Z"
					clip-rule="evenodd"
				></path>
			</svg>
			<span class="duc_bot_text">${user.system ? "SYSTEM" : "APP"}</span>
		</span>
	`;
}

function renderPronouns(user: DiscordUserCardUser) {
	if (!user.pronouns) return "";
	return `<div class="duc_pronouns">${user.pronouns}</div>`;
}
