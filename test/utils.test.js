/* eslint-env mocha */
import utils from '../src/utils.js';

describe('utils', function() {

  it('getTimezoneDateTime', () => {
    let d = new Date(),
        tz = d.getTimezoneOffset() / 60,
        new_tz = 4,
        new_d = utils.getTimezoneDateTime(d, new_tz);

    (d.getHours() + tz).should.be.eql(new_d.getHours() - new_tz);
  });

  it('formatDateTime', () => {
    utils.formatDateTime(Date.parse('Wed, 09 Aug 2017 01:20:33 GMT+0300'), 3).should.be.eql('09.08.2017 01:20');
    utils.formatDateTime(Date.parse('Wed, 09 Aug 2007 04:59:00 GMT+0100'), 3).should.be.eql('09.08.2007 06:59');
    utils.formatDateTime(Date.parse('Mon, 04 Dec 2017 00:00:00 GMT+0300'), 3).should.be.eql('04.12.2017 00:00');
    utils.formatDateTime(Date.parse('Mon, 04 Dec 2017 01:20:33 GMT+0400'), 4).should.be.eql('04.12.2017 01:20');
    utils.formatDateTime(Date.parse('Tue, 01 Jan 2030 12:12 GMT+0500'), 5).should.be.eql('01.01.2030 12:12');
  });

  it('formatTime', () => {
    utils.formatTime(0).should.be.eql('00:00:00');
    utils.formatTime(1).should.be.eql('00:00:01');
    utils.formatTime(30).should.be.eql('00:00:30');
    utils.formatTime(60).should.be.eql('00:01:00');
    utils.formatTime(61).should.be.eql('00:01:01');
    utils.formatTime(60000).should.be.eql('16:40:00');
    utils.formatTime(1000500).should.be.eql('277:55:00');
  });
});