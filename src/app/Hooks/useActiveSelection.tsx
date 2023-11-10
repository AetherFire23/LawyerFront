import { useState, Dispatch, SetStateAction } from "react";


interface ReturnType {
    setActive: [Dispatch<SetStateAction<number>>],
    activeValue: string
}
export default function useActiveSelection(initialIndex: number, max: number, selectionValue: string) {

    const initialArray: string[] = []
    for (let i = 0; i < max; i++) {
        initialArray.push("")
    }
    const [index, setIndex] = useState(initialIndex)
    const [arr, setArr] = useState(initialArray)

    const arrCopy: string[] = JSON.parse(JSON.stringify(arr));
    arrCopy[index] = selectionValue
    setArr(arrCopy)

    const active = arr[index]
    const ret: ReturnType = {
        setActive: [setIndex],
        activeValue: active
    }
    return ret
}