import useFallbackText from "./useFallbackText";

export default function useHiddenElement(isHidden: boolean){
    const cssText = useFallbackText(isHidden, "hidden", "")
    return cssText
}