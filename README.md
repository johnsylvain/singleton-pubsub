# Singleton Pubsub
[![Travis](https://img.shields.io/travis/johnsylvain/singleton-pubsub.svg)](https://travis-ci.org/johnsylvain/singleton-pubsub)
[![npm](https://img.shields.io/npm/v/singleton-pubsub.svg)](https://npmjs.org/package/singleton-pubsub)
![dependancies](https://img.shields.io/badge/dependancies-zero-brightgreen.svg)
> A performant Pub/Sub interface wrapped in a singleton

## Features
- Super tiny (~210b g-zipped)
- Zero dependancies
- Small API with method chaining
- Singleton impletation for usage in large applications
- Create multiple functions for a single event

## Installation
```bash
# via yarn
yarn add singleton-pubsub

# via npm
npm install singleton-pubsub --save
```
#### or via [download](https://raw.githubusercontent.com/johnsylvain/singleton-pubsub/master/index.js)
```html
<script src="path/to/singleton-pubsub.js"></script>
```

## Usage
```js
import SingletonPubsub from 'singleton-pubsub'

const pubsub = new SingletonPubsub();

// Subscribe to events via handlers
pubsub
  .on('load', ({ message }) => {
    console.log(message) // => 'loaded!'
  })
  .on('event', (data) => {
    console.log(data)
  })

// Emit (publish) events
pubsub
  .emit('load', {
    message: 'loaded!'
  })

// Unsubscribe from an event
const onEvent = (data) => console.log(data)

pubsub
  .on('event', onEvent)
  .off('event', onEvent)

// Creating a new instance will give access to the same events
const pubsub2 = new SingletonPubsub()

pubsub2
  .emit('load', {
    message: 'pubsub2 works!'
  })


// Create a new clean instance in the same application
const cleanPubsub = new SingletonPubsub({
  reinstantiate: true
})
```


## Contributing
You can request a new feature by submitting an issue. If you would like to implement a new feature feel free to issue a Pull Request.

## License
singleton-pubsub is protected under the [MIT License](https://github.com/johnsylvain/singleton-pubsub/blob/master/LICENSE)