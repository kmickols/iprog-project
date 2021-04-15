class Model {
    constructor(players = 2, questions = [], currentQuestion = 0, numQuestions = 1, roomCode = "") {
        this.questions = dishes;
        this.currentQuestion = currentQuestion;
        this.roomCode = roomCode;
        this.setNumberOfPlayers(players);
        this.setNumberOfQs(numQuestions);
        this.getNextQ(currentQuestion);
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

    getNextQ(){
        if((currentQuestion +1 ) != numQuestions){ // We're not on the last Q
            this.currentQuestion = currentQuestion +1;
            this.getQuestion(currentQuestion);
        }
    }

    getQuestion(x){
        let questionElement = this.questions[x];
        return questionElement;
    }

    // updateScore
    
}