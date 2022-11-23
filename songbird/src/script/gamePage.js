import Control from "./common/control";
import BirdField from "./birdField";
import DataModel from "./dataModel";

class GamePage extends Control {
    
    constructor(parentNode, levelNodes) {
        super(parentNode, 'main', 'main');
        this.score = 0;
        this.questionNumber = 0;
        this.isGetRightAnswer = false;
        this.levelNodes = levelNodes;
        this.scoreIndicator = new Control(this.node, 'div', 'main__score', `Score: ${this.score}`);
        this.dataModel = new DataModel();
        this.nextBtn = new Control(this.node, 'button', 'btn main__btn btn__nav', 'Next question');
        this.nextBtn.node.disabled = true;
        this.correctAudio = new Audio('./assets/sounds/correct.mp3');
        this.errorAudio = new Audio('./assets/sounds/error.mp3');
        this.questionsCycle();
    }

    questionsCycle() {
        this.newQuestion(this.questionNumber);
        this.nextBtn.node.innerText = 'Next question';
        this.nextBtn.node.onclick = () => {
            this.levelNodes[this.questionNumber].node.classList.add('complete');
            this.questionField.destroy();
            if (this.questionNumber >= 5) {
                this.questionField = new Control(this.node, 'div', 'main__question', `Вы набрали ${this.score} из 30`);
                this.nextBtn.node.innerText = 'New Game';
                if (!this.isGetRightAnswer) {
                    this.finishGame();
                } else {
                    this.isGetRightAnswer = false;
                }
            } else {
                this.questionNumber++;
                this.newQuestion(this.questionNumber);
            }
        }
    }

    newQuestion(number) {
        this.scoreIndicator.node.textContent = `Score: ${this.score}`;
        let attempt = 0;
        this.isGetRightAnswer = false;
        this.nextBtn.node.disabled = true;
        this.questionField = new Control(this.node, 'div', 'main__question');
        const questionData = this.dataModel.getQuestionData(number);
        const question = new BirdField(this.questionField.node, '*****', questionData.songUrl);
        question.birdPlay = () => {
            question.playAudio();
        }
        const answers = new Control(this.questionField.node, 'ul', 'main__answers answers__list');
        let birdNode = new Control(this.questionField.node, 'div', 'bird__data', 'Послушайте плеер. Выберите птицу из списка');
        questionData.answers.forEach((el, i) => {
            const answer = new Control(answers.node, 'li', 'main__answer answers__item', el);
            answer.node.onclick = () => {
                birdNode.destroy();
                const birdObj = this.dataModel.getBirdDataByName(el);
                birdNode = new BirdField(this.questionField.node, birdObj.name, birdObj.audio, birdObj.image, birdObj.description, birdObj.species);
                birdNode.birdPlay = () => {
                    if (!question.audioPlayer.audio.paused) {
                        question.audioPlayer.timePaused();
                    }
                    birdNode.playAudio();
                }
                if (!this.isGetRightAnswer) {
                    if (i === questionData.correctAnswerIndex) {
                        question.stopAudio();
                        this.isGetRightAnswer = true;
                        this.correctAudio.play();
                        answer.node.classList.add('answers__item--correct');
                        question.changeName(questionData.correctName);
                        question.showImage(birdObj.image);
                        this.nextBtn.node.disabled = false;
                        if (attempt < 6) {
                            this.score += (5 - attempt);
                            this.scoreIndicator.node.textContent = `Score: ${this.score}`;
                        }
                    } else {
                        attempt++;
                        this.errorAudio.play();
                        answer.node.classList.add('answers__item--incorrect');
                    }
                }
            }
        })
        
    }
}

export default GamePage;