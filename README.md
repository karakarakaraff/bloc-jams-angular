# Bloc Jams Angular

Bloc Jams Angular is a streaming music web app that puts all of your favorite tunes in an easy-to-use library. This project is a reworked version of the original [Bloc Jams](https://github.com/karakarakaraff/bloc-jams). Read a case study about building this project on my portfolio website at [karaflaherty.com: Bloc Jams](http://karaflaherty.com/bloc-jams-streaming-music-website-and-web-app/). 

### Music library
All items in the music library are organized through the `app/services/Fixtures.js` file. Each album is its own object, with the album cover and songs saved in `assets/images/album_covers` and `assets/music` respectively. All album information must be filled out following this format:
```javascript
var albumPicasso = {
  title: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: '/assets/images/album_covers/01.png',
  songs: [
    { title: 'Blue', duration: 161.71, audioUrl: '/assets/music/blue' },
    { title: 'Green', duration: 103.96, audioUrl: '/assets/music/green' },
    { title: 'Red', duration: 268.45, audioUrl: '/assets/music/red' },
    { title: 'Pink', duration: 153.14, audioUrl: '/assets/music/pink' },
    { title: 'Magenta', duration: 374.22, audioUrl: '/assets/music/magenta' }
  ]
};
```
_Please note: Song duration is written in seconds. This is required for proper formatting of time played/time remaining in the player bar._

### Album collection
Which albums and how many albums show up on the collection page is entirely optional. 

In `app/controllers/CollectionCtrl.js`, find the line below and change the number to how many albums should be displayed. The default number is 12:
```javascript
this.albums = Fixtures.getCollection(12);
```

This line is connected to the `app/services/Fixtures.js` file, like so:
```javascript
Fixtures.getCollection = function(numberOfAlbums) {
  var displayedAlbums = [];
  for (var i = 0; i < numberOfAlbums; i++) {
    displayedAlbums.push(albumPicasso);
  }
  return displayedAlbums;
};
```

As it is written now, Pablo Picasso's album "The Colors" is displayed 12 times by default. Adding more albums to `app/services/Fixtures.js` in the proper format and reworking this function can change the collection page's behavior to display each album once.

### Buzz! library
Bloc Jams Angular relies on the [Buzz! library](https://buzz.jaysalvat.com/) to play and pause music. A number of Buzz methods manage audio file playback, inlcuding `.play()`, `.pause()`, `.stop()`, `isPaused()`, etc. Many of these methods are used in `app/services/SongPlayer.js`, such as:
```javascript
var playSong = function(song) {
  currentBuzzObject.play();
  song.playing = true;
};
```

---
This project was built for [Bloc's Web Development Program](https://www.bloc.io/).
