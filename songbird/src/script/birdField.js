import Control from "./common/control";
import AudioPlayer from "./audioPlayer";

class BirdField extends Control {
    
    constructor(parentNode, birdName, audioUrl, imgUrl = 'https://birds-quiz.netlify.app/static/media/bird.06a46938.jpg', desc, latName) {
        super(parentNode, 'div', 'bird');
        this.audio = audioUrl;
        this.birdName = birdName;
        this.nameNode = new Control(this.node, 'h3', 'bird__header', this.birdName);
        this.image = new Control(this.node, 'img', 'bird__img');
        this.image.node.src = imgUrl;
        this.audioPlayer = new AudioPlayer(this.node, this.audio);
        this.audioPlayer.onPlay = () => {
            this.birdPlay();
            // this.audioPlayer.playAudio();
        };
        if (desc && latName) {
            const latNameNode = new Control(this.node, 'h4', 'bird__header--small', latName);
            const descNode = new Control(this.node, 'p', 'bird__desc', desc);
        }
    }

    showImage(imgUrl) {
        this.image.node.src = imgUrl;
    }

    changeName(name) {
        this.nameNode.node.textContent = name;
    }

    stopAudio() {
        this.audioPlayer.timeStop();
    }

    playAudio() {
        this.audioPlayer.playAudio();
    }

}

export default BirdField;