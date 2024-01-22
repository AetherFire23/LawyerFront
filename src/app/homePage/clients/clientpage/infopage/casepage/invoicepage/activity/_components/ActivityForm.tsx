import { useSearchParams } from "next/navigation";
import { enhancedApi } from "@/Redux/codegen/enhancedApi";
import {
    mapFormDataToActivity,
    useActivityInitialization
} from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/activity/activity-hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { ActivityDto } from "@/Redux/codegen/userApi2Gen";
import { useFormReset } from "@/app/homePage/clients/clientpage/infopage/infpoage-hooks";
import { DumbSuspenseCondition } from "@/Components/DumbGetCasesSusense";
import { Box, Container } from "@mui/material";
import { FormBody, FormContainer, FormField, FormHeader } from "@/Components/GenericForms/FormBody";
import { SaveIconButton } from "@/Components/Icons/Icons";
import Button from "@mui/material/Button";
import * as React from "react";
import ArchiveButtonWithModal
    from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/activity/_components/ArchiveButtonWithModal";

export default function ActivityForm() {
    const params = useSearchParams();
    const invoiceId = params.get("invoiceId");
    const [triggerSaveActivity] = enhancedApi.usePutInvoiceUpdateactivityMutation();
    const { isSuccess, isFetching } = enhancedApi.useGetCaseGetcasescontextQuery();
    const activity = useActivityInitialization();

    const { register, handleSubmit, reset } = useForm<ActivityDto>({ defaultValues: activity! });
    useFormReset(isSuccess, activity!, reset);

    const onSubmitActivity: SubmitHandler<ActivityDto> = async (formActivityDto) => {
        const modifiedActivity = mapFormDataToActivity(activity!, formActivityDto);
        triggerSaveActivity({ body: modifiedActivity });
    };

    //const activityType = checkActivityType(activity!);
    return (
        <DumbSuspenseCondition condition={(isSuccess && !isFetching) && !!activity}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1rem" }}>
                <Box sx={{width: "50vw"}}>
                    <FormContainer submitHandler={handleSubmit(onSubmitActivity)}>
                        <FormHeader title={"Personal Information"}>
                            <SaveIconButton type={"submit"}/>
                            <ArchiveButtonWithModal activity={activity!} invoiceId={invoiceId!}/>
                        </FormHeader>
                        <FormBody>
                            <FormField text={"description"} register={register("description")}/>
                            <FormField text={"cost"} register={register("costInDollars")}/>
                            <FormField text={"quantity"} register={register("quantity")}/>
                            <Button type={"submit"}></Button>
                        </FormBody>
                    </FormContainer>
                </Box>
            </Box>
        </DumbSuspenseCondition>
    );
}
