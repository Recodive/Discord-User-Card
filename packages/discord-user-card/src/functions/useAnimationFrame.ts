export function useAnimationFrame(callback: (deltaTime: number) => void): {
	stop: () => void;
	start: () => void;
	readonly isTicking: boolean;
} {
	const frameDelay = 1000 / 24;
	let frameId: number | null = null;
	let lastFrameTime: number | null = null;
	let isTicking = true;

	const stopAnimation = () => {
		isTicking = false;
		if (frameId !== null) {
			cancelAnimationFrame(frameId);
		}
	};

	const onAnimationFrame: FrameRequestCallback = (currentTime) => {
		if (lastFrameTime === null) {
			lastFrameTime = currentTime;
		}
		const timeSinceLastFrame = currentTime - lastFrameTime;
		if (timeSinceLastFrame >= frameDelay) {
			lastFrameTime = currentTime;
			callback(timeSinceLastFrame);
		}
		if (isTicking) {
			frameId = requestAnimationFrame(onAnimationFrame);
		}
	};

	const startAnimation = () => {
		if (isTicking)
			return;
		isTicking = true;
		lastFrameTime = null;
		frameId = requestAnimationFrame(onAnimationFrame);
	};

	// Start the animation when the function is first called
	startAnimation();

	return {
		stop: stopAnimation,
		start: startAnimation,
		get isTicking() {
			return isTicking;
		},
	};
}
