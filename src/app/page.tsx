'use client'
import { CasesContext } from '../../mercichatgpt/ProcedureMakerServer/Dtos/CasesContext'
import { AxiosError, AxiosResponse } from 'axios'
import { GetSetLocalValue, StorageTypes, useTokenStorage, useLocalStorage } from './Hooks/LocalStorage';
import { useEffect, useState } from 'react'
import { AxiosActionData, AxiosActionTypes, useAxiosContext, useAxiosDispatch } from './Contexts/Slices/AxiosContext';
import useControlledInput from './Hooks/useControlledValue'
import { ILoginRequest } from '../../mercichatgpt/ProcedureMakerServer/Authentication/AuthModels/ILoginRequest'
import { SuccessLoginResult } from '../../mercichatgpt/ProcedureMakerServer/Authentication/AuthModels/SuccessLoginResult';
import type { Config } from 'tailwindcss';
import { FailedLoginResult } from '../../mercichatgpt/ProcedureMakerServer/Authentication/ReturnModels/FailedLoginResult';
import { IRequestResult } from '../../mercichatgpt/ProcedureMakerServer/Interfaces/IRequestResult';
import { LoginResultTypes } from '../../mercichatgpt/ProcedureMakerServer/Enums/LoginResultTypes';
import { FailedLogin } from '../../mercichatgpt/ProcedureMakerServer/Authentication/ReturnModels/FailedLogin';
import { useUserRequests } from './Contexts/Slices/AxiosActions';
import { UserDto } from '../../mercichatgpt/ProcedureMakerServer/Authentication/UserDto';
import { AuthenticationActionTypes, AuthenticationPayload, useAuthenticationContext, useAuthenticationDispatch } from './Contexts/AuthenticationContext';
import { LoginResult } from '../../mercichatgpt/ProcedureMakerServer/Authentication/ReturnModels/LoginResult';
import { useRouter } from 'next/navigation'
import { RegisterRequest } from '../../mercichatgpt/ProcedureMakerServer/Authentication/AuthModels/RegisterRequest';
import { RoleTypes } from '../../mercichatgpt/ProcedureMakerServer/Authentication/RoleTypes';
import { RegisterResult } from '../../mercichatgpt/ProcedureMakerServer/Authentication/ReturnModels/RegisterResult';
import useFallbackText from './Hooks/useFallbackText';
import useHiddenCss from './Hooks/useFallbackValue';
import useHiddenElement from './Hooks/useHiddenElement';
import axios from "axios"
export default function Home() {
  const axiosFetcher = useAxiosContext()
  const authDispatch = useAuthenticationDispatch()
  const { token, setToken } = useTokenStorage()
  const { loginWithCredentialsRequest, tokenLoginRequest: loginWithToken } = useUserRequests()
  const router = useRouter()

  const [userName, handleValueChange] = useControlledInput("")
  const [password, passwordChange] = useControlledInput("")
  const [email, emailChange] = useControlledInput("")

  // visibility management:
  //registering
  const [isRegistering, setIsRegistering] = useState(false)
  const registerButtonText = useFallbackText(!isRegistering, "Register", "Back")
  const hideOnRegistering = useHiddenElement(!isRegistering)


  const [hasRegisterError, setHasRegisterError] = useState(false)
  const [hasPressedConfirmButton, setHasPressedConfirmButton] = useState(false)
  const showOnConfirmClick = useHiddenElement(!hasPressedConfirmButton)
  const errorOrSuccessText = useFallbackText(hasRegisterError, "Error in registering", "register successful, you can now log in")

  // logging in
  const [hasLoginError, setHasLoginError] = useState(false)
  const showOnLoginError = useHiddenElement(!hasLoginError)

  const swapRegisterOrBackButton = () => {
    setIsRegistering(!isRegistering)
    setHasLoginError(false)
    setHasRegisterError(false)
    setHasPressedConfirmButton(false)
  }

  const hasFoundTokenKey: boolean = (token != null) && token.length > 15
  console.log(`was a key found?=${hasFoundTokenKey} value=${token}`)
  // probably a better way to ensure mounting only once but yee

  console.log(`am I null ? ${axiosFetcher}---`)
  if (hasFoundTokenKey) {
    console.log("am i even")
    loginWithToken()
      .then((res) => {
        console.log("successful token login")
        router.push("/homePage")
      })
      .catch((err) => {
        console.log("Unsuccessful token login.")
      })
  } // Move this brace to the correct position



  const loginWithCredentialsExecute = async () => {
    console.log("begin logging")
    const loginInfo: ILoginRequest = {
      password: password,
      username: userName
    }
    await loginWithCredentialsRequest(loginInfo)
      .then(res => {
        console.log("valid!")
        const loginResult = res.data as LoginResult
        const authPayload: AuthenticationPayload = {
          actionType: AuthenticationActionTypes.overwriteDto,
          info: loginResult.userDto
        }
        authDispatch?.(authPayload)
        setToken(loginResult.token)
        router.push("/homePage")

      })
      .catch(err => {
        console.log("invalid credentials")
        setHasLoginError(true)
      })
    console.log("endinglogging")
  }

  const tryRegister = async () => {
    setHasPressedConfirmButton(true)
    const registerRequest: RegisterRequest = {
      password: password,
      role: RoleTypes.Normal,
      username: userName
    }
    await axiosFetcher.post("User/register", registerRequest)
      .then(res => {
        console.log("register successful")
        setHasRegisterError(true)

      })
      .catch((err: AxiosError) => {
        console.log("register rerror")
        setHasRegisterError(true)
      })
  }

  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <input placeholder={"username"} className='bg-slate-600 mb-5' value={userName} onChange={handleValueChange} />
      <input placeholder={"password"} className='bg-slate-600 mb-5' value={password} onChange={passwordChange} />

      {isRegistering ? (
        <input placeholder={"email"} className='bg-slate-600 mb-5' value={email} onChange={emailChange} />
      ) : (
        <div>
          <button onClick={(e) => loginWithCredentialsExecute()}> Login</button>
        </div>
      )}
      <button onClick={(e) => { swapRegisterOrBackButton() }}> {registerButtonText} </button>

      <button className={`${hideOnRegistering}`} onClick={(e) => tryRegister()}> Confirm</button>
      <label className={`${showOnLoginError}`} > Error in credentials login </label>
      <label className={`${showOnConfirmClick}`} > {errorOrSuccessText} </label>

    </div>
  )
}
