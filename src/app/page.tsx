"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import Button from "@mui/material/Button";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "../../LogicFiles/Redux/hooks";
import { LoginRequest, LoginResult, userApiGen2 } from "../../LogicFiles/Redux/codegen/userApi2Gen";
import { setUser } from "../../LogicFiles/Redux/Slices/userSlice";
import BasicModal, { useModal } from "../../LogicFiles/Controls/BasicModal";

export default function Home() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [fetchTokenFromUserCredentials, {
        isError,
        isSuccess,
        data: loginResult
    }] = userApiGen2.usePutUserCredentialsloginMutation();

    const { register, handleSubmit, formState: { errors }, } = useForm<LoginRequest>();

    const onSubmit: SubmitHandler<LoginRequest> = async (loginRequest) => {
        // Each time I immediately need the response, I can just do unwrap().then()
        // instead of writing a million guard clauses and waiting for eferything to break
        fetchTokenFromUserCredentials({ body: loginRequest }).unwrap().then(res => {
            // retrieve token from local storage, dispatch to store
            const serializedValue = JSON.stringify(res);
            window.localStorage.setItem("jwtToken", serializedValue);
            dispatch(setUser(res as LoginResult));
            router.push("/homePage");
        });
    };

    return (
        <>
            <Container>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div className="flex flex-col items-center justify-center">
                        <form className="flex flex-col items-center justify-center mt-32"
                              onSubmit={handleSubmit(onSubmit)}>
                            <TextField id="standard-basic" label="UserName" variant="standard"
                                       defaultValue="" {...register("username", { required: true })} />
                            <TextField type="password"
                                       autoComplete="current-password" id="standard-basic" label="Password"
                                       variant="standard"
                                       defaultValue="" {...register("password", { required: true })} />
                            <Button sx={{ marginTop: "1em" }} type="submit"> Login </Button>
                        </form>

                        <Link href={"/registerPage"}>
                            <Button> Register </Button>
                        </Link>
                        <Typography sx={{ color: "red" }} variant="h6" component="h1">
                            {isError ? "error" : ""}
                        </Typography>

                        <label> {isSuccess ? "Success" : ""} </label>
                    </div>

                    <ModalButtonTest/>


                </Box>
            </Container>
        </>
    );
}


function ModalButtonTest() {
    const modalReturn = useModal();

    return (
        <div>
            <Button onClick={modalReturn.handleOpen}> openModal </Button>
            <BasicModal modalState={modalReturn} modalText={"content"} modalTitle={"Title"}/>
        </div>);
}
