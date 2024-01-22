export function isFalsyOrWhitespace(string: string) {

    if (!string) return true;

    const isWhiteSpace = string.trim().length == 0;

    return isWhiteSpace;
}

export function EnsureUnion<TUnion extends string>(op: TUnion) {
    return op
}
