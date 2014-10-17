# mixem

mixem, *mix 'em*, is a module that mixes prototypes into a target prototype as a form of inheritance via decoration.

[![Build Status](https://travis-ci.org/tur-nr/node-mixem.svg?branch=master)](https://travis-ci.org/tur-nr/node-mixem)

### Example

```js
var mixem = require('mixem');

// mixer "class"
function Mixer() { }

Mixer.prototype.bar = function() {
  return 'bar';
};

// target "class"
function Target() { }

Target.prototype.foo = function() {
  return 'foo';
};

// mix 'em
mixem(Target, Mixer);

// use
var instance = new Target();

console.log(instance.foo()); // "foo"
console.log(instance.bar()); // "bar"
```

## Installation

### Node

To install `mixem` in a Node application use npm.

```
$ npm install mixem
```

### Browser

No tests available for the browser but you may try using it via [webpack](https://github.com/webpack/webpack).

```
$ webpack index.js mixem.js
```

## Test

To run tests use npm.

```
$ npm install
$ npm test
```

## Documentation

### Basic Usage

`mixem` can be used to create multiple inheritance with only a single prototype chain. Unlike `inherits` it doesn't create nested prototypes. `mixem` simple borrows/mixes given prototypes on to a base prototype.

```js
var Emitter = require('events').EventEmitter;

function MixerOne() { }
MixerOne.prototype.somethingElse = function() { };

function MixerTwo() { }
MixerTwo.prototype.anotherThing function() { };

function Base() {
  Emitter.call(this);
  MixerOne(this);
  MixerTwo(this);
}
Base.prototype.something = function() { };

mixem(Base, Emitter, MixerOne, MixerTwo);

var instance = new Base();

isntance.something(); // Base
instance.somethingElse(); // MixerOne
instance.anotherThing(); // MixerTwo
instance.emit('init'); // EventEmitter
```

### Caveats

#### Method Priority

`mixem` doesn't follow the same merge procedure of `extend`. If a method already exists on a prior prototype within the given arguments it will **not** be overwritten.

```js
function Base() { }
Base.prototype.foo = function () { return 'from base'; };

function Mix() { }
Mix.prototype.foo = function () { return 'from mix'; };

mixem(Base, Mix);

var instance = new Base();

console.log(instance.foo()); // "from base"
```

#### Natives 

Unfortuntely it doesn't work with natives like `Array`s. In order to inherit from native types just follow the usual way.

```js
function Base() { }

Base.prototype = [];
Base.prototype.constructor = Base;
```

#### Strict Constructors

If a constructor implements a "strict" context check you won't be able to call the constructor and bind the instance.

```js
function StrictMixer() {
  if (!(this instanceof StrictMixer)) {
    return new StrictMixer();
  } 
}

function Base() {
  StrictMixer.call(this); // this won't work
}

mixem(Base, StrictMixer);
``` 

Mixings will still be copied and usable however the constructor won't be abe to initialise the instance correctly.  

## API

#### mixem(*&lt;Base&gt;*, *[Mix...]*)

## License

[MIT](LICENSE)

Copyright (c) 2014 [Christopher Turner](https://github.com/tur-nr)
