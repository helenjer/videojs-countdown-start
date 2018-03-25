function isFunction(str){
	return typeof str === 'function';
}

function getTimezoneDateTime(timestamp, timezone) {
	var d = new Date(timestamp);
	if (!timezone) return d;

	var datetime = new Date(d.getTime() + d.getTimezoneOffset() * 60000); // to UTC
		datetime.setHours(datetime.getHours() + timezone); // to Timezone

	return datetime;
}

function formatDateTime(timestamp, timezone) {
	var date = utils.getTimezoneDateTime(timestamp, timezone);

	var dd = date.getDate();
	if (dd < 10) dd = '0' + dd;

	var mm = date.getMonth() + 1;
	if (mm < 10) mm = '0' + mm;

	var h = date.getHours();
	if (h < 10) h = '0' + h;

	var m = date.getMinutes();
	if (m < 10) m = '0' + m;
	return dd + "." + mm + "." + date.getFullYear() + " " + h + ':' + m;
}

function formatTime(sec) {
	var timeHour = Math.floor(sec / 3600);
	var timeMinute = Math.floor(sec % 3600 / 60);
	var timeSecond = Math.floor(sec % 60);

	if (timeHour == 0) timeHour = "00";
	else if (timeHour < 10) timeHour = "0" + timeHour;
	if (timeMinute == 0) timeMinute = "00";
	else if (timeMinute < 10) timeMinute = "0" + timeMinute;
	if (timeSecond == 0) timeSecond = "00";
	else if (timeSecond < 10) timeSecond = "0" + timeSecond;

	return timeHour + ':' + timeMinute + ':' + timeSecond;
}

var utils = {
	isFunction: isFunction,
	formatDateTime: formatDateTime,
	formatTime: formatTime,
	getTimezoneDateTime: getTimezoneDateTime
};

export default utils;