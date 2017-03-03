const expect = require('expect');
const smartArrays = require('..');

describe('smartArrays.flatten()', () => {
    it('should not modify an already flat array', () => {
        const arr = [ 0, 1, 2, 3 ];

        const flattened = smartArrays.flatten(arr);
        // Confirm size is preserved
        expect(flattened.length).toBe(arr.length);
        // Confirm values are the same
        arr.forEach((v, i) => expect(flattened[i]).toBe(v));
    });

    it('should flatten multiple levels of nesting', () => {
        const arr = [ 0, [ [ 1 ], 2 ], [ [ [ 3 ] ] ] ];
        const expectedResult = [ 0, 1, 2, 3 ];

        const flattened = smartArrays.flatten(arr);
        // Confirm expected size
        expect(flattened.length).toBe(expectedResult.length);
        // Confirm expected result values
        expectedResult.forEach((v, i) => expect(flattened[i]).toBe(v));
    });
});

describe('smartArrays.groupBy()', () => {
    it('should group elements by value by default', () => {
        const arr = [ 0, 1, 2, 3, 0, 1 ];
        const expectedResult = {
            0: [ 0, 0 ],
            1: [ 1, 1 ],
            2: [ 2 ],
            3: [ 3 ]
        };

        const grouped = smartArrays.groupBy(arr);
        // Comnfirm number of groups
        expect(Object.keys(grouped).length).toBe(4);

        Object.entries(expectedResult).forEach(([ key, values ]) => {
            // Confirm groups length
            expect(grouped[key].length).toBe(values.length);
            // Confirm groups values
            values.forEach((v, i) => expect(grouped[key][i]).toEqual(v));
        });
    });

    it('should group elements given a specific function', () => {
        const arr = [
            { name: 'Luke', job: 'Jedi' },
            { name: 'Yoda', job: 'Jedi' },
            { name: 'Vador', job: 'Sith' }
        ];
        const expectedResult = {
            'Jedi': [
                { name: 'Luke', job: 'Jedi' },
                { name: 'Yoda', job: 'Jedi' }
            ],
            'Sith': [
                { name: 'Vador', job: 'Sith' }
            ]
        };

        const grouped = smartArrays.groupBy(arr, (c => c.job));
        // Comnfirm number of groups
        expect(Object.keys(grouped).length).toBe(2);

        Object.entries(expectedResult).forEach(([ key, values ]) => {
            // Confirm groups length
            expect(grouped[key].length).toBe(values.length);
            // Confirm groups values
            values.forEach((v, i) => expect(grouped[key][i]).toEqual(v));
        });
    });
});

describe('smartArrays.range()', () => {
    it('should start with 0 for a single argument', () => {
        const expectedResult = [ 0, 1, 2, 3 ];

        const range = smartArrays.range(4);
        // Confirm expected result size
        expect(range.length).toBe(expectedResult.length);
        // Confirm expected result values
        expectedResult.forEach((v, i) => expect(range[i]).toBe(v));
    });

    it('should accept a value to start from', () => {
        const expectedResult = [ 3, 4, 5, 6 ];

        const range = smartArrays.range(3, 7);
        // Confirm expected result size
        expect(range.length).toBe(expectedResult.length);
        // Confirm expected result values
        expectedResult.forEach((v, i) => expect(range[i]).toBe(v));
    });

    it('should return an empty array if end is not greater than start', () => {
        const expectedResult = [];

        const range = smartArrays.range(3, 0);
        // Confirm expected result size
        expect(range.length).toBe(expectedResult.length);
        // Confirm expected result values
        expectedResult.forEach((v, i) => expect(range[i]).toBe(v));
    });
});

describe('smartArrays.uniq()', () => {
    it('should remove duplicates by strict equality by default', () => {
        const arr = [ 0, 1, 0, 1, 2, 3, 3, 2 ];
        const expectedResult = [ 0, 1, 2, 3 ];

        const uniq = smartArrays.uniq(arr);
        // Confirm expected result size
        expect(uniq.length).toBe(expectedResult.length);
        // Confirm expected result values
        expectedResult.forEach((v, i) => expect(uniq[i]).toBe(v));
    });

    it('should remove duplicates given a function', () => {
        const arr = [
            { name: 'Luke', job: 'Jedi' },
            { name: 'Yoda', job: 'Jedi' },
            { name: 'Vador', job: 'Sith' }
        ];
        const expectedResult = [
            { name: 'Luke', job: 'Jedi' },
            { name: 'Vador', job: 'Sith' }
        ];

        const uniq = smartArrays.uniq(arr, (c => c.job));
        // Confirm expected result size
        expect(uniq.length).toBe(expectedResult.length);
        // Confirm expected result values
        expectedResult.forEach((v, i) => expect(uniq[i]).toEqual(v));
    });
});

describe('smartArrays.without()', () => {
    it('should correctly remove any number of value instances', () => {
        const arr = [ 0, 0, 0, 0, 0, 0 ];
        const expectedResult = [];

        const without = smartArrays.without(arr, 0);
        // Confirm expected result size
        expect(without.length).toBe(expectedResult.length);
    });

    it('should correctly remove any number of values', () => {
        const arr = [ 0, 1, 0, 2, 0, 3 ];
        const expectedResult = [];

        const without = smartArrays.without(arr, 0, 1, 2, 3);
        // Confirm expected result size
        expect(without.length).toBe(expectedResult.length);
    });

    it('should not try to remove missing values', () => {
        const arr = [ 0, 1, 0, 2, 0, 3 ];
        const expectedResult = [ 1, 2, 3 ];

        const without = smartArrays.without(arr, 0, 4, 5);
        // Confirm expected result size
        expect(without.length).toBe(expectedResult.length);
        // Confirm expected result values
        expectedResult.forEach((v, i) => expect(without[i]).toBe(v));
    });
});
