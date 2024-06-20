const DATE_TYPE_FORMATS = {
	t: { timeStyle: "short" }, // 12:00 AM
	T: { timeStyle: "medium" }, // 12:00:00 AM
	d: { dateStyle: "short" }, // 1/1/2020
	D: { dateStyle: "long" }, // January 1, 2020
	f: { dateStyle: "long", timeStyle: "short" }, // January 1, 2020 12:00 AM
	F: { dateStyle: "full", timeStyle: "short" }, // Wednesday, January 1, 2020 12:00 AM
	R: { style: "long", numeric: "auto" }, // 1 year ago
} as const;

function automaticRelativeDifference(date: Date): {
	duration: number;
	unit: Intl.RelativeTimeFormatUnit;
	rerenderInterval?: number;
} {
	const diff = -((new Date().getTime() - date.getTime()) / 1000) | 0;
	const absDiff = Math.abs(diff);
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
		return { duration: Math.round(diff / 3600), unit: "hours", rerenderInterval: 60_000 };
	}
	if (absDiff > 30) {
		return { duration: Math.round(diff / 60), unit: "minutes", rerenderInterval: 60_000 };
	}
	return { duration: diff, unit: "seconds", rerenderInterval: 1000 };
}

export function formatTimestamp(
	number: number,
	format: keyof typeof DATE_TYPE_FORMATS,
): [
		string, // formatted date
		number | undefined, // rerender interval
	] {
	const date = new Date(number);
	if (format === "R") {
		const formatter = new Intl.RelativeTimeFormat(
			navigator.language || "en",
			DATE_TYPE_FORMATS[format],
		);
		const relative = automaticRelativeDifference(date);
		return [formatter.format(relative.duration, relative.unit), relative.rerenderInterval];
	}
	else {
		const formatter = new Intl.DateTimeFormat(
			navigator.language || "en",
			DATE_TYPE_FORMATS[format],
		);
		return [formatter.format(date), undefined];
	}
}
