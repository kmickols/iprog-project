
//gets the details of the room with the specified room code.
//see list of rooms at /api/rooms
//test at /api/get-room?code=<ROOM_CODE>
export function getRoomDetails(roomCode){
    return fetch("/api/get-room?code="+roomCode)
        .then(response => {
            if (response.status === 200){
                return response
            } else {
                throw "status code: " + response.status + "\nReason: " + response.data
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
        .then((response) => response.json())
}

// Joins a room with the specified room code. Returns the HTTP response.
// The name argument specifies tha players name. Maximum 15 characters.
export function joinRoom(roomCode, name){
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: roomCode,
        user_name: name,
      }),
    };

    return fetch("/api/join-room", requestOptions)
        .then(response => {
            return response.json()
            })
        .catch(error => console.log(error))
}

// Returns the users roomCode (if they are in a room)
// A user that enter the site may already be part of a room (stored in their session)
// If that is the case, it might be desirable to instantly redirect them to the room they are part of.
export function userInRoom(){

    return fetch("api/user-in-room")
        .then(response => response.json())
        .then(dt => dt.code)
}

//Returns all players in the specified room
export function getPlayers(roomCode){
    return fetch("api/players-in-room?room_code="+roomCode)
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
    return fetch("api/leave-room", requestOptions)
        .then(response => response.json())
}