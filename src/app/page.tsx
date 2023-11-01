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

import { userApi } from './Redux/Apis/userApi';
import { useGetTokenQuery } from './Redux/Apis/userApi';
import { todo } from 'node:test';
export default function Home() {
  const router = useRouter()
  const [triggerGetToken, result, info] = userApi.endpoints.getToken.useLazyQuery()

  const {register,handleSubmit,watch,formState: { errors },} = useForm<ILoginRequest>()

  const onSubmit: SubmitHandler<ILoginRequest> = async (loginRequest) => {
    const s = await triggerGetToken(loginRequest)
    if (s.isError) {
      console.log("is error !!")
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <form className="flex flex-col items-center justify-center mt-32" onSubmit={handleSubmit(onSubmit)}>
        <input placeholder='userName' className="input mb-5 input-bordered" defaultValue="" {...register("username", { required: true })} />
        <input placeholder='password' className="input mb-5 input-bordered" defaultValue="" {...register("password", { required: true })} />

        <label> {result.isFetching ? "fetching" : "loaded"} </label>
        <label> {result.isLoading ? "loading" : "loaded"} </label>
        <button className='btn' type="submit"> Login </button>
      </form>
      <Link href={"/registerPage"}>
        <button className='btn mt-5' > Register </button>
      </Link>
    </div>
  )
}
