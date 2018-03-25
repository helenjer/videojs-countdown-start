# videojs-countdown-start

Adds countdown before webcast or other video will be started in player. Starts video playpack after countdown finish or invokes  provided  callback. Provides some additional settings to config countdown inreface (i.e. video start time, duration, caption and texts). 

## Installation

```sh
npm install --save videojs-countdown-start
```

The npm installation is preferred, but Bower works, too.

```sh
bower install  --save videojs-countdown-start
```

## Usage

To include videojs-countdown-start on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<link href="/dist/videojs-countdown-start.css" rel="stylesheet">
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-countdown-start.min.js"></script>
<script>
  var player = videojs('my-video');

  player.countdownStart({time: 30});
</script>
```

See also **/index.html** example.

### ES6 import for manual player build
In code:
```js
import 'videojs';
import 'videojs-countdown-start';
```
Usage:
```html
<link href="/dist/player_build.min.css" rel="stylesheet">
<script src="//path/to/player_build.min.js"></script>
<script>
  var player = videojs('my-video');
  player.countdownStart({time: 30});
</script>
```

### Browserify

When using with Browserify, install videojs-countdown-start via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-countdown-start');

var player = videojs('my-video');

player.countdownStart({time: 30});
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-countdown-start'], function(videojs) {
  var player = videojs('my-video');

  player.countdownStart({time: 30});
});
```


### Settings
Avaliable setting with their default values:
```js
{
    caption: '', // Title for countdown modal dialog.
	message: '', // Some describing text above countdown.
	startAt: {
		txt: "Start time of webcast", // Label for start time value.
		val: '' //ms, timestamp; start time of the webcast or playback. Used for information purpose. 
	},
	duration: {
		txt: "Duration of webcast", // Label for duration value.
		val: '' // sec or 'auto'; duration of future webcast or VOD. Used for information purpose. If 'Auto' value setted, duration will be getted using videojs player.duration() method.
	},
	countdownTxt: "Time left before webcast start", // Label for countdown value.
	onCountdownFinish: function() {
		this.player_.play();
	}, // Callback, will be called when countdown finish.
	timezone: 0, //hours, offset from UTC. Server timezone, used for startAt client time convertion. 
	time: 0, // sec, countdown times initial value.
	interval: 1 //sec, frequency of countdown timer update.
}
```

All text fields (caption, message, startAt.txt, duration.txt, countdownTxt) will be localized, if translation files included.

## License

MIT. Copyright (c) Pravdina Elena &lt;hel.jer@yandex.ru&gt;


[videojs]: http://videojs.com/
