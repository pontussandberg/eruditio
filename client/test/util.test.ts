import assert from 'assert';
import {
    everyPred,
    map,
    pipe,
    isString
} from '../src/lib/util';

describe('everyPred', () => {
    const testPred = everyPred(() => true, (x: number) => x > 3);
    it('should return a function', () => {
        assert.ok(typeof testPred === 'function');
    });
    it('should return true if all predicates are true', () => {
        assert.ok(testPred(5));
    });
    it ('should return false is one predicate is false', () => {
        assert.strictEqual(testPred(2), false);
    });
});

describe('map', () => {
    const testMap = map(x => x + 1);
    it('should return a function', () => {
        assert.ok(typeof testMap === 'function');
    });
    it('should apply the function to every element of an array', () => {
        assert.deepStrictEqual(testMap([ 1, 2, 3 ]), [ 2, 3, 4 ]);
    });
});

describe('pipe', () => {
    const testPipe = pipe((x: number) => x - 1, (y: number) => y * 2);
    it('should return a function', () => {
        assert.ok(typeof testPipe === 'function');
    });
    it('should apply the functions left to right to one value', () => {
        assert.strictEqual(testPipe(2), 2);
    });
});

describe('isString', () => {
    const trueStr = 'hello';
    const falseStr = 123;

    it('should return true', () => {
        assert.ok(isString(trueStr));
    });
    it('should return false', () => {
        assert.strictEqual(isString(falseStr), false);
    });
});

