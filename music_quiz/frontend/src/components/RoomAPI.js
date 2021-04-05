
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

//Creates a room with a random new room code and specified number of questions. The current user wil lbe the host. If the current user already has hosted a room, the existing room will be updated.
// see html form of rooms at /api/create-room
export function createRoom(numQuestions){
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        num_questions: numQuestions,
      }),
    };
    fetch("/api/create-room", requestOptions)
        .then((response) => response.json())
        .then(dt=>console.log(dt))
}