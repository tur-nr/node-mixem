var mixem = require('../')
  , assert = require('assert');

describe('#mixem()', function() {
  it('should throw TypeError if base not constructor', function() {
    var except = /base/;

    assert.throws(function() { mixem(); }, except);
    assert.throws(function() { mixem(null); }, except);
    assert.throws(function() { mixem(false); }, except);
    assert.throws(function() { mixem(0); }, except);
    assert.throws(function() { mixem(''); }, except);
    assert.throws(function() { mixem(/a/); }, except);
    assert.throws(function() { mixem([]); }, except);
    assert.throws(function() { mixem({}); }, except);
    assert.throws(function() { mixem(NaN); }, except);
  });

  it('should return base', function() {
    function Test() {}

    assert.strictEqual(mixem(Test), Test);
    assert.strictEqual(mixem(Test, Array), Test);
  });

  it('should throw TypeError if mixer is not a constructor', function() {
    var except = /mixers/;

    function Test() {}

    assert.throws(function() { mixem(Test, null); }, except);
    assert.throws(function() { mixem(Test, false); }, except);
    assert.throws(function() { mixem(Test, 0); }, except);
    assert.throws(function() { mixem(Test, ''); }, except);
    assert.throws(function() { mixem(Test, /a/); }, except);
    assert.throws(function() { mixem(Test, []); }, except);
    assert.throws(function() { mixem(Test, {}); }, except);
    assert.throws(function() { mixem(Test, NaN); }, except); 
  });

  it('should mix prototype methods onto base', function() {
    var instance;

    function Test() {}
    function Mix() {}

    Mix.prototype.foo = function() {
      return 'bar';
    };

    mixem(Test, Mix);
    instance = new Test();
    
    assert.equal(typeof instance.foo, 'function');
    assert.equal(instance.foo(), 'bar');
  });

  it('should not overwrite methods', function() {
    var instance;

    function Test() {}

    Test.prototype.foo = function() {
      return 'bar';
    };

    function Mix() {}

    Mix.prototype.foo = function() {
      return 'baz';
    };

    mixem(Test, Mix);
    instance = new Test();

    assert.equal(instance.foo(), 'bar');
    assert.notEqual(instance.foo(), 'baz');
  });
});
