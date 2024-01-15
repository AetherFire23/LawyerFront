"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { produce } from "immer";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import {
    LawyerDto,
} from "../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { useAppSelector } from "../../../../LogicFiles/Redux/hooks";
import { mapFormDataToLawyerDto } from "@/app/homePage/personalInfoPage/personal-info-hooks";
import { useFormReset } from "@/app/homePage/clients/clientpage/infopage/infpoage-hooks";
import {  DumbSuspenseCondition } from "../../../../LogicFiles/Components/DumbGetCasesSusense";
import useStoreUserFromLocalStorage from "../../../../LogicFiles/Hooks/useGetCasesLocal";
import { enhancedApi } from "../../../../LogicFiles/Redux/codegen/enhancedApi";

export default function PersonalInfoPage() {
    useStoreUserFromLocalStorage();
    const{isSuccess} = enhancedApi.useGetCaseGetcasescontextQuery()
    return (
        <DumbSuspenseCondition condition={isSuccess}>
            <Container>
                <Box>
                    <Stack direction="column">
                        <Typography> Lawyer information </Typography>
                        <PersonalInfoForm/>
                    </Stack>
                </Box>
            </Container>
        </DumbSuspenseCondition>
    );
}

// is there any way I can ensure this doesnt get rendered or run ?
function PersonalInfoForm() {
    const lawyer = useAppSelector(c => c.caseSlice.lawyer) as LawyerDto;
    const [triggerSave, data] = enhancedApi.usePutCaseUpdatelawyerMutation();
    const { isSuccess } = enhancedApi.useGetCaseGetcasescontextQuery();

    const { register, handleSubmit, formState: { errors }, reset } = useForm<LawyerDto>({ defaultValues: lawyer });

    useFormReset(isSuccess, lawyer, reset);

    const onSubmit: SubmitHandler<LawyerDto> = async (lawyerForm) => {
        const updatedLawyer = mapFormDataToLawyerDto(lawyer!, lawyerForm);
        console.log(updatedLawyer);

        triggerSave({ body: updatedLawyer });
        // lets try to manual refetch just to see if automated refetching simply just sucks ass
    };

    return (
        <Stack>
            <form autoComplete={"new-password"}
                className="p-5 card flex flex-col items-center items justify-start bg-neutral"
                  onSubmit={handleSubmit(onSubmit)}>

                <TextField
                    autoComplete={"off"}
                    id="standard-basic" label="email" variant="standard"
                    className="input mb-5 input-bordered"
                    {...register("email", {})} />

                <TextField id="standard-basic" label="address" variant="standard"
                           className="input mb-5 input-bordered"
                           {...register("address", {})} />

                <TextField id="standard-basic" label="first name" variant="standard"
                           className="input mb-5 input-bordered"
                           {...register("firstName", {})} />

                <TextField id="standard-basic" label="last name" variant="standard"
                           className="input mb-5 input-bordered"
                           {...register("lastName", {})} />

                <TextField id="standard-basic" label="mobile number" variant="standard"
                           className="input mb-5 input-bordered"
                           {...register("mobilePhoneNumber", {})} />

                <Button type="submit"> Save </Button>
            </form>
        </Stack>
    );
}
