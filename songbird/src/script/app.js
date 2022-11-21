import Control from './common/control';
import Header from './header.js';
import GamePage from './gamePage';
import CategoryPage from './categoryPage';

class App extends Control {

    constructor(parentNode) {
        super(parentNode, 'div', 'main__wrapper');
        this.mainCycle();
        this.gameCycle();
    }

    gameCycle() {
        this.gamePage = new GamePage(this.node);
    }

    categoryCycle(categoryName, categoryInd) {
        this.gamePage = new CategoryPage(this.node, categoryName, categoryInd);
    }

    mainCycle() {
        const header = new Header(this.node);
        header.onGameStart = () => {
            console.log('start');
            this.gamePage.destroy();
            this.gameCycle();
        }
        header.onCategory = (categoryName, categoryInd) => {
            this.gamePage.destroy();
            this.categoryCycle(categoryName, categoryInd);
        }
    }
}

export default App;