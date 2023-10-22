'use client'
import { CasesContext } from '../../mercichatgpt/ProcedureMakerServer/Dtos/CasesContext'
import { AxiosResponse } from 'axios'
import { GetSetLocalValue, StorageTypes, useApiKey, useLocalStorage } from './Hooks/LocalStorage';
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
import { useLoginRequest, useTokenLoginRequest } from './Contexts/Slices/AxiosActions';


// need to wrap axiosdIspatch into useffect or something? why?
// in order to make http requests with axios, just put the actualy object, non-stringified, into the second parameter


export default function Home() {
  // imps
  const axios = useAxiosContext()
  const apiKey = useApiKey()
  const tokenLoginRequest = useTokenLoginRequest()

  // controls
  const [userName, handleValueChange] = useControlledInput("")
  const [password, passwordChange] = useControlledInput("")
  const [email, emailChange] = useControlledInput("")
  const [isRegistering, setIsRegistering] = useState(false)
  const loginRequest = useLoginRequest({ username: userName, password: password }) // work because rerendered on every state change

  const handleRegisterOrBackButton = () => {
    setIsRegistering(!isRegistering)
  }

  const registerBackButtonText = isRegistering ? "Back" : "Register"

  const alreadyLoggedIn: boolean = apiKey != null
  if (alreadyLoggedIn) {
    const userDto = tokenLoginRequest()
    if (userDto != null) { // in case not authorized anymore due to expiration
      // navigate to real homepage.
      // https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating
    }

    const executeCredentialsLogin = async () => {
      const responseData = await loginRequest()
      if (responseData.result == LoginResultTypes.Fail) {
        console.log("bad credentials.")
        return;
      }
      else {
        console.log("success!")

        // save api key to localStorage
        // navigate I guess?
        
      }
    }

    return (
      <div className="flex flex-col items-center justify-center mt-32">
        <input placeholder={"username"} className='bg-slate-600 mb-5' value={userName} onChange={handleValueChange} />
        <input placeholder={"password"} className='bg-slate-600 mb-5' value={password} onChange={passwordChange} />

        {isRegistering ? (
          <input placeholder={"email"} className='bg-slate-600 mb-5' value={email} onChange={emailChange} />
        ) :
          (
            <div>
              <button onClick={(e) => executeCredentialsLogin()}> Login</button>
            </div>
          )}

        <button onClick={(e) => { handleRegisterOrBackButton() }}> {registerBackButtonText} </button>


      </div>
    )
  }
}