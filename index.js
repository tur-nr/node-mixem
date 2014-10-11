var isval = require('isval')
  , extend = require('extend')
  , slice = require('sliced');

module.exports = function mixem() {
  var args = slice(arguments)
    , base = args.shift()
    , mixed = {}
    , keys;

  if (!isval(base, 'function')) {
    throw new TypeError('base must be a constructor Function');
  } 

  for (var i = args.length - 1; i >= 0 ; --i) {
    if (!isval(args[i], 'function')) {
      throw new TypeError('mixers must be a constructor Function');
    } 

    keys = Object.getOwnPropertyNames(args[i].prototype);

    for (var k = keys.length - 1; k >= 0; --k) {
      if (isval(base.prototype[keys[k]], 'undefined') && !mixed[keys[k]]
          && keys[k] !== 'constructor') {
        mixed[keys[k]] = args[i].prototype[keys[k]]; 
      } 
    }
  }
  
  extend(base.prototype, mixed);

  return base;
};
