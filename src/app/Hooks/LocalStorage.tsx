'use client'

import { useEffect, useState } from "react"


export enum StorageTypes {
  jwtToken,
}

export interface GetSetLocalValue {
  getLocalValue: <T>(key: StorageTypes) => T,
  setLocalValue: (key: StorageTypes, model: any) => void
}

export function useLocalStorage(): GetSetLocalValue | null {
  const getLocalValue: <T>(key: StorageTypes) => T = <T,>(key: StorageTypes) => {
    const convertedValue: T = window.localStorage.getItem(key.toString()) as T
    console.log(`convertedValue :${convertedValue}`)
    return convertedValue;
  }

  const setLocalValue: (key: StorageTypes, model: any) => void = (key: StorageTypes, model: any) => {
    const serializedValue = JSON.stringify(model)
    window.localStorage.setItem(key.toString(), serializedValue)
    console.log(`saved serializedValue : ${serializedValue}`)
  }

  const getSet: GetSetLocalValue = {
    getLocalValue: getLocalValue,
    setLocalValue: setLocalValue,
  }

  return getSet
}

interface GetSetKey {
  key: string | null
  setKey: (c: string) => void
}

export function useApiKey(): GetSetKey {
  const { getLocalValue, setLocalValue } = useLocalStorage() as GetSetLocalValue
  const [key, setKeyValue] = useState<string | null>("")

  let apiKey: string | null = null

  // have to use useffect because window nad document dont exist in the ssr - that is by default in nextjs
  // useEffect guarantees to run on client side tho,
  useEffect(() => {
    // if (window != undefined || window != null) {
      const retrievedKey: string | null = getLocalValue(StorageTypes.jwtToken)
      setKeyValue(retrievedKey)
    // }
  }, [])


  const setKey = (k: string) => {
    const apiKey = getLocalValue(StorageTypes.jwtToken)
    return apiKey
  }

  const getSetKey: GetSetKey = {
    key: apiKey,
    setKey: setKey
  }
  return getSetKey
}