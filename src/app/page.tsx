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
import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Input, Container, TextField, Typography } from '@mui/material';



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
    <>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="flex flex-col items-center justify-center">


            <form className="flex flex-col items-center justify-center mt-32" onSubmit={handleSubmit(onSubmit)}>
              <TextField id="standard-basic" label="UserName" variant="standard"  defaultValue="" {...register("username", { required: true })} />
              <TextField id="standard-basic" label="Password" variant="standard"  defaultValue="" {...register("password", { required: true })} />
              <Button sx={{ marginTop: '1em' }} type="submit"> Login </Button>
            </form>
            <Link href={"/registerPage"}>
              <Button  > Register </Button>
            </Link>
            <Typography sx={{ color: 'red' }} variant="h6" component="h1">
              {isError ? "error" : ""}
            </Typography>
        
            <label> {isSuccess ? "Success" : ""} </label>
          </div>
        </Box>
      </Container>
    </>
  )
}
