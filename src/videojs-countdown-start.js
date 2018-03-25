import videojs from 'video.js';
import './countdown-start-dialog.js';

// Default options for the plugin.
const defaults = {};

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 * @param    {Object} [options={}]
 */
const onPlayerReady = (player, options) => {
	player.addClass('vjs-countdown-start');
	player.addChild('countdownStartDialog', options);
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance.
 *
 * @function feedback
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const countdownStart = function(options) {
  this.ready(() => {
	onPlayerReady(this, videojs.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
videojs.plugin('countdownStart', countdownStart);

// Include the version number.
countdownStart.VERSION = '__VERSION__';

export default countdownStart;
