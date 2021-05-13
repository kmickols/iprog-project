import {authenticateSpotify, getSpotifyPlayer, spotifyStatus} from "../components/spotify";
import {createRoom} from "../components/roomAPI";

export default class Model {
    constructor(players = 0, question = "", currentQuestion = 0, numQuestions = -1, roomCode = "") {
        this.question = question;
        this.currentQuestion = currentQuestion;
        this.setRoomCode(roomCode)
        this.setNumberOfPlayers(players);
        this.setNumQuestions(numQuestions);
        this.isHost = false
        this.autoplay = false
        this.score = 0
        this.nickname = ""
    }

    setRoomCode(x) {
        this.roomCode = x;
    }

    setNumberOfPlayers(x) {
        this.players = x;
    }

    setNumQuestions(x) {
        this.numQuestions = x;
    }

    setIsHost(bool) {
        this.isHost = bool
    }

    addScore(deltaScore) {
        this.score += deltaScore
    }

    getScore() {
        return this.score
    }

    setNickname(name) {
        this.nickname = name
    }

    getNickname() {
        return this.nickname
    }

    createRoom(numQuestions) {
        return createRoom(numQuestions)
    }

    getSpotifyPlayer() {
        return getSpotifyPlayer()
    }

    getSpotifyStatus() {
        return spotifyStatus()
    }

    getAuthenticateSpotify() {
        return authenticateSpotify()
    }
}