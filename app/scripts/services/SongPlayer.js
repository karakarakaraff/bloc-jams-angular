(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};

        // PRIVATE ATTRIBUTES

        /**
         * @desc Store the information of the currently chosen album
         * @type {Object}
         */
        var currentAlbum = Fixtures.getAlbum();

        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;

        // PRIVATE FUNCTIONS

        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
        };

        /**
         * @function playSong
         * @desc Plays the audio file of currentBuzzObject and changes the song's status to playing
         * @param {Object} song
         */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        /**
         * @function stopSong
         * @desc Stops the audio file of currentBuzzObject and removes the song's playing status
         * @param {Object} song
         */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        };

        /**
         * @function getSongIndex
         * @desc Get the index of the chosen song from the array of songs on the current album
         * @param {Object} song
         */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        // PUBLIC ATTRIBUTES

        /**
         * @desc Active song object from list of songs
         * @type {Object}
         */
        SongPlayer.currentSong = null;

        // PUBLIC FUNCTIONS

        /**
         * @function SongPlayer.play
         * @desc Play current or new song
         * @param {Object} song
         */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        /**
         * @function SongPlayer.pause
         * @desc Pause current song
         * @param {Object} song
         */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
         * @function SongPlayer.previous
         * @desc Stop the currently playing song and play the previous song (function does not cycle, so there is no prevous song for the first song -- music will simply stop)
         * @param {Object} song
         */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
         * @function SongPlayer.next
         * @desc Stop the currently playing song and play the next song (function does not cycle, so there is no next song for the last song -- music will simply stop)
         * @param {Object} song
         */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex > currentAlbum.songs.length - 1) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
