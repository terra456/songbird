import Control from "./common/control";
import Timer from "./timer";

class AudioPlayer extends Control {
    
    constructor(parentNode, audioUrl) {
        super(parentNode, 'div', 'player');
        this.currentTime = 0;
        
        this.audio = document.createElement('audio');
        this.audio.src = audioUrl;
        this.audio.onloadeddata = () => {
            console.log(this.audio.duration);
            this.time = Math.floor(this.audio.duration);
            this.timerPanel = new Timer(this.node, this.time, this.node.scrollWidth);
        };
        this.node.appendChild(this.audio);
        this.render();
    }
    
    render() {
        const playBtn = new Control(this.node, 'button', 'player__btn player__btn--play');
        playBtn.node.onclick = () => {
            console.log(this.node.scrollWidth);
            playBtn.node.classList.toggle('player__btn--play');
            playBtn.node.classList.toggle('player__btn--pause');
            if (this.audio.paused) {
                this.timeStart();
            } else {
                this.timePaused();
            }
        }
    }

    timeStart() {
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
        window.clearInterval(this.timer);
        this.audio.pause();
    }

    timeStop() {
        this.currentTime = 0;
        clearInterval(this.timer);
        this.audio.pause();
    }

}

export default AudioPlayer;