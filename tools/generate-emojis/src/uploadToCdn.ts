import process from "node:process";
import ky from "ky";

export async function uploadToCdn(asset: string, url: string) {
	const exists = await ky
		.head(url, {
			throwHttpErrors: false,
		})
		.then(res => res.ok);

	// ? Get the multi-part form data
	const file = await ky.get(asset).then(res => res.blob());
	const formData = new FormData();
	formData.append("file", file);

	if (exists) {
		// ? Update the asset
		await ky.put(url, {
			body: formData,
			headers: {
				Authorization: process.env.TOKEN,
			},
		});
	}
	else {
		// ? Create the asset
		await ky.post(url, {
			body: formData,
			headers: {
				Authorization: process.env.TOKEN,
			},
		});
	}

	return url;
}
