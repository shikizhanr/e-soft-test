import { deepClone } from './deepClone';

class User {
    constructor(public name: string) {}
    greet() {
        return `Hi, ${this.name}`;
    }
}

const sym = Symbol('id');

const original: any = {
    num: 42,
    nested: { arr: [1, { a: 2 }] },
    date: new Date('2026-01-01'),
    map: new Map([[{ k: 1 }, { v: 2 }]]),
    set: new Set([{ item: 3 }]),
    user: new User('Alice'),
    fn: () => 'ok',
    [sym]: 'secret',
};
original.self = original;

const copy = deepClone(original);

// Вложенность
copy.nested.arr[1].a = 999;
console.assert(original.nested.arr[1].a === 2, 'nested failed');

// Date, Map, Set
console.assert(copy.date !== original.date && copy.date.getTime() === original.date.getTime(), 'date failed');
const [[ok, ov]] = [...original.map];
const [[ck, cv]] = [...copy.map];
console.assert(ck !== ok && cv !== ov, 'map failed');
console.assert([...copy.set][0] !== [...original.set][0], 'set failed');

// Прототип, функции, символы, цикл
console.assert(copy.user instanceof User && copy.user.greet() === 'Hi, Alice', 'prototype failed');
console.assert(copy.fn() === 'ok', 'fn failed');
console.assert(copy[sym] === 'secret', 'symbol failed');
console.assert(copy.self === copy && copy.self !== original, 'cycle failed');

console.log('OKKK');