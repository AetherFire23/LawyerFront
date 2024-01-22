"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box, Divider, Fab, Paper, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { mapFormDataToLawyerDto } from "@/app/homePage/personalInfoPage/personal-info-hooks";
import { useFormReset } from "@/app/homePage/clients/clientpage/infopage/infpoage-hooks";
import useStoreUserFromLocalStorage from "@/Hooks/useGetCasesLocal";
import { enhancedApi } from "@/Redux/codegen/enhancedApi";
import { DumbSuspenseCondition } from "@/Components/DumbGetCasesSusense";
import { useAppSelector } from "@/Redux/hooks";
import { LawyerDto } from "@/Redux/codegen/userApi2Gen";
import * as React from "react";
import { FormBody, FormContainer, FormField, FormHeader } from "@/Components/GenericForms/FormBody";
import AddIcon from "@mui/icons-material/Add";
import { AddIconButton, SaveIconButton } from "@/Components/Icons/Icons";

export default function PersonalInfoPage() {
    useStoreUserFromLocalStorage();
    const { isSuccess } = enhancedApi.useGetCaseGetcasescontextQuery();
    return (
        <DumbSuspenseCondition condition={isSuccess}>
            <PersonalInfoForm/>
        </DumbSuspenseCondition>
    );
}

// is there any way I can ensure this doesnt get rendered or run ?
function PersonalInfoForm() {
    const lawyer = useAppSelector(c => c.caseSlice.lawyer) as LawyerDto;
    const [triggerSave] = enhancedApi.usePutCaseUpdatelawyerMutation();
    const { isSuccess } = enhancedApi.useGetCaseGetcasescontextQuery();
    const { register, handleSubmit, reset } = useForm<LawyerDto>({ defaultValues: lawyer });
    useFormReset(isSuccess, lawyer, reset);

    const onSubmit: SubmitHandler<LawyerDto> = async (lawyerForm) => {
        const updatedLawyer = mapFormDataToLawyerDto(lawyer!, lawyerForm);
        triggerSave({ body: updatedLawyer });
    };

    // The lesson I think is that the bigger container will adapt to the sice of the smaller container if is it marked as flex
    // which is required in order to alignItems: "center"
    // so setting 100% of parent in the CHILD will mean 100% of the parent.... that is adapting to he child
    // so in the final we are just adapting to the items...
    return (

        <Box className="flex flex-col items-center mt-4">
            <Box sx={{width: "50vw"}} id={"form-box"}>
                    <FormContainer submitHandler={handleSubmit(onSubmit)}>
                        <FormHeader title={"Personal Information"}>
                            <SaveIconButton type={"submit"}/>
                        </FormHeader>
                        <FormBody>
                            <FormField text={"firstName"} register={register("firstName")}/>
                            <FormField text={"lastName"} register={register("lastName")}/>
                            <FormField text={"email"} register={register("email")}/>
                            <FormField text={"mobilephone"} register={register("mobilePhoneNumber")}/>
                            <Button type={"submit"}></Button>
                        </FormBody>
                    </FormContainer>
            </Box>
        </Box>
    );
}
