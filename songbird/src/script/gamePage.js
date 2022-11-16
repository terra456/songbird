import Control from "./common/control";
import BirdField from "./birdField";
import DataModel from "./dataModel";

class GamePage extends Control {
    
    constructor(parentNode) {
        super(parentNode, 'main', 'main');
        this.score = 0;
        this.questionNumber = 0;
        this.progressIndicator = new Control(this.node, 'div', '', `${this.questionNumber}`);
        this.scoreIndicator = new Control(this.node, 'div', '', `Score: ${this.score}`);
        // const questions: Array<IArtistsQuestionData | IPicturesQuestionData> = questionsData;
        // this.results = [];
        // this.questionCycle(gameOptions.gameName, questions, 0, () => {
        //     this.onFinish(this.results);
        // })
        this.dataModel = new DataModel();
        this.questionsCycle();
    }

    questionsCycle() {
        this.newQuestion(this.questionNumber);
        this.nextBtn = new Control(this.node, 'button', 'main__btn btn__next', 'Next question');
        this.nextBtn.node.onclick = () => {
            this.questionNumber++;
            this.questionField.destroy();
            if (this.questionNumber >= 5) {
                this.finishGame();
            } else {
                this.newQuestion(this.questionNumber);
            }
        }
        // this.nextBtn.disable = true;
    }

    newQuestion(number) {
        let attempt = 0;
        this.questionField = new Control(this.node, 'div', 'main__question');
        const questionData = this.dataModel.getQuestionData(number);
        const question = new BirdField(this.questionField.node, questionData.songUrl, questionData.correctName);
        const answers = new Control(this.questionField.node, 'ul', 'main__answers answers__list', 'Select me');
        questionData.answers.forEach((el, i) => {
            const answer = new Control(answers.node, 'li', 'main__answer answers__item', el);
            answer.node.onclick = () => {
                if (i === questionData.correctAnswerIndex) {
                    answer.node.classList.add('answers__item--correct');
                    if (attempt < 6) {
                        this.score += (5 - attempt);
                        this.scoreIndicator.node.textContent = `Score: ${this.score}`;
                    }
                    // this.nextBtn.disable = true;
                } else {
                    attempt++;
                    answer.node.classList.add('answers__item--incorrect');
                    console.log(attempt);
                }
            }
        })
        const description = new Control(this.questionField.node, 'div', 'main__description', this.name);
    }

    finishGame() {
        this.questionField = new Control(this.node, 'div', 'main__question', `Вы набрали ${this.score} из 30`);
        this.questionNumber = 0;
    }

}

export default GamePage;