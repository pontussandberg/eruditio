import { everyPred, isString } from './util.js';

const containsAlpha = str => /[a-z]/i.test(str);

export default fields =>
    Object
        .values(fields)
        .every(everyPred(isString, containsAlpha));
