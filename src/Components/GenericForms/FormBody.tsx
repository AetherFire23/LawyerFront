import React, { FormEventHandler } from "react";
import { Box, Container, Divider, Paper, SxProps, TextField, Theme, Typography } from "@mui/material";
import { UseFormRegisterReturn } from "react-hook-form";

export function FormContainer({ sx, children, submitHandler }: {
    sx?: SxProps<Theme>,
    children: React.ReactNode,
    submitHandler: FormEventHandler<HTMLFormElement>,
}) {

    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Paper className={" w-full"} id={"paper"}>
                <form onSubmit={submitHandler}>
                    <Box id={"box-form-children"}>
                        {children}
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}

export function FormHeader({ title, children }: { children?: React.ReactNode, title: string }) {

    return (
        <Box id={"form Header"}>
            <Divider sx={{ marginBottom: "1rem", marginTop: "1rem" }}>
                <Typography> {title} {children} </Typography>
            </Divider>
        </Box>

    );
}

interface IGenericFormProps {
    children: React.ReactNode,
    sx?: SxProps<Theme>,
}

export function FormBody({ children, sx }: IGenericFormProps) {
    const defaultStyle: SxProps<Theme> = {
        display: "flex", flexDirection: "column", alignItems: "center"
    };
    return (
        <Container sx={sx ?? defaultStyle}>
            {children}
        </Container>
    );
}

interface ITextFieldProps {
    sx?: SxProps<Theme>,
    text: string,
    register: UseFormRegisterReturn<any>
}

export function FormField({ text, sx, register, }: ITextFieldProps) {
    const defaultStyle = { width: "70%", paddingBottom: "1rem" };
    return (
        <>
            <TextField
                {...register}
                label={text}
                variant="outlined"
                sx={sx ?? defaultStyle}
            />
        </>
    );
}
