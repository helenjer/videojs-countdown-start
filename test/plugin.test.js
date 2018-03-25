/* eslint-env node, mocha */
/* eslint no-invalid-this: 0 */

import document from 'global/document';
import sinon from 'sinon';
import videojs from 'video.js';

import plugin from '../src/videojs-countdown-start';

const Player = videojs.getComponent('Player');

describe('the environment is sane', function() {
  it('es5 exists', () => Array.isArray.should.be.Function());
  it('sinon exists', () => sinon.should.be.Object());
  it('videojs exists', () => videojs.should.be.Function());
  it('plugin is a function', () => plugin.should.be.Function());
});

describe('countdown-start', function() {
  before(function() {
    // Mock the environment's timers because certain things - particularly
    // player readiness - are asynchronous in video.js 5. This MUST come
    // before any player is created; otherwise, timers could get created
    // with the actual timer methods!
    this.clock = sinon.useFakeTimers();
    this.fixture = document.getElementById('fixture');
    this.video = document.createElement('video');
    this.fixture.appendChild(this.video);
    this.player = videojs(this.video);
  });
  
  it('videojs-countdown-start plugin was registered', function() {
    Player.prototype.countdownStart.should.be.eql(plugin);
  });

  it('the plugin adds a class to the player', function() {
    this.player.countdownStart();
    // Tick the clock forward enough to trigger the player to be "ready".
    this.clock.tick(1);
    this.player.hasClass('vjs-countdown-start').should.be.ok();
  });
  
  it('videojs-countdown-start plugin adds child components', function() {
    this.player.getChild('countdownStartDialog').should.be.ok();
  });
  
  after(function() {
    this.player.dispose();
    this.clock.restore();
  });
});

