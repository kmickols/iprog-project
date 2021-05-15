import {authenticateSpotify, getSpotifyPlayer, spotifyStatus} from "../components/spotify";
import {
    createRoom,
    nextQuestion,
    revealQuestion,
    answerQuestion,
    getQuestion,
    getScores,
    getRoomDetails,
    launchGame
} from "../components/roomAPI";
import {joinRoom} from "../components/roomAPI";
import {playSong, stopPlaying} from "../components/spotify";


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

    createRoom(numQuestions, quiz_type = "classics") {
        return createRoom(numQuestions, quiz_type)
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

    getJoinRoom(tmp_code, tmp_name) {
        return joinRoom(tmp_code, tmp_name)
    }

    getQuestion(getFirst = false) {
        return getQuestion(this.roomCode, getFirst)
    }

    getAnswerQuestion(arr, currentQuestionIndex) {
        return answerQuestion(this.roomCode, arr, currentQuestionIndex)
    }

    getPlaySong(token) {
        playSong(token)
    }

    getRevealQuestion() {
        return revealQuestion(this.roomCode)
    }

    getStopPlaying() {
        stopPlaying()
    }

    getNextQuestion() {
        return nextQuestion(this.roomCode)
    }

    getScores() {
        return getScores(this.roomCode)
    }

    getRoomDetails() {
        return getRoomDetails(this.roomCode)
    }

    getLaunchGame() {
        return launchGame(this.roomCode)
    }

    getRoom() {
        return this.roomCode
    }
}