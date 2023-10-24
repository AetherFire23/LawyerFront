'use client'
import { ReactComponentElement, ReactNode, createContext, useContext, Dispatch } from "react";
import { useImmerReducer } from "use-immer";
import { CasesContext as UserDto } from "../../../mercichatgpt/ProcedureMakerServer/Dtos/CasesContext";

export enum AuthenticationActionTypes {
    overwriteDto,
}

export interface AuthenticationPayload {
    actionType: AuthenticationActionTypes;
    info: any
}

const authenticationData: UserDto | null = null;
const AuthenticationContext = createContext<UserDto | null>(authenticationData);
export function useAuthenticationContext() {
    return useContext(AuthenticationContext);
}

const AuthenticationDispatchContext = createContext<Dispatch<AuthenticationPayload> | null>(null);
export function useAuthenticationDispatch() {
    return useContext(AuthenticationDispatchContext)
}

interface IProps {
    children: ReactNode
}

export function AuthenticationProvider({ children }: IProps) {
    const [context, dispatch] = useImmerReducer(authenticationReducer, authenticationData)

    return (
        <div>
            <AuthenticationContext.Provider value={context}>
                <AuthenticationDispatchContext.Provider value={dispatch}>
                    {children}
                </AuthenticationDispatchContext.Provider>
            </AuthenticationContext.Provider>
        </div>
    )
}

export function authenticationReducer(userDto: UserDto | null, payload: AuthenticationPayload) {
    switch (payload.actionType) {
        case AuthenticationActionTypes.overwriteDto:{
            const userdto = payload.info as UserDto
            userDto = {
                ...userdto
            }
        }
    }
}


// import React, { createContext, useContext, Dispatch, ReactNode } from "react";
// import { useImmerReducer } from "use-immer";

// // Import CasesContext from the correct location
// import { CasesContext } from "../../../mercichatgpt/ProcedureMakerServer/Dtos/CasesContext";

// enum AuthenticationActionTypes {
//   ChangeBase,
//   ReplaceAxios,
// }

// export class AuthenticationPayload {
//   public actionType: AuthenticationActionTypes | null = null;
//   public payload: any;
// }

// // Provide the correct type for axiosInstance
// const axiosInstance: CasesContext | null = null;

// const AuthenticationContext = createContext<CasesContext | null>(axiosInstance);

// export function useAuthenticationContext() {
//   return useContext(AuthenticationContext);
// }

// const AuthenticationDispatchContext = createContext<Dispatch<AuthenticationPayload> | null>(null);

// export function useAxiosDispatch() {
//   return useContext(AuthenticationDispatchContext);
// }

// interface IProps {
//   children: ReactNode;
// }

// export function AuthenticationProvider({ children }: IProps) {
//   const [context, dispatch] = useImmerReducer(authenticationReducer, axiosInstance);

//   return (
//     <div>
//       <AuthenticationContext.Provider value={context}>
//         <AuthenticationDispatchContext.Provider value={dispatch}>
//           {children}
//         </AuthenticationDispatchContext.Provider>
//       </AuthenticationContext.Provider>
//     </div>
//   );
// }

// export function authenticationReducer(axios: CasesContext | null, payload: AuthenticationPayload) {
//   // Your reducer logic here
//   return axios;
// }
