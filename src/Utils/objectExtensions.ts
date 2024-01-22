// add a check to check if the object is empty
export function isTruthy(obj: any): boolean {
    if (obj) {
        const hasProperties = Object.keys(obj).length > 0;
        if (!hasProperties) return false;
    }

    return !!obj

}
