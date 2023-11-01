'use client'
import React, { createContext, useContext, Dispatch, ReactNode } from "react";
import { useImmerReducer } from "use-immer";

// Import CasesContext from the correct location
import { UserDto } from '../../../../mercichatgpt/ProcedureMakerServer/Authentication/UserDto';
import authenticationReducer from "./AuthenticationReducer";

export enum AuthenticationActionTypes {
  OverwriteDto,
}

export interface AuthenticationPayload {
  actionType: AuthenticationActionTypes;
  info: any;
}

const authenticationData: UserDto | null = null;
const AuthenticationContext = createContext<UserDto | null>(authenticationData);

export function useAuthenticationContext() {
  return useContext(AuthenticationContext);
}

const AuthenticationDispatchContext = createContext<Dispatch<AuthenticationPayload> | null>(null);

export function useAuthenticationDispatch() {
  return useContext(AuthenticationDispatchContext);
}

interface IProps {
  children: ReactNode;
}

export function AuthenticationProvider({ children }: IProps) {
  // Initialize the state using the authenticationData
  const [context, dispatch] = useImmerReducer(authenticationReducer, authenticationData);

  return (
    <div>
      <AuthenticationContext.Provider value={context}>
        <AuthenticationDispatchContext.Provider value={dispatch}>
          {children}
        </AuthenticationDispatchContext.Provider>
      </AuthenticationContext.Provider>
    </div>
  );
}

