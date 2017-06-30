const RESOLVE_URL = 'http://api.soundcloud.com/resolve?url=';

class Player {
    constructor(clientId) {
        this.clientId = clientId;
        this.audio = document.createElement('audio');
        this.playing = false;
        this.events = {};
        this.shuffled = false;
    }

    setPlaylist(playlist) {
        this.playlist = playlist;
        this.unshuffledPlaylist = playlist.slice();
        this.currentIndex = 0;
        this.currentTrack = this.playlist[this.currentIndex];
        // this.audio.src = `${this.currentTrack.stream_url}?client_id=${this.clientId}`;
    }

    _fetch(url) {
        return fetch(`${RESOLVE_URL}${url}&client_id=${this.clientId}`, { mode: 'cors' }).then(function (response) {
            return response.json();
        });
    }

    resolve(url) {
        return new Promise((resolve, reject) => {
            this._fetch(url)
                .then((response) => {
                    if (response.errors) {
                        reject(response.errors);
                        return;
                    }

                    if (response.kind === 'playlist') {
                        this.setPlaylist(response.tracks);
                    }

                    // TODO: response.kind === track

                    resolve();
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    }

    static _shuffleArray(array) {
        let counter = array.length;
        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);
            counter--;
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }

    shuffle() {

        // if shuffled already, change playlist to original unshuffled playlist
        if (this.shuffled) {
            this.playlist = this.unshuffledPlaylist.slice();
            this.currentIndex = this.playlist.indexOf(this.currentTrack);
            this.shuffled = false;
        } else {
            // else let's shuffle playlist and grab new currentIndex of currentTrack
            this.playlist = Player._shuffleArray(this.playlist);
            this.currentIndex = this.playlist.indexOf(this.currentTrack);
            if (this.currentIndex !== 0) {
                let temp = this.playlist[0];
                this.playlist[0] = this.playlist[this.currentIndex];
                this.playlist[this.currentIndex] = temp;
                this.currentIndex = 0;
            }
            this.shuffled = true;
        }
    }

    play(options) {
        options = options || {};

        let src;

        if (options.streamUrl) {
            src = options.streamUrl;
        } else if (this.playlist && options.playlistIndex >= 0) {
            let length = this.playlist.length;
            if (length) {
                this.currentIndex = options.playlistIndex || 0;

                // be silent if index is out of range
                if (this.currentIndex >= length || this.currentIndex < 0) {
                    this.currentIndex = 0;
                    return;
                }
                this.currentTrack = this.playlist[this.currentIndex];
                src = this.playlist[this.currentIndex].stream_url;
            }
        } else if (this.currentTrack) {
            src = this.currentTrack.stream_url;
        }

        if (!src) {
            throw new Error('No src for play!');
        }

        src = `${src}?client_id=${this.clientId}`;

        if (src !== this.audio.src) {
            this.audio.src = src;
        }

        this.playing = true;
        this.audio.play();
    }

    preloadNext() {

        // let nextSrc = document.createElement('audio');
        if (this.playing) {
            this.currentIndex++;
            if (this.currentIndex >= this.playlist.length) {
                this.currentIndex = 0;
            }
            this.audio.src = `${this.playlist[this.currentIndex].stream_url}?client_id=${this.clientId}`;
        } else {
            this.audio.src = `${this.currentTrack.stream_url}?client_id=${this.clientId}`;
        }
    }

    pause() {
        this.playing = false;
        this.audio.pause();
    }

    previous() {
        return new Promise((resolve) => {
            this.currentIndex--;
            if (this.currentIndex < 0) {
                this.currentIndex = this.playlist.length - 1;
            }
            this.currentTrack = this.playlist[this.currentIndex];
            // this.audio.src = `${this.currentTrack.stream_url}?client_id=${this.clientId}`;
            resolve(this.currentTrack.stream_url);
        });
    }

    next() {
        return new Promise((resolve) => {
            this.currentIndex++;
            if (this.currentIndex >= this.playlist.length) {
                this.currentIndex = 0;
            }
            this.currentTrack = this.playlist[this.currentIndex];
            // this.audio.src = `${this.currentTrack.stream_url}?client_id=${this.clientId}`;
            resolve(this.currentTrack.stream_url);
        });
    }

    on(e, fn) {
        this.events[e] = fn;
        this.audio.addEventListener(e, fn, false);
    }

    off(e, fn) {
        this.events[e] = null;
        this.audio.removeEventListener(e, fn);
    }

    unbindAll() {
        for (let e in this.events) {
            let fn = this.events[e];
            if (fn) {
                this.off(e, fn);
            }
        }
    };

    seek(value) {
        this.audio.currentTime = value;
    }

    setVolume(value) {
        this.audio.volume = value;
    }
}


export default Player;
