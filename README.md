# soundcloudie [![npm version](https://badge.fury.io/js/soundcloudie.svg)](http://badge.fury.io/js/soundcloudie) ![npm dependencies](https://david-dm.org/oboshto/soundcloudie.svg)

[soundcloudie](https://github.com/oboshto/soundcloudie/blob/master/src/soundcloudie.js ) will help you parse stuff from Soundcloud audio tracks and playlists 🎶. Resolve URL and get data from audio stream with useful methods.

## Quick Start
1. Install via npm
```js
npm install soundcloudie
```
2. Import soundcloudie
```js
const Soundcloudie = require('soundcloudie');
```
3. Create a new object
```js
let player = new Soundcloudie('CLIENT_ID')
```
4. Let's parse some stuff and play it
```js
player.resolve('https://soundcloud.com/parrkssquares/sets/against-illusions-and-reality-1')
.then(() => player.play());
// etc
```

## Client ID
Client id is a necessary for working with soundcloud API.  
Grab it from [soundcloud](http://soundcloud.com/you/apps/new).

## API
#### resolve('url')
Parse data from url and set a playlist to `playlist` property.

#### play()
Plays current playlist song.

#### pause()
Pauses current playlist song.

#### stop()
Stops current playlist song.

#### next()
Increments current playlist song and play it.

#### previous()
Decrements current playlist song and play it.

#### shuffle()
Shuffles/unshuffles playlist. 

#### preloadNext()
Preloads next song from playlist.

#### seek(value)
Changes current time of song to `value` second.

#### setVolume(value)
Changes audio volume to `value`. _(from 0 to 1)_


### Properties
#### `audio`
[HTML audio element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement)

#### `playing`
Audio playing status. _(true or false)_

#### `playlist`
Parsed playlist from soundcloud. _(It's may be shuffled)_

#### `shuffled`
Is the playlist shuffled. _(true or false)_

#### `unshuffledPlaylist`
Origin unshuffled playlist.

#### `currentTrack`
Current track from playlist.

#### `currentIndex`
Current track index from playlist.

### Events
You can handle any of [media event](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events). 
#### on('mediaEvent', handler)
#### off('mediaEvent', handler)
Adds/removes event handler for `mediaEvent`.

#### unbindAll()
Unbinds all event handlers.

## Example
```js
const Soundcloudie = require('soundcloudie');
let player = new Soundcloudie('CLIENT_ID')
player.resolve('https://soundcloud.com/parrkssquares/sets/against-illusions-and-reality-1')
  .then(() => player.shuffle());

player.on('canplay', () => {
  player.play()
});
player.on('ended', () => {
  player.next();
});
```


## License

MIT Licensed

Copyright (c) 2017, Alexey Makhyanov (oboshto@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.