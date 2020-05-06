import { Component, Input } from "@angular/core";


// workaround for global variables
declare var Howl: any;
declare var Tether: any;


@Component({
    selector: 'player-button',
    template: require('./player-button.component.html'),
})
export class PlayerButtonComponent {
    @Input() audioUrl: string;
    @Input() text: string;

    constructor() {

    }

    private isAudioPlaying: boolean = false;
    private play(): void {
        console.log('Playing audio:' + this.audioUrl);
        if (!this.isAudioPlaying) {
            this.isAudioPlaying = true;
            var uri = this.audioUrl;
            var sound = new Howl({
                src: [uri],
                onend: function () {
                    console.log('Audio playback finished!');
                    this.isAudioPlaying = false;
                }.bind(this),
                onplayerror: function () {
                    console.log('Audio playback failed!');
                    this.isAudioPlaying = false;
                }.bind(this),
                onloaderror: function () {
                    console.log('Audio failed to load!');
                    this.isAudioPlaying = false;
                }.bind(this),
            });
            sound.play();
        }
    }
}
