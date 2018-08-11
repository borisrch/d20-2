var chai = require('chai');
var assert = chai.assert;

var rollattack = require('../rollattack');
var roll = rollattack.roll;

describe('roll() function, n = 20', function () {
    
  var result = roll(20);

  it('should be a number', function () {
        assert.isNumber(result, 'result is a number');
    });

  it('should be at least 1', function () {
        assert.isAtLeast(result, 1, 'result is >= 1');
    });

  it('should be at least 1', function () {
        assert.isAtMost(result, 20, 'result is <= 20');
    });  

});

var attack = rollattack.attack;

describe('attack() function, p.dmg = 8, m.ac = 0', function () {
    
    var result = attack(8, 0, 0, 1, 0);
  
    it('should be a number.', function () {
        assert(typeof result === 'number', 'result is number.');
    });
    it('should be <= 8', function () {
        assert.isAtMost(result, 8, 'result is <= 8');
    })
  
});

describe('attack() function with m.ac, p.dmg = 8, m.ac = 10', function () {
    
    var result = attack(8, 0, 0, 1, 10);
  
    it('should be a number or null (object).', function () {
        assert(typeof result === 'number' || typeof result === 'object', 'result is number or null.');

        if (typeof result === 'number') {
            it('should be <= 8', function () {
                assert.isAtMost(result, 8, 'result is <= 8');
            })
        }

      });
  
});

var bonus = rollattack.bonus;

describe('bonus() function, r = 5, n = 2', function () {
    var r = 5;
    var n = 2;
    var result = bonus(r, n);

    it('should be at least n', function () {
        assert.isAtLeast(result, n, 'is atleast n');
    })
    it('should be at most r * n', function () {
        assert.isAtMost(result, r*n, 'is at most r*n');
    })
})