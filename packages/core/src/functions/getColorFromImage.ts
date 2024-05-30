/**
 * Modified version of color-thief by @lokesh
 */

import { memoize } from "../util/memoize.js";
import quantize from "../util/quantize.js";

export const getColorFromImage = memoize(
	async (url: string): Promise<[number, number, number][]> =>
		new Promise((resolve, reject) => {
			let image: HTMLImageElement = new Image();
			image.crossOrigin = "Anonymous";

			function clearHandlers(image: HTMLImageElement) {
				image.onerror = null;
				image.onload = null;
			}

			image.onerror = (error) => {
				reject(error);
				clearHandlers(image);
				image = null as unknown as HTMLImageElement;
			};

			image.onload = () => {
				resolve(getPalette(image));
				clearHandlers(image);
				image = null as unknown as HTMLImageElement;
			};

			image.src = url;
		})
);

const defaultPalette: [number, number, number][] = [[0, 0, 0]];
function getPalette(
	image: HTMLImageElement,
	colorCount: number = 5,
	quality: number = 10
) {
	// Create a canvas element
	const canvas = document.createElement("canvas"),
		context = canvas.getContext("2d");

	// No context? Return the default palette
	if (context === null) return defaultPalette;

	// Set the canvas size to the image size
	const width = (canvas.width = image.width === 0 ? 128 : image.width);
	const height = (canvas.height = image.height === 0 ? 128 : image.height);

	// Draw the image on the canvas
	context.drawImage(image, 0, 0, width, height);

	// Get the image data
	const imageData = context.getImageData(0, 0, width, height).data;

	// Store the RGB values in an array format suitable for quantize function.
	const colorArray: [number, number, number][] = [];
	const pixelCount = width * height;
	for (let i = 0; i < pixelCount; i += quality) {
		const red = imageData[i * 4 + 0]!;
		const green = imageData[i * 4 + 1]!;
		const blue = imageData[i * 4 + 2]!;
		const alpha = imageData[i * 4 + 3]!;

		if (alpha === undefined || alpha >= 125) {
			if (!(red > 250 && green > 250 && blue > 250)) {
				colorArray.push([red, green, blue]);
			}
		}
	}

	// Send the color array to quantize function which clusters values
	const cmap = quantize(colorArray, colorCount);
	return typeof cmap === "boolean" ? defaultPalette : cmap.palette();
}
