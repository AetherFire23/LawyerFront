'use client'
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterRequest } from '../../../mercichatgpt/ProcedureMakerServer/Authentication/AuthModels/RegisterRequest';
import Link from "next/link"
import { useRegisterMutation } from '../Redux/Apis/userApi';

export default function RegisterPage() {
    const [triggerRegister, { isLoading, isError, isSuccess }] = useRegisterMutation()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterRequest>()

    const onSubmit: SubmitHandler<RegisterRequest> = async (data: RegisterRequest) => {
        triggerRegister(data)
        
    };

    return (
        <div className="flex flex-col items-center justify-center mt-32">
            <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                <input placeholder='userName' className="input input-bordered mb-5" defaultValue="" {...register("username", { required: true })} />
                <input className="input input-bordered mb-5" mb-5 placeholder='password' {...register("password", { required: true })} />
                {(errors.username || errors.password) && <span> Both fields are required </span>}
                <input className="btn" type="submit" />
            </form>
            <div className='flex flex-col items-center justify-center pt-5'>
                <Link href={"/"}>
                    <button id='backButton' className='btn w-24'> Back </button>
                </Link>
            </div>
            <label> {isLoading ? "loading" : ""} </label>
            <label> {isError ? "Error while registering" : ""} </label>
            <label> {isSuccess ? "Success!" : ""} </label>

        </div>
    )
}