'use client'
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from "next/link"
import { Box, Button, Container, TextField } from '@mui/material';
import { RegisterRequest, usePostUserRegisterMutation } from '../../../LogicFiles/Redux/codegen/userApi2Gen';

export default function RegisterPage() {
    const [triggerRegister, { isLoading, isError, isSuccess }] = usePostUserRegisterMutation()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterRequest>()

    const onSubmit: SubmitHandler<RegisterRequest> = async (data: RegisterRequest) => {
        // data.role = 1;// 1 for NormalRole
        data.role = "Normal"
        triggerRegister({ body: data })
    };

    return (
        <Container>
            <Box>
                <div className="flex flex-col items-center justify-center mt-32">
                    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                        <TextField id="standard-basic" label="UserName" variant="standard" defaultValue="" {...register("username", { required: true })} />
                        <TextField id="standard-basic" label="Password" variant="standard" {...register("password", { required: true })} />
                        {(errors.username || errors.password) && <span> Both fields are required </span>}
                        <Button sx={{ marginTop: '1em' }} type="submit"> Register </Button>
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