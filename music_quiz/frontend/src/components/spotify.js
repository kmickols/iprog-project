import {onSpotifyWebPlaybackSDKReady} from "./webbPlayer";

export function authenticateSpotify() {
    fetch("/spotify/is-authenticated")
        .then((response) => response.json())
        .then((data) => {
            if (!data.status) {
                fetch("/spotify/get-auth-url")
                    .then((response) => response.json())
                    .then((data) => {
                        window.location.replace(data.url);
                    });
            }
        });
}

export function spotifyStatus() {
    return fetch("/spotify/is-authenticated")
        .then(response => response.json())
        .then(data => {
            return data.status
        });
}

export function getSpotifyPlayer() {
    return fetch("/spotify/get-user-token")
        .then((response) => response.json())
        .then((data) => {
            return onSpotifyWebPlaybackSDKReady(data.token)
        });
}

export function setDevice(deviceID) {
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            device_id: deviceID.toString(),
        }),
    };
    return fetch("/spotify/set-device", requestOptions)
        .then(response => {
            if (response.ok) {
                return response
            } else {
                throw response.json()
            }
        })
        .then(response => response.json())
}

export function playSong(songID) {
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            song_id: songID,
        }),
    };
    return fetch("/spotify/play-song", requestOptions)
        .then(response => {
            if (response.ok) {
                return response
            } else {
                throw response.json()
            }
        })
        .then(response => response.json())
}

export function stopPlaying() {
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
    };
    return fetch("/spotify/stop-playing", requestOptions)
        .then(response => {
            if (response.ok) {
                return response
            } else {
                throw response.json()
            }
        })
        .then(response => response.json())
}