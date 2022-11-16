import Control from "./common/control";
import Timer from "./timer";

class AudioPlayer extends Control {
    
    constructor(parentNode, audioUrl) {
        super(parentNode, 'div', 'bird__data');
        this.currentTime = 0;
        
        this.audio = document.createElement('audio');
        this.audio.src = audioUrl;
        this.audio.onloadeddata = () => {
            console.log(this.audio.duration);
            this.time = Math.floor(this.audio.duration);
            this.timerPanel = new Timer(this.node, this.time);
        };
        this.node.appendChild(this.audio);
        this.render();
    }
    
    render() {
        const player = new Control(this.node, 'div', 'player');
        const playBtn = new Control(this.node, 'button', 'player__play-btn', 'play');
        playBtn.node.onclick = () => {
            this.timeStart();
        }
        const pauseBtn = new Control(this.node, 'button', 'player__play-btn', 'pause');
        pauseBtn.node.onclick = () => {
            this.timePaused();
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