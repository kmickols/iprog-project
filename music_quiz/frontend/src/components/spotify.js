export function authenticateSpotify() {
    fetch("/spotify/is-authenticated")
        .then((response) => response.json())
        .then((data) => {
            console.log(data.status);
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
    fetch("/spotify/is-authenticated")
        .then((response) => response.json())
        .then((data) => {
            return data.status
        });
}