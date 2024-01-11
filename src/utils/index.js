import { FIELD_STATE, FILED_SIZE } from "../constants"

export const getRandomEmptyIndex = (arr) => {
    const emptyIndexes = arr.reduce((acc, curr, index) => {
        if (curr === FIELD_STATE.empty) {
            acc.push(index)
        }
        return acc
    }, [])
    const index = Math.floor((Math.random() * emptyIndexes.length))
    return emptyIndexes[index]
}

export const generateField = () => {
    return new Array(FILED_SIZE * FILED_SIZE).fill(FIELD_STATE.empty)
}