import Control from "./common/control";
import BirdField from "./birdField";
import DataModel from "./dataModel";

class GamePage extends Control {
    
    constructor(parentNode, name) {
        super(parentNode, 'main', 'main');
        this.name = name;
        this.progressIndicator = new Control(this.node, 'div', '', '');
        this.answersIndicator = new Control(this.node, 'div', '', '');
        // const questions: Array<IArtistsQuestionData | IPicturesQuestionData> = questionsData;
        // this.results = [];
        // this.questionCycle(gameOptions.gameName, questions, 0, () => {
        //     this.onFinish(this.results);
        // })
        this.dataModel = new DataModel();
        this.questionsCycle();
    }

    questionsCycle() {
        this.newQuestion();
        const nextBtn = new Control(this.node, 'button', 'main__btn btn__next', 'Next question');
    }

    newQuestion(number) {
        const questionData = this.dataModel.getQuestionData(1);
        const question = new BirdField(this.node, questionData.songUrl, questionData.correctName);
        const answers = new Control(this.node, 'div', 'main__answers answers__list', 'Select me');
        const description = new Control(this.node, 'div', 'main__description', this.name);
    }

}

export default GamePage;