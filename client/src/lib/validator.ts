import { everyPred, isString } from './util';

const containsAlpha = (str: string): boolean => /[a-z]/i.test(str);

export default (fields: Record<string, string>): boolean =>
    Object
        .values(fields)
        .every(everyPred(isString, containsAlpha));
