import { type ProfileEffect, profileEffects } from "./profileEffects.js";

/**
 * Find a profile effect by its ID, SKU ID, or title.
 *
 * @param profileEffect The ID, SKU ID, or title of the profile effect to find.
 * @returns The profile effect, if found; otherwise, `undefined`.
 */
export function findProfileEffect(profileEffect: string): ProfileEffect | undefined {
	return profileEffects.find(
		e =>
			e.id === profileEffect || e.sku_id === profileEffect || e.title.toLowerCase() === profileEffect.toLowerCase(),
	);
}
