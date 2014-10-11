var isval = require('isval')
  , extend = require('extend')
  , slice = require('sliced');

module.exports = function mixem() {
  var args = slice(arguments)
    , base = args.shift()
    , mixed = {};

  if (!isval(base, 'function')) {
    throw new TypeError('base must be a constructor Function');
  } 

  for (var i = args.length - 1; i >= 0 ; --i) {
    if (!isval(args[i], 'function')) {
      throw new TypeError('mixers must be a constructor Function');
    } 

    for (var k in args[i].prototype) {
      if (typeof base.prototype[k] === 'undefined' && !mixed[k]) {
        mixed[k] = args[i].prototype[k]; 
      }
    }
  }
  
  extend(base.prototype, mixed);

  return base;
};
