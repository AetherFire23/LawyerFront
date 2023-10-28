'use client'
import { ReactComponentElement, ReactNode, createContext, useContext, Dispatch, Context } from "react";
import { useImmerReducer } from "use-immer";
import { CasesContext } from "../../../mercichatgpt/ProcedureMakerServer/Dtos/CasesContext";
// use client hehhiih

export enum CasesActionTypes {
    overWriteCases,
}

export class CasesActionData {
    public actionType: CasesActionTypes
    public info: any
}

const casesData: CasesContext | null = null;
const CasesDataContext: Context<CasesContext | null> = createContext<CasesContext | null>(casesData);
export function useCasesContext(): CasesContext | null {
    return useContext(CasesDataContext);
}

const CasesDispatchContext = createContext<Dispatch<CasesActionData> | null>(null);
export function useCasesDispatch() {
    return useContext(CasesDispatchContext)
}

interface IProps {
    children: ReactNode
}

export function CasesProvider({ children }: IProps) {
    const [context, dispatch] = useImmerReducer(casesReducer, casesData)

    return (
        <div>
            <CasesDataContext.Provider value={context}>
                <CasesDispatchContext.Provider value={dispatch}>
                    {children}
                </CasesDispatchContext.Provider>
            </CasesDataContext.Provider>
        </div>
    )
}

// const actionDispatcher: Record<CasesActionTypes, (data: CasesContext | null) => void> = {
//     [CasesActionTypes.changeBase]: updateContext,
// }

export function casesReducer(casesContext: CasesContext | null, payload: CasesActionData) {
    // const action: (data: CasesContext | null) => void = actionDispatcher[payload.actionType]
    // action(userDto)

    switch (payload.actionType) {
        case CasesActionTypes.overWriteCases: {
            casesContext = {
                ...payload.info
            }
        }
    }

    return;
}

// function updateContext(casesContext: CasesContext | null) {
//     console.log("myaction1")


//     return;
// }