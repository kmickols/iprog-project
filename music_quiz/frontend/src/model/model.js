export default class Model {
    constructor(players = 2, questions = [], currentQuestion = 0, numQuestions = 1, roomCode = "") {
        this.questions = questions;
        this.currentQuestion = currentQuestion;
        this.roomCode = roomCode;
        this.setNumberOfPlayers(players);
        this.setNumQuestions(numQuestions);
    }
    setRoomCode(x){
        this.roomCode = x;
    }

    setNumberOfPlayers(x){
        this.players = x;
    }

    setNumQuestions(x) {
        this.numQuestions = x;
    }

    getQuestion(x){
        let questionElement = this.questions[x];
        return questionElement;
    }

    // updateScore
    
}