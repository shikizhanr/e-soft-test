import { isValid } from './brackets';

const cases: [string, boolean][] = [
    ['', true],
    ['()', true],
    ['()[]{}', true],
    ['{[]}', true],
    ['(]', false],
    ['([)]', false],
    ['(((', false],
    [')', false],
];

for (const [input, expected] of cases) {
    console.assert(isValid(input) === expected, `failed on: "${input}"`);
}

console.log('OKKK');