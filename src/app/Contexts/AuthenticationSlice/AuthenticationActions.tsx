'use client'
import { AuthenticationActionTypes, useAuthenticationDispatch } from './AuthenticationContext';
import { credentialsLoginRequest } from './AuthenticationRequests';
import { LoginResult } from '../../../../mercichatgpt/ProcedureMakerServer/Authentication/ReturnModels/LoginResult';
import { ILoginRequest } from '../../../../mercichatgpt/ProcedureMakerServer/Authentication/AuthModels/ILoginRequest';
import { UserDto } from '../../../../mercichatgpt/ProcedureMakerServer/Authentication/UserDto';

interface AuthenticationActions { 
    getThenDispatchUserDto: (loginRequest: ILoginRequest) => Promise<LoginResult> 
} 

export default function useAuthenticationActions() { 
    const authDispatch = useAuthenticationDispatch() 

    const getThenDispatchUserDto = async (loginRequest: ILoginRequest) => { 
        const loginResult = await credentialsLoginRequest(loginRequest) 
        authDispatch?.({ actionType: AuthenticationActionTypes.OverwriteDto, info: loginResult.userDto }) 
        console.log(loginResult) 
        console.log(authDispatch) 
        return loginResult 
    }

    const authenticationActions: AuthenticationActions = { 
        getThenDispatchUserDto: getThenDispatchUserDto 
    } 

    return authenticationActions
}