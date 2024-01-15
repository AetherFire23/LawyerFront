import { ClientDto } from "../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { enhancedApi } from "../../../../../../../LogicFiles/Redux/codegen/enhancedApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { mapFormDataToClientDto, useFormReset } from "@/app/homePage/clients/clientpage/infopage/infpoage-hooks";
import { Container, TextField } from "@mui/material";
import Button from "@mui/material/Button";

export default function ClientForm({ clientDto }: { clientDto: ClientDto }) {
    const { isFetching: isFetchingCases, isSuccess: isSuccessCases } = enhancedApi.useGetCaseGetcasescontextQuery();
    const [triggerUpdateClient,] = enhancedApi.usePutCaseUpdateclientMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ClientDto>({ defaultValues: clientDto, });
    useFormReset(isSuccessCases && !isFetchingCases, clientDto, reset);

    const onSubmitClientUpdate: SubmitHandler<ClientDto> = async (caseDtoFormData) => {
        console.log("submitting client");
        const nextClientDto = mapFormDataToClientDto(clientDto, caseDtoFormData);
        triggerUpdateClient({ body: nextClientDto });
    };

    return (
        <form onSubmit={handleSubmit(onSubmitClientUpdate)}>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "25vw",
                }}>

                <Button type="submit"> Save </Button>

                <TextField
                    {...register("address", {})}
                    id="standard-basic"
                    label="adresse"
                    variant="outlined"
                    className="input mb-5 input-bordered"
                    defaultValue=""
                />
                <TextField
                    {...register("firstName", {})}
                    id="standard-basic"
                    label="firstName"
                    variant="outlined"
                    className="input mb-5 input-bordered"
                />
                <TextField
                    {...register("lastName", {})}
                    id="standard-basic"
                    label="lastName"
                    variant="outlined"
                    className="input mb-5 input-bordered"
                />
                <TextField {...register("email", {})} id="standard-basic" label="email" variant="outlined"
                           className="input mb-5 input-bordered" defaultValue=""/>
            </Container>
        </form>
    );
}
