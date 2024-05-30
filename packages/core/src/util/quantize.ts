/**
 * Modified version of the MMCQ (modified median cut quantization) algorithm
 * from the Leptonica library (http://www.leptonica.com/).
 */

const protovis = {
	naturalOrder(a: number, b: number) {
		return a < b ? -1 : a > b ? 1 : 0;
	},
	max(array: number[]) {
		return Math.max.apply(null, array);
	},
};

const MMCQ = (() => {
	// private constants
	const sigbits = 5;

	const rshift = 8 - sigbits;
	const maxIterations = 1000;
	const fractByPopulations = 0.75;

	// get the color index for a pixel
	function getColorIndex(r: number, g: number, b: number): number {
		return (r << (2 * sigbits)) + (g << sigbits) + b;
	}

	// Simple priority queue
	class PQueue<T> {
		public contents: T[] = [];
		public sorted = false;
		constructor(public comparator: (a: T, b: T) => number) {}

		sort() {
			this.contents.sort(this.comparator);
			this.sorted = true;
		}
		push(o: T) {
			this.contents.push(o);
			this.sorted = false;
		}
		peek(index: number) {
			if (!this.sorted) this.sort();
			if (index === undefined) index = this.contents.length - 1;
			return this.contents[index];
		}
		pop() {
			if (!this.sorted) this.sort();
			return this.contents.pop();
		}
		size() {
			return this.contents.length;
		}
		map<A>(f: (value: T, index: number, array: T[]) => A): A[] {
			return this.contents.map<A>(f);
		}
		debug() {
			if (!this.sorted) this.sort();
			return this.contents;
		}
	}

	// 3d color space box
	class VBox {
		_avg: [number, number, number] | undefined;
		_count_set = false;
		_count: number | undefined;
		_volume: number | undefined;
		constructor(
			public r1: number,
			public r2: number,
			public g1: number,
			public g2: number,
			public b1: number,
			public b2: number,
			public histo: number[]
		) {}

		volume(force?: boolean): number {
			if (!this._volume || force) {
				this._volume =
					(this.r2 - this.r1 + 1) *
					(this.g2 - this.g1 + 1) *
					(this.b2 - this.b1 + 1);
			}
			return this._volume;
		}

		count(force?: boolean): number {
			if (!this._count_set || force) {
				let npix = 0;
				let i;
				let j;
				let k;
				for (i = this.r1; i <= this.r2; i++) {
					for (j = this.g1; j <= this.g2; j++) {
						for (k = this.b1; k <= this.b2; k++) {
							let index = getColorIndex(i, j, k);
							npix += this.histo[index] || 0;
						}
					}
				}
				this._count = npix;
				this._count_set = true;
			}
			return this._count as number;
		}

		copy() {
			return new VBox(
				this.r1,
				this.r2,
				this.g1,
				this.g2,
				this.b1,
				this.b2,
				this.histo
			);
		}

		avg(force?: boolean): [number, number, number] {
			if (!this._avg || force) {
				const mult = 1 << (8 - sigbits);
				let ntot = 0;
				let rsum = 0;
				let gsum = 0;
				let bsum = 0;
				for (let i = this.r1; i <= this.r2; i++) {
					for (let j = this.g1; j <= this.g2; j++) {
						for (let k = this.b1; k <= this.b2; k++) {
							const histoindex = getColorIndex(i, j, k);
							const hval = this.histo[histoindex] || 0;
							ntot += hval;
							rsum += hval * (i + 0.5) * mult;
							gsum += hval * (j + 0.5) * mult;
							bsum += hval * (k + 0.5) * mult;
						}
					}
				}
				if (ntot) {
					this._avg = [~~(rsum / ntot), ~~(gsum / ntot), ~~(bsum / ntot)];
				} else {
					this._avg = [
						~~((mult * (this.r1 + this.r2 + 1)) / 2),
						~~((mult * (this.g1 + this.g2 + 1)) / 2),
						~~((mult * (this.b1 + this.b2 + 1)) / 2),
					];
				}
			}
			return this._avg;
		}

		contains(pixel: [number, number, number]): boolean {
			const rval = pixel[0] >> rshift;
			let gval = pixel[1] >> rshift;
			let bval = pixel[2] >> rshift;
			return (
				rval >= this.r1 &&
				rval <= this.r2 &&
				gval >= this.g1 &&
				gval <= this.g2 &&
				bval >= this.b1 &&
				bval <= this.b2
			);
		}
	}

	// Color map
	class CMap {
		vboxes: PQueue<{ vbox: VBox; color: [number, number, number] }>;
		constructor() {
			this.vboxes = new PQueue((a, b) =>
				protovis.naturalOrder(
					a.vbox.count() * a.vbox.volume(),
					b.vbox.count() * b.vbox.volume()
				)
			);
		}

		push(vbox: VBox) {
			this.vboxes.push({
				vbox,
				color: vbox.avg(),
			});
		}

		palette(): [number, number, number][] {
			return this.vboxes.map((vb) => vb.color);
		}

		size() {
			return this.vboxes.size();
		}

		map(color: [number, number, number]) {
			const vboxes = this.vboxes;
			for (let i = 0; i < vboxes.size(); i++) {
				if (vboxes.peek(i)!.vbox.contains(color)) {
					return vboxes.peek(i)!.color;
				}
			}
			return this.nearest(color);
		}

		nearest(color: [number, number, number]) {
			const vboxes = this.vboxes;
			let d1;
			let d2;
			let pColor;
			for (let i = 0; i < vboxes.size(); i++) {
				d2 = Math.sqrt(
					Math.pow(color[0] - vboxes.peek(i)!.color[0], 2) +
						Math.pow(color[1] - vboxes.peek(i)!.color[1], 2) +
						Math.pow(color[2] - vboxes.peek(i)!.color[2], 2)
				);
				if (d1 === undefined || d2 < d1) {
					d1 = d2;
					pColor = vboxes.peek(i)!.color;
				}
			}
			return pColor;
		}
	}

	// histo (1-d array, giving the number of pixels in
	// each quantized region of color space), or null on error
	function getHisto(pixels: [number, number, number][]): number[] {
		const histo: number[] = new Array(1 << (3 * sigbits));
		pixels.forEach((pixel) => {
			const rval = pixel[0] >> rshift;
			const gval = pixel[1] >> rshift;
			const bval = pixel[2] >> rshift;
			const index = getColorIndex(rval, gval, bval);
			histo[index] = (histo[index] || 0) + 1;
		});
		return histo;
	}

	function vboxFromPixels(
		pixels: [number, number, number][],
		histo: number[]
	): VBox {
		let rmin = 1e6;
		let rmax = 0;
		let gmin = 1e6;
		let gmax = 0;
		let bmin = 1e6;
		let bmax = 0;
		// find min/max
		pixels.forEach((pixel) => {
			const rval = pixel[0] >> rshift;
			const gval = pixel[1] >> rshift;
			const bval = pixel[2] >> rshift;
			if (rval < rmin) rmin = rval;
			else if (rval > rmax) rmax = rval;
			if (gval < gmin) gmin = gval;
			else if (gval > gmax) gmax = gval;
			if (bval < bmin) bmin = bval;
			else if (bval > bmax) bmax = bval;
		});
		return new VBox(rmin, rmax, gmin, gmax, bmin, bmax, histo);
	}
	function medianCutApply(histo: number[], vbox: VBox) {
		if (!vbox.count()) return;

		const rw = vbox.r2 - vbox.r1 + 1;
		const gw = vbox.g2 - vbox.g1 + 1;
		const bw = vbox.b2 - vbox.b1 + 1;
		const maxw = protovis.max([rw, gw, bw]);
		// only one pixel, no split
		if (vbox.count() == 1) {
			return [vbox.copy()];
		}

		/* Find the partial sum arrays along the selected axis. */
		let total = 0;

		const partialsum: number[] = [];
		const lookaheadsum: number[] = [];
		let i;
		let j;
		let k;
		let sum;
		let index;
		if (maxw == rw) {
			for (i = vbox.r1; i <= vbox.r2; i++) {
				sum = 0;
				for (j = vbox.g1; j <= vbox.g2; j++) {
					for (k = vbox.b1; k <= vbox.b2; k++) {
						index = getColorIndex(i, j, k);
						sum += histo[index] || 0;
					}
				}
				total += sum;
				partialsum[i] = total;
			}
		} else if (maxw == gw) {
			for (i = vbox.g1; i <= vbox.g2; i++) {
				sum = 0;
				for (j = vbox.r1; j <= vbox.r2; j++) {
					for (k = vbox.b1; k <= vbox.b2; k++) {
						index = getColorIndex(j, i, k);
						sum += histo[index] || 0;
					}
				}
				total += sum;
				partialsum[i] = total;
			}
		} else {
			/* maxw == bw */
			for (i = vbox.b1; i <= vbox.b2; i++) {
				sum = 0;
				for (j = vbox.r1; j <= vbox.r2; j++) {
					for (k = vbox.g1; k <= vbox.g2; k++) {
						index = getColorIndex(j, k, i);
						sum += histo[index] || 0;
					}
				}
				total += sum;
				partialsum[i] = total;
			}
		}
		partialsum.forEach((d, i) => {
			lookaheadsum[i] = total - d;
		});
		function doCut(color: "r" | "g" | "b") {
			const dim1 = `${color}1` as "r1" | "g1" | "b1";
			const dim2 = `${color}2` as "r2" | "g2" | "b2";
			let left;
			let right;
			let vbox1;
			let vbox2;
			let d2;
			let count2 = 0;
			for (i = vbox[dim1]; i <= vbox[dim2]; i++) {
				if (partialsum[i]! > total / 2) {
					vbox1 = vbox.copy();
					vbox2 = vbox.copy();
					left = i - vbox[dim1];
					right = vbox[dim2] - i;
					if (left <= right) d2 = Math.min(vbox[dim2] - 1, ~~(i + right / 2));
					else d2 = Math.max(vbox[dim1], ~~(i - 1 - left / 2));
					// avoid 0-count boxes
					while (!partialsum[d2]) d2++;
					count2 = lookaheadsum[d2]!;
					while (!count2 && partialsum[d2 - 1]) count2 = lookaheadsum[--d2]!;
					// set dimensions
					vbox1[dim2] = d2;
					vbox2[dim1] = vbox1[dim2] + 1;
					return [vbox1, vbox2];
				}
			}
		}
		// determine the cut planes
		return maxw == rw ? doCut("r") : maxw == gw ? doCut("g") : doCut("b");
	}

	function quantize(pixels: [number, number, number][], maxcolors: number) {
		// short-circuit
		if (!pixels.length || maxcolors < 2 || maxcolors > 256) return false;

		const histo = getHisto(pixels);

		// check that we aren't below maxcolors already
		let nColors = 0;
		histo.forEach(() => {
			nColors++;
		});

		// get the beginning vbox from the colors
		const vbox = vboxFromPixels(pixels, histo);

		const pq = new PQueue<VBox>((a, b) =>
			protovis.naturalOrder(a.count(), b.count())
		);
		pq.push(vbox);

		// inner function to do the iteration
		function iter(lh: PQueue<VBox>, target: number) {
			let ncolors = 1;
			let niters = 0;
			let vbox: VBox;
			while (niters < maxIterations) {
				vbox = lh.pop()!;
				if (!vbox.count()) {
					/* just put it back */
					lh.push(vbox);
					niters++;
					continue;
				}

				// do the cut
				const vboxes = medianCutApply(histo, vbox);

				const vbox1 = vboxes?.[0];
				const vbox2 = vboxes?.[1];

				if (!vbox1) return;
				lh.push(vbox1);
				if (vbox2) {
					/* vbox2 can be null */
					lh.push(vbox2);
					ncolors++;
				}
				if (ncolors >= target) return;
				if (niters++ > maxIterations)					return;
			}
		}

		// first set of colors, sorted by population
		iter(pq, fractByPopulations * maxcolors);

		// Re-sort by the product of pixel occupancy times the size in color space.
		const pq2 = new PQueue<VBox>((a, b) =>
			protovis.naturalOrder(a.count() * a.volume(), b.count() * b.volume())
		);
		while (pq.size()) pq2.push(pq.pop()!);

		// next set - generate the median cuts using the (npix * vol) sorting.
		iter(pq2, maxcolors - pq2.size());

		// calculate the actual colors
		const cmap = new CMap();
		while (pq2.size()) cmap.push(pq2.pop()!);

		return cmap;
	}

	return {
		quantize,
	};
})();
export default MMCQ.quantize;
