export function isValidArray<T>(array: Array<T> | null | undefined) {
    const isValid = array && Object.keys(array).length !== 0
    return isValid
}