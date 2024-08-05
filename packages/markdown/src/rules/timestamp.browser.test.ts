import { describe, it } from "vitest";
import { parseMarkdown, rerenderInterval, toHTML } from "../index.js";

describe("timestamp", () => {
	const secondAgo = Math.round(Date.now() / 1000);
	const minuteAgo = secondAgo - 60;
	const hourAgo = minuteAgo - 60 * 60;
	const dayAgo = hourAgo - 60 * 60 * 24;
	const monthAgo = dayAgo - 60 * 60 * 24 * 30;
	const yearAgo = dayAgo - 60 * 60 * 24 * 365;
	const yearFuture = dayAgo + 60 * 60 * 24 * 365;
	const monthFuture = dayAgo + 60 * 60 * 24 * 30;
	const dayFuture = hourAgo + 60 * 60 * 24;
	const hourFuture = minuteAgo + 60 * 60;
	const minuteFuture = secondAgo + 60;

	describe("parseMarkdown", () => {
		it("format: F", ({ expect }) => {
			expect(parseMarkdown(`<t:${secondAgo}:F>`)).toStrictEqual([
				{
					type: "timestamp",
					format: "F",
					timestamp: secondAgo * 1000,
				},
			]);
		});

		it("format: f", ({ expect }) => {
			expect(parseMarkdown(`<t:${secondAgo}:f>`)).toStrictEqual([
				{
					type: "timestamp",
					format: "f",
					timestamp: secondAgo * 1000,
				},
			]);
		});

		it("format: D", ({ expect }) => {
			expect(parseMarkdown(`<t:${secondAgo}:D>`)).toStrictEqual([
				{
					type: "timestamp",
					format: "D",
					timestamp: secondAgo * 1000,
				},
			]);
		});

		it("format: d", ({ expect }) => {
			expect(parseMarkdown(`<t:${secondAgo}:d>`)).toStrictEqual([
				{
					type: "timestamp",
					format: "d",
					timestamp: secondAgo * 1000,
				},
			]);
		});

		it("format: T", ({ expect }) => {
			expect(parseMarkdown(`<t:${secondAgo}:T>`)).toStrictEqual([
				{
					type: "timestamp",
					format: "T",
					timestamp: secondAgo * 1000,
				},
			]);
		});

		it("format: t", ({ expect }) => {
			expect(parseMarkdown(`<t:${secondAgo}:t>`)).toStrictEqual([
				{
					type: "timestamp",
					format: "t",
					timestamp: secondAgo * 1000,
				},
			]);
		});

		it("format: R", ({ expect }) => {
			expect(parseMarkdown(`<t:${secondAgo}:R>`)).toStrictEqual([
				{
					type: "timestamp",
					format: "R",
					timestamp: secondAgo * 1000,
				},
			]);
		});
	});

	describe("toHTML", () => {
		function timeData(timestamp: number) {
			const date = new Date(timestamp * 1000);
			const data = {
				year: date.getFullYear(),
				month: date.getMonth(),
				day: date.getDate(),
				hour: date.getHours(),
				hourAmPm: date.getHours() % 12 || 12,
				minute: date.getMinutes(),
				second: date.getSeconds(),
				amPm: date.getHours() < 12 ? "AM" : "PM",
				dayText: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()],
				monthText: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July",
					"August",
					"September",
					"October",
					"November",
					"December",
				][date.getMonth()],
			};

			return {
				...data,
				label: `${data.dayText}, ${data.monthText} ${data.day}, ${data.year} at ${data.hourAmPm}:${String(data.minute).padStart(2, "0")} ${data.amPm}`,
			};
		}
		it("format: F", ({ expect }) => {
			const { label } = timeData(secondAgo);
			expect(toHTML(`<t:${secondAgo}:F>`)).toBe(`<span aria-label="${label}" class="duc_timestamp">${label}</span>`);
		});

		it("format: f", ({ expect }) => {
			const { label, day, monthText, year, hourAmPm, minute, amPm } = timeData(secondAgo);
			const text = `${monthText} ${day}, ${year} at ${hourAmPm}:${String(minute).padStart(2, "0")} ${amPm}`;
			expect(toHTML(`<t:${secondAgo}:f>`)).toBe(`<span aria-label="${label}" class="duc_timestamp">${text}</span>`);
		});

		it("format: D", ({ expect }) => {
			const { label, day, monthText, year } = timeData(secondAgo);
			const text = `${monthText} ${day}, ${year}`;
			expect(toHTML(`<t:${secondAgo}:D>`)).toBe(`<span aria-label="${label}" class="duc_timestamp">${text}</span>`);
		});

		it("format: d", ({ expect }) => {
			const { label, day, month, year } = timeData(secondAgo);
			const text = `${month + 1}/${day}/${year.toString().slice(2)}`;
			expect(toHTML(`<t:${secondAgo}:d>`)).toBe(`<span aria-label="${label}" class="duc_timestamp">${text}</span>`);
		});

		it("format: T", ({ expect }) => {
			const { label, hourAmPm, minute, second, amPm } = timeData(secondAgo);
			const text = `${hourAmPm}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")} ${amPm}`;
			expect(toHTML(`<t:${secondAgo}:T>`)).toBe(`<span aria-label="${label}" class="duc_timestamp">${text}</span>`);
		});

		it("format: t", ({ expect }) => {
			const { label, hourAmPm, minute, amPm } = timeData(secondAgo);
			const text = `${hourAmPm}:${String(minute).padStart(2, "0")} ${amPm}`;
			expect(toHTML(`<t:${secondAgo}:t>`)).toBe(`<span aria-label="${label}" class="duc_timestamp">${text}</span>`);
		});

		it("format: R", ({ expect }) => {
			let { label } = timeData(secondAgo);
			expect(toHTML(`<t:${secondAgo}:R>`)).toBe(`<span aria-label="${label}" class="duc_timestamp">now</span>`);
			({ label } = timeData(minuteAgo));
			expect(toHTML(`<t:${minuteAgo}:R>`)).toBe(`<span aria-label="${label}" class="duc_timestamp">1 minute ago</span>`);
			({ label } = timeData(minuteFuture));
			expect(toHTML(`<t:${minuteFuture}:R>`)).toBe(`<span aria-label="${label}" class="duc_timestamp">in 1 minute</span>`);
			({ label } = timeData(hourAgo));
			expect(toHTML(`<t:${hourAgo}:R>`)).toBe(`<span aria-label="${label}" class="duc_timestamp">1 hour ago</span>`);
			({ label } = timeData(hourFuture));
			expect(toHTML(`<t:${hourFuture}:R>`)).toBe(`<span aria-label="${label}" class="duc_timestamp">in 1 hour</span>`);
			({ label } = timeData(dayAgo));
			expect(toHTML(`<t:${dayAgo}:R>`)).toBe(`<span aria-label="${label}" class="duc_timestamp">yesterday</span>`);
			({ label } = timeData(dayFuture));
			expect(toHTML(`<t:${dayFuture}:R>`)).toBe(`<span aria-label="${label}" class="duc_timestamp">tomorrow</span>`);
			({ label } = timeData(monthAgo));
			expect(toHTML(`<t:${monthAgo}:R>`)).toBe(`<span aria-label="${label}" class="duc_timestamp">last month</span>`);
			({ label } = timeData(monthFuture));
			expect(toHTML(`<t:${monthFuture}:R>`)).toBe(`<span aria-label="${label}" class="duc_timestamp">next month</span>`);
			({ label } = timeData(yearAgo));
			expect(toHTML(`<t:${yearAgo}:R>`)).toBe(`<span aria-label="${label}" class="duc_timestamp">last year</span>`);
			({ label } = timeData(yearFuture));
			expect(toHTML(`<t:${yearFuture}:R>`)).toBe(`<span aria-label="${label}" class="duc_timestamp">next year</span>`);
		});
	});

	describe("rerenderInterval", () => {
		it("format: F", ({ expect }) => {
			expect(rerenderInterval(`<t:${secondAgo}:F>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${minuteAgo}:F>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${hourAgo}:F>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${dayAgo}:F>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${monthAgo}:F>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${yearAgo}:F>`)).toBeUndefined();
		});

		it("format: f", ({ expect }) => {
			expect(rerenderInterval(`<t:${secondAgo}:f>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${minuteAgo}:f>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${hourAgo}:f>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${dayAgo}:f>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${monthAgo}:f>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${yearAgo}:f>`)).toBeUndefined();
		});

		it("format: D", ({ expect }) => {
			expect(rerenderInterval(`<t:${secondAgo}:D>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${minuteAgo}:D>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${hourAgo}:D>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${dayAgo}:D>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${monthAgo}:D>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${yearAgo}:D>`)).toBeUndefined();
		});

		it("format: d", ({ expect }) => {
			expect(rerenderInterval(`<t:${secondAgo}:d>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${minuteAgo}:d>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${hourAgo}:d>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${dayAgo}:d>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${monthAgo}:d>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${yearAgo}:d>`)).toBeUndefined();
		});

		it("format: T", ({ expect }) => {
			expect(rerenderInterval(`<t:${secondAgo}:T>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${minuteAgo}:T>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${hourAgo}:T>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${dayAgo}:T>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${monthAgo}:T>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${yearAgo}:T>`)).toBeUndefined();
		});

		it("format: t", ({ expect }) => {
			expect(rerenderInterval(`<t:${secondAgo}:t>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${minuteAgo}:t>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${hourAgo}:t>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${dayAgo}:t>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${monthAgo}:t>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${yearAgo}:t>`)).toBeUndefined();
		});

		it("format: R", ({ expect }) => {
			expect(rerenderInterval(`<t:${secondAgo}:R>`)).toEqual(1000);
			expect(rerenderInterval(`<t:${minuteAgo}:R>`)).toEqual(60_000);
			expect(rerenderInterval(`<t:${hourAgo}:R>`)).toEqual(60_000);
			expect(rerenderInterval(`<t:${dayAgo}:R>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${monthAgo}:R>`)).toBeUndefined();
			expect(rerenderInterval(`<t:${yearAgo}:R>`)).toBeUndefined();
		});
	});
});
