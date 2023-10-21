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