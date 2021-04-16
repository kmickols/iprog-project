
//gets the details of the room with the specified room code.
//see list of rooms at /api/rooms
//test at /api/get-room?code=<ROOM_CODE>
export function getRoomDetails(roomCode){
    return fetch("/api/get-room?code="+roomCode)
        .then(response => {
            if (response.ok){
                return response
            } else {
                throw response.json()
            }
        })
        .then(dt => dt.json());
}

// Creates a room with a random new room code and specified number of questions. The current user wil lbe the host.
// If the current user already has hosted a room, the existing room will be updated.
// Returns the HTTP response
// see html form of rooms at /api/create-room
export function createRoom(numQuestions){
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        num_questions: numQuestions,
      }),
    };
    return fetch("/api/create-room", requestOptions)
        .then(response => {
            if (response.ok){
                return response
            } else {
                throw response.json()
            }
        })
        .then(response => response.json())
}

// Joins a room with the specified room code. Returns the HTTP response.
// The name argument specifies tha players name. Maximum 15 characters.
// If there is an error the response will contain a message field that describes the error.
export function joinRoom(roomCode, name){
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room_code: roomCode,
        user_name: name,
      }),
    };

    return fetch("/api/join-room", requestOptions)
        .then(response => {
            if (response.ok){
                return response
            } else {
                throw response.json()
            }
        })
        .then(response => response.json())
}

// Returns the users roomCode (if they are in a room)
// A user that enter the site may already be part of a room (stored in their session)
// If that is the case, it might be desirable to instantly redirect them to the room they are part of.
export function userInRoom(){

    return fetch("/api/user-in-room")
        .then(response => {
            if (response.ok){
                return response
            } else {
                throw response.json()
            }
        })
        .then(response => response.json())
        .then(dt => dt.code)
}

//Returns all players in the specified room
export function getPlayers(roomCode){
    return fetch("/api/players-in-room?room_code="+roomCode)
        .then(response => {
            if (response.ok){
                return response
            } else {
                throw response.json()
            }
        })
        .then(response => response.json())
        .then(dt => dt.players)
}


// The user Leaves the room.
// Warning: If the host leaves the room, the room will be deleted.
export function leaveRoom(){
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    return fetch("/api/leave-room", requestOptions)
        .then(response => {
            if (response.ok){
                return response
            } else {
                throw response.json()
            }
        })
        .then(response => response.json())
}

// Launches The game. Players will not be able to join anymore.
// Returns the set of questions for the game. Meant to be called from the host.
export function launchGame(roomCode){
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            code: roomCode,
    })
    };
    return fetch("/api/launch-game", requestOptions)
        .then(response => {
            if (response.ok){
                return response
            } else {
                throw response.json()
            }
        })
        .then(response => response.json())
}


// Ends The game (Removes the room). Players will not be able to join anymore.
// Meant to be called from the host.
export function endGame(roomCode){
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            code: roomCode,
    })
    };
    return fetch("/api/end-game", requestOptions)
        .then(response => {
            if (response.ok){
                return response
            } else {
                throw response.json()
            }
        })
        .then(response => response.json())
}

export function answerQuestion(roomCode, answers, index){
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            code: roomCode,
            answers: answers,
            index: index,
        })
    };
    return fetch("/api/answer-question", requestOptions)
        .then(response => {
            if (response.ok){
                return response
            } else {
                throw response.json()
            }
        })
        .then(response => response.json())
}

export function nextQuestion(roomCode){
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            code: roomCode,
        })
    };
    return fetch("/api/next-question", requestOptions)
        .then(response => {
            if (response.ok){
                return response
            } else {
                throw response.json()
            }
        })
        .then(response => response.json())
        .then(json => json.question)
}

export function getQuestion(roomCode){
    return fetch("/api/get-question?code="+roomCode)
        .then(response => {
            if (response.ok){
                return response.json().then(dt => dt.question)
            } else {
                throw response.json()
            }
        })
}

export function revealQuestion(roomCode){
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            code: roomCode,
        })
    };
    return fetch("/api/reveal-question", requestOptions)
        .then(response => {
            if (response.ok){
                return response
            } else {
                throw response.json()
            }
        })
        .then(response => response.json())
}

export function getScores(roomCode){
    return fetch("/api/get-score?code="+roomCode)
        .then(response => {
            if (response.ok){
                return response.json().then(dt => dt.scores)
            } else {
                throw response.json()
            }
        })
}