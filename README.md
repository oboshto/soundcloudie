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
4. Let's parse some stuff and play with it
```js
player.resolve('https://soundcloud.com/parrkssquares/sets/against-illusions-and-reality-1')
.then(() => player.play());
player.previous();
// etc
```