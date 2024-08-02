import type { DiscordUserCardProperties } from "@discord-user-card/core";

export abstract class Renderer<Props = Required<DiscordUserCardProperties>> {
	abstract readonly parent: Element;
	abstract render(props: Props): Promise<void>;
	abstract renderSkeleton(props: Props): void;
	abstract destroy(): void;
}

export interface RendererType {
	render: (props: DiscordUserCardProperties) => Promise<void>;
	renderSkeleton: (props: DiscordUserCardProperties) => void;
	destroy: () => void;
}
