import Control from './common/control';
import Header from './header.js';
import GamePage from './gamePage';

class App extends Control {

    constructor(parentNode) {
        super(parentNode);
        const preloader = new Control(this.node, 'div', '', 'Loading...');
        // this.model = new QuizDataModel();
        // this.model.build().then((result) => {
        //     preloader.destroy();
        //     console.log(result.data);
        // })
        this.mainCycle();
        this.gameCycle();
    }

    gameCycle() {
        this.gamePage = new GamePage(this.node, 'gmewkirfjwerfkdqw');
    }

    mainCycle() {
        const header = new Header(this.node);
        header.onGameStart = () => {
            console.log('start');
            this.gamePage.destroy();
            this.gameCycle();
        }
    }
}

export default App;