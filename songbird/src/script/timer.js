import Control from "./common/control";

class Timer extends Control {

    constructor(parentNode, time, width) {
        super(parentNode, 'div', 'timer');
        this.allTime = time;
        this.width = width;
        this.step = this.width / this.allTime;
        const progressBar = new Control(this.node, 'div', 'timer__progressbar');
        progressBar.width = `${this.width}.px`;
        this.progressBarComplite = new Control(this.node, 'div', 'timer__complite');
        this.progressBarDot = new Control(this.node, 'div', 'timer__dot');
        this.currentTime = new Control(this.node, 'div', 'timer__time', '00:00');
        const allTime = new Control(this.node, 'div', 'timer__time', this.calculate(this.allTime));
    }

    move(sec) {
        this.progressBarComplite.node.style.width = `${this.step * sec}px`;
        this.progressBarDot.node.style.left = `${this.step * sec}px`;
        this.currentTime.node.textContent = this.calculate(sec);
    }

    calculate(sec) {
        const s = sec % 60;
        return `${Math.floor(sec / 60)}:${s >=10 ? s : '0' + s }`;
    }
}

export default Timer;