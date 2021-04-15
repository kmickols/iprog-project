
export default class Model {
    constructor(players = 0, question = "", currentQuestion = 0, numQuestions = -1, roomCode = "") {
        this.question = question;
        this.currentQuestion = currentQuestion;
        this.roomCode = roomCode;
        this.setNumberOfPlayers(players);
        this.setNumQuestions(numQuestions);
        this.isHost = false
        this.autoplay = false
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

    setIsHost(bool) {
        this.isHost = bool
    }

    getQuestion(x){
        let questionElement = this.questions[x];
        return questionElement;
    }

    // updateScore
    
}