'use client'
import { useTokenStorage } from './Hooks/LocalStorage';
import { ILoginRequest } from '../../mercichatgpt/ProcedureMakerServer/Authentication/AuthModels/ILoginRequest'

import { CasesActionTypes, useCasesDispatch } from './Contexts/CaseSlice/CaseContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from "next/link"

import { AuthenticationActionTypes, useAuthenticationContext, useAuthenticationDispatch } from './Contexts/AuthenticationSlice/AuthenticationContext';
import { axiosInstance, setAxiosToken } from './Contexts/AxiosSlice/AxiosFun2';
import { credentialsLoginRequest } from "./Contexts/AuthenticationSlice/AuthenticationRequests"

import { useRouter } from 'next/navigation'
import { getCases } from './Contexts/CaseSlice/CaseRequests';
import { useCaseActions } from './Contexts/CaseSlice/CaseActions';
import useAuthenticationActions from './Contexts/AuthenticationSlice/AuthenticationActions';
import { useAxiosDispatch } from './Contexts/AxiosSlice/AxiosContext';
export default function Home() {
  const authContext = useAuthenticationContext();
  const axiosDispatch = useAxiosDispatch
  const authDispatch = useAuthenticationDispatch()

  console.log(authContext)
  const { refreshCases } = useCaseActions()
 // const { getThenDispatchUserDto } = useAuthenticationActions()
 console.log(authDispatch)

  const casesDispatch = useCasesDispatch()
  const router = useRouter()
  const { token, setToken } = useTokenStorage()
  console.log(authContext)
  //console.log(authDispatch)
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILoginRequest>()
  console.log(`is auth null : ${authContext === null} ${authContext}`)

  const onSubmit: SubmitHandler<ILoginRequest> = async (loginRequest) => {
    // sends login, sets token in Axios, updates the stored user, fetches the current cases and navigates to next page

    try {
      console.log("Login request data:", loginRequest)
      const loginResult = await credentialsLoginRequest(loginRequest)
      authDispatch?.({ actionType: AuthenticationActionTypes.OverwriteDto, info: loginResult.userDto })
      
      console.log("Login request data:", loginResult)
      console.log(`is auth null : ${authContext === null} ${authContext}`)
      console.log(`${authContext}`)

      // setAxiosToken(loginResult.token)


      // console.log(authContext?.lawyerId)
      //await refreshCases()
      // console.log(authContext?.lawyerId)

      router.push("/homePage")
    } catch (err) {
      console.log("Could not login", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <form className="flex flex-col items-center justify-center mt-32" onSubmit={handleSubmit(onSubmit)}>
        <input placeholder='userName' className="input mb-5 input-bordered" defaultValue="" {...register("username", { required: true })} />
        <input placeholder='password' className="input mb-5 input-bordered" defaultValue="" {...register("password", { required: true })} />
        <button type="submit"> Login </button>
      </form>
      <Link href={"/registerPage"}>
        <button> Register </button>
      </Link>
    </div>
  )
}
