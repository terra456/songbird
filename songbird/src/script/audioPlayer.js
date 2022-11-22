import Control from "./common/control";
import Timer from "./timer";

class AudioPlayer extends Control {
    
    constructor(parentNode, audioUrl) {
        super(parentNode, 'div', 'player');
        this.currentTime = 0;
        
        this.audio = document.createElement('audio');
        this.audio.src = audioUrl;
        this.audio.onloadeddata = () => {
            this.time = Math.floor(this.audio.duration);
            this.timerPanel = new Timer(this.node, this.time, this.node.scrollWidth - 40);
        };
        this.node.appendChild(this.audio);
        this.playBtn = new Control(this.node, 'button', 'player__btn player__btn--play');
        this.playBtn.node.onclick = () => {
            this.onPlay();
        }
    }

    playAudio() {
        console.log(this.audio.paused);
        if (this.audio.paused) {
            this.timeStart();
        } else {
            this.timePaused();
        }
    }

    timeStart() {
        this.playBtn.node.classList.toggle('player__btn--play');
        this.playBtn.node.classList.toggle('player__btn--pause');
        this.audio.currentTime = this.currentTime;
        this.timer = window.setInterval(() => {
            this.currentTime++;
            this.timerPanel.move(this.currentTime);
            if (this.currentTime >= this.time) {
                this.timeStop();
            }
        }, 1000);
        this.audio.play();
    }

    timePaused() {
        this.playBtn.node.classList.toggle('player__btn--play');
        this.playBtn.node.classList.toggle('player__btn--pause');
        window.clearInterval(this.timer);
        this.audio.pause();
    }

    timeStop() {
        this.playBtn.node.classList.toggle('player__btn--play');
        this.playBtn.node.classList.toggle('player__btn--pause');
        this.currentTime = 0;
        clearInterval(this.timer);
        this.audio.pause();
        this.timerPanel.move(0);
    }

}

export default AudioPlayer;