'use client'

import { SubmitHandler, useForm } from 'react-hook-form';

import { axiosInstance } from "../Contexts/AxiosSlice/AxiosFun2"
import { RegisterRequest } from '../../../mercichatgpt/ProcedureMakerServer/Authentication/AuthModels/RegisterRequest';
import { UserEndpoints } from '../../../mercichatgpt/ProcedureMakerServer/Constants/UserEndpoints';
import Link from "next/link"
import HttpStatusCode from '../Utils/HttpStatusCodes';
import { AxiosError } from 'axios';
import { registerRequest } from "../Contexts/AuthenticationSlice/AuthenticationRequests"

export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterRequest>()

    const onSubmit: SubmitHandler<RegisterRequest> = async (data: RegisterRequest) => {

        try {
            await registerRequest(data)
            console.log("register success")
        }
        catch (axiosError) {
            console.log("fail")
            console.log(axiosError)
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-32">
            <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <input placeholder='userName' className="input input-bordered mb-5" defaultValue="" {...register("username", { required: true })} />

                {/* include validation with required or other standard HTML validation rules */}
                <input className="input input-bordered mb-5" mb-5  placeholder='password' {...register("password", { required: true })} />

                {/* errors will return when field validation fails  */}
                {(errors.username || errors.password) && <span> Both fields are required </span>}

                <input className="btn" type="submit" />
            </form>
            <div className='flex flex-col items-center justify-center pt-5'>
                <Link href={"/"}>
                    <button className='btn w-24'> Back </button>
                </Link>
            </div>

        </div>
    )
}