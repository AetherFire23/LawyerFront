'use client'
import { ILoginRequest } from '../../mercichatgpt/ProcedureMakerServer/Authentication/AuthModels/ILoginRequest'
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { userApi } from './Redux/Apis/userApi';
import { useState } from 'react';
import { useAppDispatch } from './Redux/hooks';
import { setUser } from './Redux/Slices/userSlice';
import { LoginResult } from '../../mercichatgpt/ProcedureMakerServer/Authentication/ReturnModels/LoginResult';

export default function Home() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [triggerGetToken, { isError, isSuccess }, info] = userApi.endpoints.getToken.useLazyQuery()
  const { register, handleSubmit, watch, formState: { errors }, } = useForm<ILoginRequest>()

  const onSubmit: SubmitHandler<ILoginRequest> = async (loginRequest) => {
    const { isError, data: loginResult } = await triggerGetToken(loginRequest)
    if (isError) return;

    dispatch(setUser(loginResult as LoginResult))
    router.push("/homePage")
    console.log("not error")
  }

  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <form className="flex flex-col items-center justify-center mt-32" onSubmit={handleSubmit(onSubmit)}>
        <input placeholder='userName' className="input mb-5 input-bordered" defaultValue="" {...register("username", { required: true })} />
        <input placeholder='password' className="input mb-5 input-bordered" defaultValue="" {...register("password", { required: true })} />
        <button className='btn' type="submit"> Login </button>
      </form>
      <Link href={"/registerPage"}>
        <button className='btn mt-5' > Register </button>
      </Link>

      <label> {isError ? "error" : ""} </label>
      <label> {isSuccess ? "Success" : ""} </label>
    </div>
  )
}
