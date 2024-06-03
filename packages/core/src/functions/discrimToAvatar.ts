import { imageToUrl } from "./imageToUrl.js";

export function discrimToAvatar(
	userId: string,
	discriminator?: string,
): string {
	const index
		= discriminator === undefined || discriminator === "0"
			? Number(BigInt(userId) >> 22n) % 6
			: Number(discriminator) % 5;
	return imageToUrl({
		scope: "embed/avatars",
		image: {
			id: index.toString(),
			animated: false,
		},
	});
}
