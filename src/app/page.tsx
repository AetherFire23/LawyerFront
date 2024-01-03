'use client'
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { useAppDispatch } from './Redux/hooks';
import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Input, Container, TextField, Typography } from '@mui/material';
import { useLoginStorage } from './Hooks/LocalStorage';
import { usePutUserCredentialsloginMutation, LoginRequest, userApiGen2, UserDto, PutUserCredentialsloginApiArg, LoginResult } from './Redux/codegen/userApi2Gen';
import { userApi2 } from './Redux/codegen/userApi2';
import { setUser } from './Redux/Slices/userSlice';
// TODO
// auto re-log with redux
// date objects not serializable?
// seed client data on server startup
export default function Home() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [fetchTokenFromUserCredentials, { isError, isLoading, isSuccess, data: loginResult }] = userApiGen2.usePutUserCredentialsloginMutation()

  const { register, handleSubmit, watch, formState: { errors }, } = useForm<LoginRequest>()
  const onSubmit: SubmitHandler<LoginRequest> = async (loginRequest) => {
    await fetchTokenFromUserCredentials({ body: loginRequest });
    console.log("am i here")
    if (isError) return;

    const serializedValue = JSON.stringify(loginResult)
    window.localStorage.setItem('jwtToken', serializedValue)
    console.log(`saved serializedValue : ${serializedValue}`)

    // faut trouver comment injecter des trucs apres une request pour pouvoir saver le userSlice
    dispatch(setUser(loginResult as LoginResult))
    // setLoginResult(loginResult as LoginResult)
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
              <TextField id="standard-basic" label="UserName" variant="standard" defaultValue="" {...register("username", { required: true })} />
              <TextField id="standard-basic" label="Password" variant="standard" defaultValue="" {...register("password", { required: true })} />
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
        <Link href={""}>
        </Link>
      </Container>
    </>
  )
}
