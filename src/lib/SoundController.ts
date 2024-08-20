export class SoundController {
	protected context: AudioContext | undefined;

	getContext() {
		if (this.context) {
			return this.context;
		}

		if (globalThis.AudioContext) {
			this.context = new AudioContext();
			return this.context;
		}
	}

	move() {
		const context = this.getContext();

		if (!context) {
			return;
		}

		const oscillatorNode = context.createOscillator();
		const gainNode = context.createGain();
		oscillatorNode.connect(gainNode);
		oscillatorNode.type = 'sine';
		oscillatorNode.frequency.value = 146.8;

		gainNode.connect(context.destination);
		oscillatorNode.start(0);

		gainNode.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1);
		oscillatorNode.stop(context.currentTime + 1);
	}
}
