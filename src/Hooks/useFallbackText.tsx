import useFallbackValue from "./useFallbackValue";

export default function useFallbackText(value: boolean, truth: string, falsey: string) {
    const fallback = useFallbackValue<string>(value, truth, falsey)
    return fallback
}
