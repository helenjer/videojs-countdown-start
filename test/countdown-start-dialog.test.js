/* eslint-env mocha */
/* global should */

import videojs from 'video.js';
import CountdownStartDialog from '../src/countdown-start-dialog.js';
import sinon from 'sinon';


describe('CountdownStartDialog', () => {
  let player, countdown;
  before(() => {
    let fixture = document.getElementById('fixture'),
        video = document.createElement('video'); 
    
    fixture.appendChild(video);
    player = videojs(video);
  });

  describe('CountdownStartDialog constructor', () => {

    it('should create DOM child element', () => {
      countdown = new CountdownStartDialog(player, {});
      countdown.hasClass('vjs-countdown-start-dialog').should.be.ok();
    });

    it('should be shown if time presented', () => {
      countdown = new CountdownStartDialog(player, {time: 10});
      countdown.hasClass('vjs-hidden').should.not.be.ok();
      countdown.el_.innerHTML.should.not.be.empty();
    });

    it('should be hidden if no time rest', () => {
      countdown = new CountdownStartDialog(player, {});
      countdown.hasClass('vjs-hidden').should.be.ok();
      countdown.dispose();
      countdown = new CountdownStartDialog(player, {time: null});
      countdown.hasClass('vjs-hidden').should.be.ok();
      countdown.dispose();
      countdown = new CountdownStartDialog(player, {time: 0});
      countdown.hasClass('vjs-hidden').should.be.ok();
      countdown.dispose();
      countdown = new CountdownStartDialog(player, {time: -10});
      countdown.hasClass('vjs-hidden').should.be.ok();
    });

    it('should create caption due to options or defaults', () => {
      let caption = 'Test caption';
      countdown = new CountdownStartDialog(player, {caption, time: 10});
      countdown.$('.vjs-countdown-start-caption').innerHTML.should.containEql(player.localize(caption));
      countdown.dispose();
      countdown = new CountdownStartDialog(player, {});
      should(countdown.$('.vjs-countdown-start-caption')).not.be.ok();
    });

    it('should create message due to options or defaults', () => {
      let message = 'Test msg';
      countdown = new CountdownStartDialog(player, {message, time: 10});
      countdown.$('.vjs-countdown-start-message').innerHTML.should.containEql(player.localize(message));
      countdown.dispose();
      countdown = new CountdownStartDialog(player, {});
      should(countdown.$('.vjs-countdown-start-message')).not.be.ok();
    });

    it('should create info fields due to options', () => {
      let startAt = {
        txt: 'start text',
        val: '12345'
      };
      let rs = new RegExp(player.localize(startAt.txt));
      countdown = new CountdownStartDialog(player, {startAt, time: 1});
      countdown.$('.vjs-countdown-start-info').innerHTML.should.match(rs);
      countdown.dispose();

      let duration = {
        txt: 'duration text',
        val: '54321'
      };
      let rd = new RegExp(player.localize(duration.txt));
      countdown = new CountdownStartDialog(player, {duration, time: 1});
      countdown.$('.vjs-countdown-start-info').innerHTML.should.match(rd);
    });

    it('should not create info fields without values', () => {
      let startAt = {val: ''};
      countdown = new CountdownStartDialog(player, {startAt, time: 1});
      let rs = new RegExp(player.localize(countdown.options_.startAt.txt));
      countdown.$('.vjs-countdown-start-info').innerHTML.should.not.match(rs);
      countdown.dispose();

      let duration = {val: ''};
      countdown = new CountdownStartDialog(player, {duration, time: 1});
      let rd = new RegExp(player.localize(countdown.options_.duration.txt));
      countdown.$('.vjs-countdown-start-info').innerHTML.should.not.match(rd);
    });

    after(() => {
      countdown && countdown.dispose();
    });
  });

  describe('counting down', function() {
    let opts, clock;
    this.slow(1500);

    before(() => {
      clock = sinon.useFakeTimers();
      opts = {
        time: 10,
        onCountdownFinish: sinon.spy()
      };
      countdown = new CountdownStartDialog(player, opts);  
    });

    it('should add counting start class for player', () => {
      player.hasClass('vjs-countdown-start-counting').should.be.ok();
    });

    it('should update timer', () => {
      let prev = countdown.$('.vjs-countdown-start-timer-val').innerHTML;
      clock.tick(1000);
      let cur = countdown.$('.vjs-countdown-start-timer-val').innerHTML;
      prev.should.not.be.eql(cur);
    });

    it('should call callback on end', () => {
      clock.tick(10500);
      opts.onCountdownFinish.should.be.calledOnce();
    });

    it('should hide itself on end', () => {
      clock.tick(1000);
      countdown.hasClass('vjs-hidden').should.be.ok();
    });

    after(() => {
      countdown && countdown.dispose();
      clock.restore();
    });
  });

  after(() => {
    player.dispose();
  });
});