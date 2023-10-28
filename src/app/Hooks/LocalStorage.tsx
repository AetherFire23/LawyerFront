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

    const storedValue = window.localStorage.getItem(key.toString())
    const storedValueAsNonNullable: string = storedValue ?? ""
    const parsedStoredValue = JSON.parse(storedValueAsNonNullable)
    console.log(`convertedValue :${parsedStoredValue}`)
    return parsedStoredValue;
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
  token: string | null
  setToken: (c: string) => void
}
export function useTokenStorage(): GetSetKey {

  const { getLocalValue, setLocalValue } = useLocalStorage() as GetSetLocalValue
  const [token, setTokenValue] = useState<string | null>("")

  // have to use useffect because window nad document dont exist in the ssr - that is by default in nextjs
  // useEffect guarantees to run on client side tho,
  useEffect(() => {
    // if (window != undefined || window != null) {
    const retrievedKey: string | null = getLocalValue(StorageTypes.jwtToken)
    console.log(retrievedKey)
    setTokenValue(retrievedKey)
    // }
  }, [])


  const setToken = (k: string) => {
    const token = setLocalValue(StorageTypes.jwtToken, k)
    return token
  }

  const getSetKey: GetSetKey = {
    token: token,
    setToken: setToken
  }
  return getSetKey
}


export function useApplyTheme() {
  
}

const applyTheme = (theme: string = "default") => {
  let newTheme = theme;
  const html = document.getElementsByTagName("html")[0];
  localStorage.setItem("theme", theme);
  (html as any).setAttribute("data-theme", newTheme);
};