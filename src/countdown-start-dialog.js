import videojs from 'video.js';
import utils from './utils.js';
const Component = videojs.getComponent('Component');
const ModalDialog = videojs.getComponent('ModalDialog');

const DEFAULTS = {
	caption: '', 
	message: '', 
	startAt: {
		txt: "Start time of webcast",
		val: '' //timestamp 
	},
	duration: {
		txt: "Duration of webcast",
		val: '' // sec or 'auto'
	},
	countdownTxt: "Time left before webcast start",
	onCountdownFinish: function() {
		this.player_.play();
	},
	timezone: 0,
	time: 0, // sec 
	interval: 1 //sec
};

/**
 * The dialog component for showing countdown
 *
 * @param {Object} player   Main Player
 * @param {Object=} options Object of option names and values
 * @extends Component
 */
class CountdownStartDialog extends ModalDialog {
	constructor(player, options) {
		let options_ = videojs.mergeOptions(DEFAULTS, options);
		options_.uncloseable = true;

		super(player, options_);
		
		this.init();
	}

	init() {
		if (this.options_.time > 0) {
			this.timeLoad = new Date();
			this.fillWith(this.createContent());
			this.show();
			this.startCowntdown();
		}
	}

	startCowntdown() {
		let timeLeft = this.options_.time,
			el = this.$('.vjs-countdown-start-timer-val'),
			updTime = () => {
				videojs.insertContent(el, utils.formatTime(timeLeft));
				timeLeft = this.options_.time - (new Date() - this.timeLoad) / 1000;
			};

		this.player_.addClass('vjs-countdown-start-counting');
		updTime();
		let interval = this.player_.setInterval(() => {
			if (timeLeft > 0){
				updTime();
			}else{
				this.player_.clearInterval(interval);
				this.hide();
				this.player_.removeClass('vjs-countdown-start-counting');
				utils.isFunction(this.options_.onCountdownFinish) && this.options_.onCountdownFinish.call(this);
			}

		}, this.options_.interval);
	}

	buildCSSClass() {
		return `vjs-countdown-start-dialog ${super.buildCSSClass()}`;
	}

	createContent() {
		let doc = videojs.createEl('div', {
			className: 'vjs-countdown-start-doc'
		}, {
			role: 'document'
		});
		videojs.appendContent(doc, [
			this.createHeading_(), 
			this.createMessage_(), 
			this.createInfoFields_(),
			this.createCountdown_()]); 
		return doc;
	}

	createHeading_() {
		if (!this.options_.caption) return;

		let heading = videojs.createEl('div', {
			className: 'vjs-countdown-start-caption'
		}, {
			'role': 'heading'
		});
		videojs.insertContent(heading, this.localize(this.options_.caption));
		return heading;
	}

	createMessage_() {
		if (!this.options_.message) return;

		let message = videojs.createEl('div', {
			className: 'vjs-countdown-start-message'
		});
		videojs.insertContent(message, this.localize(this.options_.message));
		return message;
	}

	createInfoFields_() {
		let infoFields = videojs.createEl('div', {
			className: 'vjs-countdown-start-info'
		});

		if (this.options_.startAt.val) {
			videojs.appendContent(infoFields, [
				this.localize(this.options_.startAt.txt) + ': ',
				utils.formatDateTime(this.options_.startAt.val * 1, this.options_.timezone),
				videojs.createEl("br")
			]); 
		}

		let duration = this.options_.duration.val;
		if (duration) {
			let durationVal = videojs.createEl('span', {
					className: 'vjs-countdown-start-duration-val'
				}),
				cb = () => {
					videojs.insertContent(durationVal, ((Math.round(duration / 60)).toString() + ' '));
				};
			videojs.appendContent(infoFields, [
				this.localize(this.options_.duration.txt) + ': ',
				durationVal,
				(this.localize("Min of content") + '.')
			]); 
			if (duration == 'auto') {
				this.player_.on('loadedmetadata', () => {
					duration = this.player_.duration();
					cb();
				});
			} else {
				cb();
			}
		}  

		return infoFields;
	}

	createCountdown_() {
		let countdown = videojs.createEl('div', {
			className: 'vjs-countdown-start-timer'
		});

		let countdownTxt = videojs.createEl('span', {
			className: 'vjs-countdown-start-timer-text'
		});
		videojs.insertContent(countdownTxt, this.localize(this.options_.countdownTxt) + ':');

		let countdownVal = videojs.createEl('span', {
			className: 'vjs-countdown-start-timer-val'
		});

		videojs.appendContent(countdown, [countdownTxt, countdownVal]); 

		return countdown;
	}
}

Component.registerComponent('CountdownStartDialog', CountdownStartDialog);
export default CountdownStartDialog;