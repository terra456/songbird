import Control from './common/control';

export class Header extends Control {

    constructor(parentNode) {
        super(parentNode, 'header', 'header');

        const gameBtn = new Control(this.node, 'button', '', 'Start Game');
        gameBtn.node.onclick = () => this.onGameStart();

        ['Городские птицы', 'Врановые', 'Лесные птицы', 'Певчие птицы', 'Хищные птицы', 'Морские птицы']
        .forEach((el, i) => {
            const categoryBtn = new Control(this.node, 'button', '', el);
            categoryBtn.node.onclick = () => this.onCategory(el, i);
        })
    }
}

export default Header;