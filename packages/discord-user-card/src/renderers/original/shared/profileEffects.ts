import type { DiscordUserCardProperties } from "@discord-user-card/core";
import type { Effect, ProfileEffectIntermittent, ProfileEffectPersistent } from "@discord-user-card/profile-effects";
import { AnimationType, DiscordProductType, findProfileEffect } from "@discord-user-card/profile-effects";
import type { Renderer } from "../../../functions/Renderer.js";
import { addElement, clearUnexpectedAttributes, removeElement, setClasses, setStyles } from "../../util.js";
import { useAnimationFrame } from "../../../functions/useAnimationFrame.js";

const introDelay = 500;
const placeholderImage = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

export class ProfileEffectsRenderer implements Renderer {
	elements = {
		container: document.createElement("div"),
		inner: document.createElement("div"),
		reducedMotion: document.createElement("img"),
		effects: [] as HTMLImageElement[],
	};

	currentDelay = -introDelay;
	ticker = useAnimationFrame((deltaTime) => {
		// ? Add the delta time to the current delay every frame
		this.currentDelay += deltaTime;
		// ? Update the profile effect
		this.update();
	});

	profileEffectConfig: ProfileEffectPersistent | ProfileEffectIntermittent | null = null;
	effects: Effect[] = [];

	addHoverEffect = () => {
		this.elements.container.classList.add("duc_profile_effect_hover");
	};

	removeHoverEffect = () => {
		this.elements.container.classList.remove("duc_profile_effect_hover");
	};

	focus = () => {
		if (!this.prefersReducedMotion)
			this.ticker.start();
	};

	blur = () => {
		this.ticker.stop();
		this.update();
	};

	prefersReducedMotionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
	get prefersReducedMotion() {
		return this.prefersReducedMotionMediaQuery.matches;
	}

	constructor(public readonly parent: Element, public readonly root: Element) {
		window.addEventListener("focus", this.focus);
		window.addEventListener("blur", this.blur);
		this.root.addEventListener("mouseenter", this.addHoverEffect);
		this.root.addEventListener("mouseleave", this.removeHoverEffect);
		this.prefersReducedMotionMediaQuery.addEventListener("change", this.focus);
	}

	async render({ user: { profileEffect } }: Required<DiscordUserCardProperties>): Promise<void> {
		// ? If the profile effect is not provided, remove the container
		if (!profileEffect) {
			removeElement(this.parent, this.elements.container);
			return this.ticker.stop();
		}

		// ? Find the profile effect, and if it does not exist, remove the container
		const effect = findProfileEffect(profileEffect);
		if (!effect || effect.type !== DiscordProductType.PROFILE_EFFECT || effect.animationType === AnimationType.UNSPECIFIED) {
			removeElement(this.parent, this.elements.container);
			return this.ticker.stop();
		}

		// ? Add the container and inner elements
		addElement(this.parent, this.elements.container);
		addElement(this.elements.container, this.elements.inner);

		// ? If the profile effect has changed, set it up
		this.setup(effect);
		if (document.hasFocus() && !this.prefersReducedMotion)
			this.ticker.start();
		else this.ticker.stop();
		this.update();
	}

	setup(effect: ProfileEffectPersistent | ProfileEffectIntermittent): void {
		// ? Clear unexpected attributes from the elements
		clearUnexpectedAttributes(this.elements.container, ["class"]);
		clearUnexpectedAttributes(this.elements.inner, ["class"]);
		clearUnexpectedAttributes(this.elements.reducedMotion, ["src", "alt", "class"]);
		for (const effectElement of this.elements.effects) {
			clearUnexpectedAttributes(effectElement, ["src", "alt", "class", "style"]);
		}

		// ? Add the correct amount of effect elements
		if (this.elements.effects.length < effect.effects.length) {
			for (let i = this.elements.effects.length; i < effect.effects.length; i++) {
				this.elements.effects.push(document.createElement("img"));
			}
		}
		else if (this.elements.effects.length > effect.effects.length) {
			for (let i = this.elements.effects.length; i > effect.effects.length; i--) {
				const effectElement = this.elements.effects.pop()!;
				removeElement(this.elements.inner, effectElement);
				effectElement.remove();
			}
		}

		// ? Set the attributes of the elements
		setClasses(this.elements.container, {
			duc_profile_effect: true,
			duc_profile_effect_hover: this.root.matches(":hover"),
		});
		setClasses(this.elements.inner, {
			duc_profile_effect_inner: true,
		});
		setClasses(this.elements.reducedMotion, {
			duc_profile_effect_img: true,
		});
		this.elements.reducedMotion.src = effect.reducedMotionSrc;
		this.elements.reducedMotion.alt = effect.description;
		for (const element of this.elements.effects) {
			setClasses(element, {
				duc_profile_effect_img: true,
			});
		}

		// ? Reset to the default state
		this.currentDelay = -introDelay;
		this.effects = effect.effects;
		this.profileEffectConfig = effect;
	}

