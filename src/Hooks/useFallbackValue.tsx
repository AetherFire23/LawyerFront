export default function useFallbackValue<T>(initialValue: boolean, trueValue: T, falseValue: T) {
    const fallbackValue = initialValue ? trueValue : falseValue
    return fallbackValue
}
