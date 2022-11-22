import Control from './common/control';

export class Header extends Control {

    constructor(parentNode) {
        super(parentNode, 'header', 'header');

        this.isGame = true;

        this.galleryBtn = new Control(this.node, 'button', 'btn btn__nav', 'Learn Birds');
        this.galleryBtn.node.onclick = () => this.onGallery();

        this.levels = ['Городские птицы', 'Врановые', 'Лесные птицы', 'Певчие птицы', 'Хищные птицы', 'Морские птицы']
        .map((el, i) => {
            const categoryBtn = new Control(this.node, 'div', 'btn__nav', el);
            return categoryBtn;
        });
    }

    getLevelNodes() {
        console.log(this.levels);
        return this.levels;
    }
}

export default Header;