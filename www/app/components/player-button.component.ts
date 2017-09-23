'use strict';

// workaround for global variables
declare var Howl: any;
declare var Tether: any;

function PlayerButtonController($scope, $element, $attrs) {
    var ctrl = this;

    ctrl.isAudioPlaying = false;
    ctrl.play = function() {
        console.log('Playing audio:' + ctrl.audioUrl);
        if (!ctrl.isAudioPlaying) {
            ctrl.isAudioPlaying = true;
            var uri = ctrl.audioUrl;
            var sound = new Howl({
              src: [uri],
              onend: function() {
                console.log('Audio playback finished!');
                ctrl.isAudioPlaying = false;
                $scope.$apply();
              }.bind(this),
              onplayerror: function() {
                console.log('Audio playback failed!');
                ctrl.isAudioPlaying = false;
                $scope.$apply();
              }.bind(this),
              onloaderror: function() {
                console.log('Audio failed to load!');
                ctrl.isAudioPlaying = false;
                $scope.$apply();
              }.bind(this),
            });
            sound.play();
        }
    }
}

var PlayerButton = {
    template: require('./player-button.component.html'),
    bindings: {
        audioUrl: '@', // url of the audio to be played
        text: '@' // text on the button
    },
    controller: PlayerButtonController
}

module.exports = PlayerButton;