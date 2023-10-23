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
import { useLoginRequest, useTokenLoginRequest, useUserRequests } from './Contexts/Slices/AxiosActions';



export default function Home() {
  const axios = useAxiosContext()

  const { key, setKey } = useApiKey()
  const { loginWithCredentials, loginWithToken } = useUserRequests()

  const [userName, handleValueChange] = useControlledInput("")
  const [password, passwordChange] = useControlledInput("")
  const [email, emailChange] = useControlledInput("")
  const [isRegistering, setIsRegistering] = useState(false)

  const handleRegisterOrBackButton = () => {
    setIsRegistering(!isRegistering)
  }

  const registerBackButtonText = isRegistering ? "Back" : "Register"



  const alreadyLoggedIn: boolean = (key != null) && key.length > 15
  console.log(`loggedin${alreadyLoggedIn} keyvalue ${key}`)
  if (alreadyLoggedIn) {
    const userDto = loginWithToken()
    // set the access token in axios if it is valid, blabla

    if (userDto != null) { // in case not authorized anymore due to expiration
      // navigate to real homepage.
      // https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating
    }
  }

  const loginWithCredentialsExecute = async () => {
    const responseData = await loginWithCredentials({ password: password, username: userName })
    console.log(`response is 400: ${responseData.status == 400}`)

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
            <button onClick={(e) => loginWithCredentialsExecute()}> Login</button>
          </div>
        )}

      <button onClick={(e) => { handleRegisterOrBackButton() }}> {registerBackButtonText} </button>
    </div>
  )
}
