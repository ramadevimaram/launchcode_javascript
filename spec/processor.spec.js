const assert = require('assert');
const processor = require('../processor.js');

describe("transmission processor", function() {

    //  TODO: put tests here
    it("takes a string returns an object", function() {
        let result = processor("9701::<489584872710>");
        assert.strictEqual(typeof result, "object");
    });

    it("returns -1 if '::' not found", function(){
        let result = processor("9701<489584872710>");
        assert.strictEqual(result, -1);
    });

    it("returns id in object", function() {
        let result = processor("9701::<489584872710>");
        assert.notStrictEqual(result.id, undefined);
    });

    it("converts id to a number", function() {
        let result = processor("9701::<489584872710>");
        assert.strictEqual(result.id, 9701);
    });

    it("returns rawDara in object", function() {
        let result = processor("9701::<489584872710>");
        assert.notStrictEqual(result.rawData, undefined);
    });

    it("returns -1 if rawData does NOT start with <", function(){
        let result = processor("9701::489584872710>");
        assert.strictEqual(result, -1);
    });

    it("returns -1 if rawData does NOT end with >", function(){
        let result = processor("9701::<489584872710");
        assert.strictEqual(result, -1);
    });

    it("returns -1 if rawData does NOT start with < and end with >", function(){
        let result = processor("9701::489584872710");
        assert.strictEqual(result, -1);
    });

    it("returns -1 if rawData has more than one >", function(){
        let result = processor("9701::<489589487271>>");
        assert.strictEqual(result, -1);
    });

    it("returns -1 if rawData has more than one <", function(){
        let result = processor("9701::<489589<87271>");
        assert.strictEqual(result, -1);
    });

    it("trims leading whitespace from transmission.", function(){
        let result = processor(" 9701::<48958987271>");
        assert.strictEqual(result.id, 9701);
    });

    it("trims trailing whitespace from transmission.", function(){
        let result = processor("9701::<48958987271> ");
        assert.strictEqual(result.rawData, '<48958987271>');
    });

    it("returns -1 if the id part of the transmission can not be converted to a number.", function(){
        let result = processor("9SS701::<48958987271> ");
        assert.strictEqual(result, -1);
    });

    it("returns -1 if more than one '::' found in transmission", function(){
        let result = processor("9701::<489::58987271>");
        assert.strictEqual(result, -1);
    });

    it("returns -1 for value of rawData if anything besides numbers are present", function(){
        let result = processor("9701::<4s895887271>");
        assert.strictEqual(result, -1);
    });

    it("returns -1 for value of rawData if anything besides numbers are present", function(){
        let result = processor("9701::<4S895887271>");
        assert.strictEqual(result, -1);
    });

    it("returns -1 for value of rawData if anything besides numbers are present", function(){
        let result = processor("9701::<4-895887271>");
        assert.strictEqual(result, -1);
    });

    // Excluded last extra requirement (5).

});
