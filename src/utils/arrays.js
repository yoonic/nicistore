/**
 * Move the position of an array's element
 * @param array - The array that will be updated
 * @param fromIdx - The position of the element
 * @param toIdx - The new position of the element
 */
function move(array, fromIdx, toIdx) {
    array.splice(toIdx, 0, array.splice(fromIdx, 1)[0]);
}

/**
 * Exports
 */
export {move};
