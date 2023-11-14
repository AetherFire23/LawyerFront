'use client'
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterRequest } from '../../../mercichatgpt/ProcedureMakerServer/Authentication/AuthModels/RegisterRequest';
import Link from "next/link"
import { useRegisterMutation } from '../Redux/Apis/userApi';
import { Box, Button, Container, TextField } from '@mui/material';

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
        <Container>
            <Box>
                <div className="flex flex-col items-center justify-center mt-32">
                    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                        <TextField id="standard-basic" label="UserName" variant="standard" defaultValue="" {...register("username", { required: true })} />
                        <TextField id="standard-basic" label="Password" variant="standard" {...register("password", { required: true })} />
                        {(errors.username || errors.password) && <span> Both fields are required </span>}
                        <Button sx={{ marginTop: '1em' }} type="submit"> Login </Button>
                    </form>
                        <Link href={"/"}>
                            <Button> Back </Button>
                        </Link>
                    <label> {isLoading ? "loading" : ""} </label>
                    <label> {isError ? "Error while registering" : ""} </label>
                    <label> {isSuccess ? "Success!" : ""} </label>

                </div>
            </Box>
        </Container>

    )
}