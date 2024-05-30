const DATE_TYPE_FORMATS = {
	t: { timeStyle: "short" },
	T: { timeStyle: "medium" },
	d: { dateStyle: "short" },
	D: { dateStyle: "long" },
	f: { dateStyle: "long", timeStyle: "short" },
	F: { dateStyle: "full", timeStyle: "short" },
	R: { style: "long", numeric: "auto" },
} as const;

function automaticRelativeDifference(date: Date): {
	duration: number;
	unit: Intl.RelativeTimeFormatUnit;
} {
	const diff = -((new Date().getTime() - date.getTime()) / 1000) | 0;
	const absDiff = Math.abs(diff);
	console.log(diff);
	if (absDiff > 86400 * 30 * 10) {
		return { duration: Math.round(diff / (86400 * 365)), unit: "years" };
	}
	if (absDiff > 86400 * 25) {
		return { duration: Math.round(diff / (86400 * 30)), unit: "months" };
	}
	if (absDiff > 3600 * 21) {
		return { duration: Math.round(diff / 86400), unit: "days" };
	}
	if (absDiff > 60 * 44) {
		return { duration: Math.round(diff / 3600), unit: "hours" };
	}
	if (absDiff > 30) {
		return { duration: Math.round(diff / 60), unit: "minutes" };
	}
	return { duration: diff, unit: "seconds" };
}

export function formatTimestamp(
	number: number,
	format: keyof typeof DATE_TYPE_FORMATS
): string {
	const date = new Date(number);
	if (format === "R") {
		const formatter = new Intl.RelativeTimeFormat(
			navigator.language || "en",
			DATE_TYPE_FORMATS[format]
		);
		const relative = automaticRelativeDifference(date);
		return formatter.format(relative.duration, relative.unit);
	} else {
		const formatter = new Intl.DateTimeFormat(
			navigator.language || "en",
			DATE_TYPE_FORMATS[format]
		);
		return formatter.format(date);
	}
}
