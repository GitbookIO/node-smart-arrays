# smart-arrays

A collection of Array utilities with no dependencies.

## Install

```bash
$ npm i smart-arrays
```

## Use

```js
const smartArrays = require('smart-arrays');
```

## API

#### #flatten

```js
/**
 * Flatten an array of possibly nested arrays
 * @param {Array} arr
 * @return {Array}
 */

const arr = [ 0, [ 1, [ 2 ] ], [ 3 ] ];
const flattened = smartArrays.flatten(arr);
// [ 0, 1, 2, 3 ]
```

#### #groupBy

```js
/**
 * Group the elements of <arr> in an object using the
 * <getElemGroup> criterion
 * @param {Array} arr
 * @param {?Function} getElemGroup
 * Method used to generate the group name for the current element
 * @return {Object}
 */

// Simple
const arr = [ 0, 1, 2, 3, 0, 1 ];
const groups = smartArrays.groupBy(arr);
// {
//     0: [ 0, 0 ],
//     1: [ 1, 1 ],
//     2: [ 2 ],
//     3: [ 3 ]
// }


// With getElemGroup method
const arr = [
    { name: 'Luke', job: 'Jedi' },
    { name: 'Yoda', job: 'Jedi' },
    { name: 'Vador', job: 'Sith' }
];
const groups = smartArrays.groupBy(arr, (c => c.job));
// {
//     'Jedi': [
//         { name: 'Luke', job: 'Jedi' },
//         { name: 'Yoda', job: 'Jedi' }
//     ],
//     'Sith': [
//         { name: 'Vador', job: 'Sith' }
//     ]
// }
```

#### #range

```js
/**
 * Create an array of numbers progressing from <start> up to,
 * but not including, <end>.
 * If <end> is not specified, it's set to <start> with <start> then set to 0.
 * @param {Number} [start=0]
 * @param {?Number} end
 * @return {Array}
 */

const range = smartArrays.range(4);
// [0, 1, 2, 3]

const range = smartArrays.range(3, 7);
// [3, 4, 5, 6]
```

#### #uniq

```js
/**
 * Filter <arr> to remove duplicates based on a <getElemValue>
 * function to test for a specific value
 * If <getElemValue> is not passed, test for strict elements equality
 * @param {Array} arr
 * @param {?Function} getElemValue
 * Method used for elements comparison
 * @return {Array}
 */

// Simple
const arr = [ 0, 1, 0, 1, 2, 3, 3, 2 ];
const uniq = smartArrays.uniq(arr);
// [ 0, 1, 2, 3 ]


// With getElemValue method
const arr = [
    { name: 'Luke', job: 'Jedi' },
    { name: 'Yoda', job: 'Jedi' },
    { name: 'Vador', job: 'Sith' }
];
const uniq = smartArrays.uniq(arr, (c => c.job));
// [
//     { name: 'Luke', job: 'Jedi' },
//     { name: 'Vador', job: 'Sith' }
// ]
```

#### #without

```js
/**
 * Return <arr> with all extra <values> removed
 * @param {Array} arr
 * @param {?Any} values
 * @return {Array}
 */

const arr = [ 0, 1, 0, 2, 0, 3 ];
const without = smartArrays.without(arr, 0, 1, 2, 3);
// []

const without = smartArrays.without(arr, 0, 4, 5);
// [ 1, 2, 3 ]
```
