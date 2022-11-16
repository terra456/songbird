import Control from "./common/control";

class Timer extends Control {

    constructor(parentNode, time, width) {
        super(parentNode);
        this.allTime = time;
        this.width = width;
        this.step = this.width / this.allTime;
        const progressBar = new Control(this.node, 'div', 'timer__progressbar');
        progressBar.width = `${this.width}.px`;
        this.progressBarComplite = new Control(this.node, 'div', 'timer__progressbar-complite');
        this.progressBarDot = new Control(this.node, 'div', 'timer__progressbar-dot');
        this.currentTime = new Control(this.node, 'div', 'timer__time', '00:00');
        const allTime = new Control(this.node, 'div', 'timer__time', this.calculate(this.allTime));
    }

    move(sec) {
        // this.progressBarComplite.width = `${this.step * sec}px`;
        // this.progressBarDot.trasform = `translateX: ${this.step * sec}px`;
        console.log('rdrfg' + sec);
        this.currentTime.node.textContent = this.calculate(sec);
    }

    calculate(sec) {
        const s = sec % 60;
        return `${Math.floor(sec / 60)}:${s >=10 ? s : '0' + s }`;
    }

    // start(time, width) {
    //     this.initialTime = time;
        
    //     let currentTime = time;
    //     const render = (currentTime: number) => {
    //         this.node.textContent = `${this.initialTime} / ${currentTime}`;
    //     }
    //     render(time);
    //     this.timer = window.setInterval(() => {
    //         currentTime--;
    //         render(currentTime);
    //         if (currentTime <= 0) {
    //             this.onTimeout();
    //         }
    //     }, 1000)
    // }

    // stop() {
    //     window.clearInterval(this.timer);
    // }
}


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
            this.timerStart();
        }
        const stopBtn = new Control(this.node, 'button', 'player__play-btn', 'stop');
        stopBtn.node.onclick = () => {
            this.timerStop();
        }
        // playBtn.node.onclick = () => {
        //     audio.stop();
        // }
        // const playBtn = new Control(this.node, 'button', 'player__play-btn', 'play');
        // playBtn.node.onclick = () => {
        //     audio.play();
        // }
    }

    timerStart() {
        // this.audio.currentTime = this.currentTime;
        this.timer = window.setInterval(() => {
            this.currentTime++;
            this.timerPanel.move(this.currentTime);
            if (this.currentTime >= this.time) {
                this.timerStop();
            }
        }, 1000);
        this.audio.play();
    }

    timerPaused() {
        clearInterval(this.timer);
        this.audio.pause();
    }

    timerStop() {
        this.currentTime = 0;
        clearInterval(this.timer);
        this.audio.pause();
    }

}

export default AudioPlayer;