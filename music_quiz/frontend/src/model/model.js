import {spotifyStatus} from "../components/spotify";

export default class Model {
    constructor(players = 0, question = "", currentQuestion = 0, numQuestions = -1, roomCode = "", spotifyStatus = false) {
        this.question = question;
        this.currentQuestion = currentQuestion;
        this.roomCode = roomCode;
        this.setNumberOfPlayers(players);
        this.setNumQuestions(numQuestions);
        this.isHost = false
        this.spotifyStatus=spotifyStatus;
        this.autoplay = false
    }
    setRoomCode(x){
        this.roomCode = x;
    }

    setSpotifyStatus(){
        this.spotifyStatus = spotifyStatus();

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