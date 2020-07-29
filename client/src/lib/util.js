const everyPred = (...preds) => x => preds.every(pred => pred(x))

const map = fn => xs => xs.map(fn)

const pipe = (...fns) => value => fns.reduce((x, fn) => fn(x), value)

const isString = x => typeof x === 'string'

export {
    everyPred,
    map,
    pipe,
    isString
}