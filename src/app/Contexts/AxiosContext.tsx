'use client'

import { ReactComponentElement, ReactNode, createContext, useContext, Dispatch } from "react";
import axios, { Axios, AxiosInstance } from "axios";
import { useImmerReducer } from "use-immer";
import config from '../../../tailwind.config';

export enum AxiosActionTypes {
    isValidToken,
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
    [AxiosActionTypes.isValidToken]: checkIfValidToken,
    [AxiosActionTypes.swapAxiosDefaults]: swapAxiosDefaults,
}


function checkIfValidToken(data: AxiosInstance, payload: AxiosActionData) {
    console.log("am I valid?")
}

function swapAxiosDefaults(axios: AxiosInstance, payload: AxiosActionData) {
     axios.defaults = {
        ...payload.info
     }

}

export function axiosReducer(axios: AxiosInstance, payload: AxiosActionData) {
    const action = actionDispatcher[payload.actionType]
    action(axios, payload);
    return;
}