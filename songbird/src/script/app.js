import Control from './common/control';
import Header from './header.js';
import GamePage from './gamePage';
import CategoryPage from './categoryPage';

class App extends Control {

    constructor(parentNode) {
        super(parentNode, 'div', 'main__wrapper');
        this.mainCycle();
    }

    gameCycle(nodes) {
        this.gamePage = new GamePage(this.node, nodes);
    }

    categoryCycle(categoryName, categoryInd) {
        this.gamePage = new CategoryPage(this.node, categoryName, categoryInd);
    }

    mainCycle() {
        const header = new Header(this.node);
        this.gamePage = new GamePage(this.node, header.levels);
        header.onGallery = () => {
            this.gamePage.destroy();
            if (header.isGame) {
                this.categoryCycle();
                header.isGame = false;
                header.galleryBtn.node.textContent = 'Start Game';
            } else {
                this.gameCycle(header.getLevelNodes());
                header.isGame = true;
                header.galleryBtn.node.textContent = 'Learn Birds';
            }
        }
    }
}

export default App;