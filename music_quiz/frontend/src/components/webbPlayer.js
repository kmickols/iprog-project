import {setDevice} from "./spotify";

export function onSpotifyWebPlaybackSDKReady(token) {
    const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => {
            cb(token);
        }
    });
    // Error handling
    player.addListener('initialization_error', ({message}) => {
    });
    player.addListener('authentication_error', ({message}) => {
    });
    player.addListener('account_error', ({message}) => {

    });
    player.addListener('playback_error', ({message}) => {
    });

    // Playback status updates
    player.addListener('player_state_changed', state => {
    });

    // Ready
    player.addListener('ready', ({device_id}) => {
        setDevice(device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({device_id}) => {
    });

    // Connect to the player!
    player.connect();

    return 1
}
