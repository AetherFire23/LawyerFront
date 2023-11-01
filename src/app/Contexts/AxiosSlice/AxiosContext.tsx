'use client'

import { ReactComponentElement, ReactNode, createContext, useContext, Dispatch } from "react";
import axios, { Axios, AxiosInstance } from "axios";
import { useImmerReducer } from "use-immer";
import config from '../../../../tailwind.config';
import { Work_Sans } from "next/font/google";

// in axios, you can replace config like I did so below

//you an do like ...axios.defaults and then it just works


// using cathc, which catches error not in the then(()
// if I send bad request, I can still send data through this path: error.response.data

// if I send just Ok(), its just response.data
// I discriminate between the status codes in the response. : response.status  (statusText is deprecated)
 


// can wrap everything in try cathc lol


// need to wrap axiosdIspatch into useffect or something? why?
// in order to make http requests with axios, just put the actualy object, non-stringified, into the second parameter


// the Authorization header needs to be like so :
//headers = {
//    'Authorization': `Bearer ${}`  
// }

export enum AxiosActionTypes {
    swapAxiosDefaults,
}

export interface AxiosActionData {
    actionType: AxiosActionTypes
    info: any
}

const axiosInstance = axios.create({
    baseURL: "http://localhost:5099/"
});

const AxiosContext = createContext<AxiosInstance>(axios);
export function useAxiosContext() {
    return useContext(AxiosContext);
}

const AxiosDispatchContext = createContext<Dispatch<AxiosActionData> | undefined>(undefined);
export function useAxiosDispatch() {
    return useContext(AxiosDispatchContext)
}

interface IProps {
    children: ReactNode
}

export function AxiosProvider({ children }: IProps) {
    const [context, dispatch] = useImmerReducer(axiosReducer, axiosInstance)

    return (
        <div>
            <AxiosContext.Provider value={context}>
                <AxiosDispatchContext.Provider value={dispatch}>
                    {children}
                </AxiosDispatchContext.Provider>
            </AxiosContext.Provider>
        </div>
    )
}

const actionDispatcher: Record<AxiosActionTypes, (data: AxiosInstance, payload: AxiosActionData) => void> = {
    [AxiosActionTypes.swapAxiosDefaults]: swapAxiosDefaults,
}

function swapAxiosDefaults(axios: AxiosInstance, payload: AxiosActionData) {
    axios.defaults = {
        ...payload.info 
    }

    console.log("axios defaults changed");

}

export function axiosReducer(axios: AxiosInstance, payload: AxiosActionData) {
    const action = actionDispatcher[payload.actionType]
    action(axios, payload);
    return;
}





const doRetardTaskAsync = async (e:any) => 
{
  try{

    await axios.get("User/test7")
      .then((res) => {
        console.log(res)
      })
      .catch((res) => {
        console.log(res)
      })
  }
  catch{
    console.log("bad req:)")
  }
  console.log("am i still running")

}