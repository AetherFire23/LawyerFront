import { ClientDto } from "../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { enhancedApi } from "../../../../../../../LogicFiles/Redux/codegen/enhancedApi";
import { SubmitHandler, useForm, UseFormRegisterReturn } from "react-hook-form";
import { mapFormDataToClientDto, useFormReset } from "@/app/homePage/clients/clientpage/infopage/infpoage-hooks";
import { Container, Fab, Paper, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { FormEventHandler } from "react";
import TitleDivider from "../../../../../../../LogicFiles/Components/TitleDivider";
import SaveIcon from "@mui/icons-material/Save";

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
        <FormBox formHandler={handleSubmit(onSubmitClientUpdate)}>
            <TitleDivider title={"Client information"}>
                <Fab color={"primary"} size="medium" type={"submit"} sx={{ marginBottom: "1rem", marginLeft: "1rem" }}> <SaveIcon/> </Fab>
            </TitleDivider>
            <Container >
                <FormTextField label="adresse" register={register("address")}/>
                <FormTextField label="firstName" register={register("firstName")}/>
                <FormTextField label="lastName" register={register("lastName")}/>
                <FormTextField label="email" register={register("email")}/>
            </Container>
        </FormBox>
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

