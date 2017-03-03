/**
 * Flatten an array of possibly nested arrays
 * @param  {Array} arr
 * @return {Array}
 */
function flatten(arr) {
    return arr.reduce(
        (acc, elem) => acc.concat(
            Array.isArray(elem) ? flatten(elem) : elem
        ),
        []
    );
}

/**
 * Group the elements of <arr> in an object using the
 * <getElemGroup> criterion
 * @param  {Array} arr
 * @param  {?Function} getElemGroup
 *     Method used to generate the group name for the current element
 * @return {Object}
 */
function groupBy(arr, getElemGroup = (x => x)) {
    return arr.reduce((groups, el) => {
        const group = getElemGroup(el);

        groups[group] = (groups[group] || []).concat(el);
        return groups;
    }, {});
}

/**
 * Create an array of numbers progressing from <start> up to,
 * but not including, <end>.
 * If <end> is not specified, it's set to <start> with <start> then set to 0.
 * @param  {Number}  [start=0]
 * @param  {?Number} end
 * @return {Array}
 */
function range(start = 0, end) {
    if (typeof end == 'undefined') {
        end = start;
        start = 0;
    }

    const length = Math.max(end - start, 0);
    return Array.from(new Array(length), (v, i) => i + start);
}

/**
 * Filter <arr> to remove duplicates based on a <getElemValue>
 * function to test for a specific value
 * If <getElemValue> is not passed, test for strict elements equality
 * @param  {Array}     arr
 * @param  {?Function} getElemValue
 *     Method used for elements comparison
 * @return {Array}
 */
function uniq(arr, getElemValue = (x => x)) {
    return arr.filter((el, firstPosition, _arr) => {
        return _arr.findIndex(
            _el => getElemValue(el) === getElemValue(_el)
        ) == firstPosition;
    });
}

/**
 * Return <arr> with all extra <values> removed
 * @param  {Array} arr
 * @param  {?Any}  values
 * @return {Array}
 */
function without(arr, ...values) {
    return arr.filter(value => values.indexOf(value) == -1);
}

module.exports = {
    flatten,
    groupBy,
    range,
    uniq,
    without
};
