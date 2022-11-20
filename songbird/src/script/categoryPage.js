import Control from "./common/control";
import BirdField from "./birdField";
import DataModel from "./dataModel";

class CategoryPage extends Control {
    
    constructor(parentNode, name, ind) {
        super(parentNode, 'main', 'main');
        this.dataModel = new DataModel();
        const header = new Control(this.node, 'h2', 'main__header', name);
        const list = new Control(this.node, 'ul', 'main__list');
        let birdNode = new Control(this.node, 'div', 'bird__data', 'Выберите птицу из списка');
        this.dataModel.getCategory(ind).forEach((el) => {
            const item = new BirdField(list.node, el.name, el.audio, el.image);
            item.node.onclick = () => {
                birdNode.destroy();
                birdNode = new BirdField(this.node, el.name, el.audio, el.image, el.description, el.species);
            }
        })
    }
}

export default CategoryPage;