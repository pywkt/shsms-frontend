/**
 * @param {array} arr Array of objects to be sorted.
 * @param {string} key Key in each object to use for sorting.
 * @param {bool} isDate Are you sorting items by a Date?
 * @returns A sorted version of the original array in ascending order
 */

export const sortArrayOfObjects = (arr, key, isDate) => arr.sort((a, b) => isDate ? new Date(b[key]) - new Date(a[key]) : b[key] - a[key])