	async update(): Promise<void> {
		// ? This should not happen, but if it does, return
		if (!this.profileEffectConfig)
			return;

		// ? If the user prefers reduced motion, do not animate the profile effect
		if (this.prefersReducedMotion) {
			addElement(this.parent, this.elements.container);
			addElement(this.elements.container, this.elements.inner);
			addElement(this.elements.inner, this.elements.reducedMotion);
			return this.ticker.stop();
		}

		const { accessibilityLabel } = this.profileEffectConfig;

		// ? Add each effect to the container
		for (const [index, effect] of this.effects.entries()) {
			// ? If the effect element does not exist, skip it
			const element = this.elements.effects[index];
			if (!element)
				continue;

			if (element.alt !== accessibilityLabel)
				element.alt = accessibilityLabel;

			if (!this.ticker.isTicking) {
				// ? If the ticker is not ticking, and the effect is persistent, set the static frame
				if (this.profileEffectConfig.animationType === AnimationType.PERSISTENT && this.profileEffectConfig.staticFrameSrc !== null && index === 0) {
					const { staticFrameSrc } = this.profileEffectConfig;
					if (element.src !== staticFrameSrc)
						element.src = staticFrameSrc;
					setStyles(element, {
						top: effect.position.x ?? 0,
						left: effect.position.y ?? 0,
					});
					addElement(this.elements.inner, element);
					continue;
				}

				// ? Ticker is not ticking, set the placeholder image
				if (element.src !== placeholderImage)
					element.src = placeholderImage;
				setStyles(element, {});
				addElement(this.elements.inner, element);
				continue;
			}

			// * Ticker is ticking, set the effect image

			// ? If this effect hasn't started yet, or it has ended, set the placeholder image
			if (this.currentDelay < effect.start || (!effect.loop && this.currentDelay > effect.duration + effect.start)) {
				if (element.src !== placeholderImage)
					element.src = placeholderImage;
				setStyles(element, {});
				addElement(this.elements.inner, element);
				continue;
			}

			// ? If this effect is a loop and it is in the delay period, set the placeholder image
			if (effect.loop && effect.loopDelay > 0) {
				const loopCycleDuration = effect.duration + effect.loopDelay;
				const loopCount = Math.floor((this.currentDelay - effect.start) / loopCycleDuration);
				if (this.currentDelay - effect.start - loopCount * loopCycleDuration > effect.duration) {
					if (element.src !== placeholderImage)
						element.src = placeholderImage;
					setStyles(element, {});
					addElement(this.elements.inner, element);
					continue;
				}
			}

			// ? Set the effect image
			if (element.src !== effect.src)
				element.src = effect.src;
			setStyles(element, {
				"top": effect.position.x ?? 0,
				"left": effect.position.y ?? 0,
				"z-index": effect.zIndex,
			});
			addElement(this.elements.inner, element);
		}
	}

	destroy(): void {
		removeElement(this.parent, this.elements.container);
		window.removeEventListener("focus", this.focus);
		window.removeEventListener("blur", this.blur);
		this.root.removeEventListener("mouseenter", this.addHoverEffect);
		this.root.removeEventListener("mouseleave", this.removeHoverEffect);
		this.prefersReducedMotionMediaQuery.removeEventListener("change", this.focus);
		this.ticker.stop();
	}
}
