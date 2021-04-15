class Model {
    constructor(players = 2, questions = [], currentQ = 0, numberOfQs = 1, roomCode = "") {
        this.questions = dishes;
        this.currentQ = currentQ;
        this.roomCode = roomCode;
        this.setNumberOfPlayers(players);
        this.setNumberOfQs(numberOfQs);
        this.getNextQ(currentQ);
    }

    setNumberOfPlayers(x){
        this.players = x;
    }

    setNumberOfQs(x) {
        this.numberOfQs = x;
    }

    getNextQ(){
        if((currentQ +1 ) != numberofQs){ // We're not on the last Q
            this.currentQ = currentQ +1;
            this.getQuestion(currentQ);
        }/* else{
            //GEJM OVER
        }*/
    }

    getQuestion(x){
        let questionElement = this.questions[x];
        return questionElement;
    }

    // updateScore
    
}