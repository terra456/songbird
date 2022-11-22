import Control from "./common/control";
import BirdField from "./birdField";
import DataModel from "./dataModel";

class CategoryPage extends Control {
    
    constructor(parentNode, name = '', ind = 0) {
        super(parentNode, 'main', 'main');
        this.dataModel = new DataModel();
        const header = new Control(this.node, 'h2', 'main__header', name);
        const list = new Control(this.node, 'ul', 'main__list');
        const data = this.dataModel.getCategory(ind);
        let birdNode = new BirdField(this.node, data[0].name, data[0].audio, data[0].image, data[0].description, data[0].species);
        birdNode.birdPlay = () => {
            this.onPlay(birdNode);
        }
        this.birds = data.map((el) => {
            const item = new BirdField(list.node, el.name, el.audio, el.image);
            item.node.onclick = () => {
                birdNode.destroy();
                birdNode = new BirdField(this.node, el.name, el.audio, el.image, el.description, el.species);
                birdNode.birdPlay = () => {
                    this.onPlay(birdNode);
                }
            }
            item.birdPlay = () => {
                this.onPlay(item);
            }
            return item;
        })
    }

    onPlay(item) {
        if(item.audioPlayer.audio.paused) {
            this.birds.forEach((el) => {
                if (!el.audioPlayer.audio.paused) {
                    el.audioPlayer.timePaused();
                }
            })
        }
        item.playAudio();
    }
}

export default CategoryPage;