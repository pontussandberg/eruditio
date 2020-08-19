/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const everyPred = (...preds : Array<CallableFunction>) => (x: any): boolean => preds.every(pred => pred(x));

type mapper = (value: any, index: number, array: Array<any>) => any;

const map = (fn: mapper) => (xs: Array<any>): Array<any> => xs.map(fn);

const pipe = (...fns: Array<CallableFunction>) => (value: any): any => fns.reduce((x, fn) => fn(x), value);

const isString = (x: any): boolean => typeof x === 'string';

export {
    everyPred,
    map,
    pipe,
    isString
};
