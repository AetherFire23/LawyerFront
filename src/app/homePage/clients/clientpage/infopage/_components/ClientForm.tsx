import * as React from "react";
import { SubmitHandler, useForm, UseFormRegisterReturn } from "react-hook-form";
import { mapFormDataToClientDto, useFormReset } from "@/app/homePage/clients/clientpage/infopage/infpoage-hooks";
import { Box, Container, Paper, TextField } from "@mui/material";
import { FormEventHandler } from "react";
import { ClientDto } from "@/Redux/codegen/userApi2Gen";
import { enhancedApi } from "@/Redux/codegen/enhancedApi";
import { FormBody, FormContainer, FormField, FormHeader } from "@/Components/GenericForms/FormBody";
import { SaveIconButton } from "@/Components/Icons/Icons";
import Button from "@mui/material/Button";

export default function ClientForm({ clientDto }: { clientDto: ClientDto }) {
    const { isFetching: isFetchingCases, isSuccess: isSuccessCases } = enhancedApi.useGetCaseGetcasescontextQuery();
    const [triggerUpdateClient,] = enhancedApi.usePutCaseUpdateclientMutation();
    const { register, handleSubmit, formState: { errors }, reset, } = useForm<ClientDto>({ defaultValues: clientDto, });
    useFormReset(isSuccessCases && !isFetchingCases, clientDto, reset);

    const onSubmitClientUpdate: SubmitHandler<ClientDto> = async (caseDtoFormData) => {
        console.log("submitting client");
        const nextClientDto = mapFormDataToClientDto(clientDto, caseDtoFormData);
        triggerUpdateClient({ body: nextClientDto });
    };

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1rem", width: "50vw" }}>
                <Box sx={{width: "50vw"}}>
                    <FormContainer submitHandler={handleSubmit(onSubmitClientUpdate)}>
                        <FormHeader title={"Client Information"}>
                            <SaveIconButton type={"submit"}/>
                        </FormHeader>
                        <FormBody>
                            <FormField text={"adresse"} register={register("address")}/>
                            <FormField text={"firstName"} register={register("firstName")}/>
                            <FormField text={"lastName"} register={register("lastName")}/>
                            <FormField text={"email"} register={register("email")}/>
                            <Button type={"submit"}></Button>
                        </FormBody>
                    </FormContainer>
                </Box>
            </Box>
        </>
    );
}

function FormBox({ children, formHandler }: {
    children: React.ReactNode,
    formHandler: FormEventHandler<HTMLFormElement> | undefined
}) {

    return (
        <form onSubmit={formHandler}>
            <Container sx={{
                display: "flex",
                flexDirection: "column",
                width: "50vw",
                alignItems: "center",
                marginTop: "1rem"
            }}>
                <Paper sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "50vw",
                    alignItems: "left",
                }}>
                    {children}
                </Paper>
            </Container>
        </form>
    );
}

interface IFormFieldProps {
    label: string,
    register?: UseFormRegisterReturn<any>
}

function FormTextField({ register, label }: IFormFieldProps) {
    return (
        <>
            <TextField
                {...register}
                id="standard-basic"
                label={label}
                variant="outlined"
                sx={{ width: "80%", paddingBottom: "1rem" }}
            />
        </>
    );
}

