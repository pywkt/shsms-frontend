/**
 * @param {array} arr Array of objects to be sorted.
 * @param {string} key Key in each object to use for sorting.
 * @param {bool} isDate Are you sorting items by a Date?
 * @returns A sorted version of the original array in ascending order
 */

export const sortArrayOfObjects = (arr, key, isDate) => arr.sort((a, b) => isDate ? new Date(b[key]) - new Date(a[key]) : b[key] - a[key])

/**
 * 
 * @param {array} arr Array of objects to be grouped
 * @param {string} key Key in each object to use for grouping
 * @returns An object with an object where each key is the 'key' parameter passed in. The value of each key will be an
 * array of objects containing the grouped data. This function's primary use is for taking messages and grouping 
 * them by the sending/receiving phone numbers.
 */
export const groupArrayOfObjects = (arr, key) => {
    return arr.reduce((res, obj) => {
        const val = obj[key]
        res[val] = res[val] || []
        res[val].push(obj)
        return res
    }, {})
}