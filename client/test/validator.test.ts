import assert from 'assert';
import validator from '../src/lib/validator';

describe('Validator', () => {
    it('should return true if all fields contain an alphabetical character', () => {
        const fields = {
            a: 'bah',
            b: 'potato',
        };
        assert.ok(validator(fields));
    });

    it('should return false if not all fields contain an alphabetical character', () => {
        const fields = {
            a: 'bah',
            b: '.',
        };
        assert.strictEqual(validator(fields), false);
    });
});
