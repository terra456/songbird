import Control from "./common/control";
import AudioPlayer from "./audioPlayer";

class BirdField extends Control {
    
    constructor(parentNode, audioUrl, name) {
        super(parentNode, 'div', 'bird__data');
        this.audio = audioUrl;
        this.name = name;
        this.render();
    }

    render() {
        // const img = new Control(this.node, 'img', 'bird__img');
        // img.src = data.imgUrl;
        const name = new Control(this.node, 'h3', 'bird__header', this.name);
        const audioPlayer = new AudioPlayer(this.node, this.audio);
    }

}

export default BirdField;