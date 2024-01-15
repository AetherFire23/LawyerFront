'use client'

import { useEffect, useState } from "react"
import { LoginResult } from "../Redux/codegen/userApi2Gen";

export enum StorageTypes {
  jwtToken,
}

export interface GetSetLocalValue {
  getLocalValue: <T>(key: StorageTypes) => T,
  setLocalValue: (key: StorageTypes, model: any) => void
}

// after initial login, save LoginResult I guess
//  In layout of homePage, do the getcasesquery

export function useLocalStorage(): GetSetLocalValue | null {

  const getLocalValue: <T>(key: StorageTypes) => T = <T,>(key: StorageTypes) => {
    const storedValue: string = window.localStorage.getItem(key.toString()) ?? ""
    const parsedStoredValue = JSON.parse(storedValue) as T
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

interface GetSetLoginResult {
  loginResult: LoginResult | null | undefined
  setLoginResult: (c: LoginResult) => void
}

export function useLoginStorage(): GetSetLoginResult {

  const { getLocalValue, setLocalValue } = useLocalStorage() as GetSetLocalValue
  const [token, setToken] = useState<LoginResult | null>()

  // have to use useffect because window nad document dont exist in the ssr - that is by default in nextjs
  // useEffect guarantees to run on client side tho,
  useEffect(() => {
    // if (window != undefined || window != null) {
    const storedLogin: LoginResult | null = getLocalValue<LoginResult>(StorageTypes.jwtToken)
    console.log(storedLogin)
    setToken(storedLogin)
    // }
  }, [])

  const setLoginResult = (loginResult: LoginResult) => {
    setLocalValue(StorageTypes.jwtToken, loginResult)
    console.log("should have set the loginResult to this:")
    console.log(loginResult)
  }

  const getSetKey: GetSetLoginResult = {
    loginResult: token,
    setLoginResult: setLoginResult

  }
  return getSetKey
}

const applyTheme = (theme: string = "default") => {
  let newTheme = theme;
  const html = document.getElementsByTagName("html")[0];
  localStorage.setItem("theme", theme);
  (html as any).setAttribute("data-theme", newTheme);
};
