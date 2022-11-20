import birdsData from './birds';

class DataModel {
    constructor() {
        this.birdsData = birdsData;
        console.log(this.birdsData);
    }

    getQuestionData(questionNumber) {
        const birdsQuestionData = this.birdsData[questionNumber];
        const answers = [];
        const answersCount = 6;
        const correctAnswerIndex = Math.floor(Math.random() * answersCount);
        const correctAnswerSong = birdsQuestionData[correctAnswerIndex].audio;
        const correctName = birdsQuestionData[correctAnswerIndex].name;
        for (let j = 0; j < answersCount; j++) {
            answers.push(birdsQuestionData[j].name);
        }
        const result = {
            songUrl: correctAnswerSong,
            correctAnswerIndex: correctAnswerIndex,
            correctName: correctName,
            answers: answers,
        };
        return result;
    }

    getBirdDataByName(name) {
        return this.birdsData.flat().find((el) => el.name === name);
    }

    getCategory(ind) {
        return this.birdsData[ind];
    }
}

export default DataModel;