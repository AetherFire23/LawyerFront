"use client";

import {
    ActivityDto
} from "../../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { DumbGetCasesSuspense } from "../../../../../../../../../LogicFiles/Components/DumbGetCasesSusense";
import {
    checkActivityType, mapFormDataToActivity,
    useActivityInitialization
} from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/activity/activity-hooks";
import { useSearchParams } from "next/navigation";
import { Container, Paper, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useFormReset } from "@/app/homePage/clients/clientpage/infopage/infpoage-hooks";
import Button from "@mui/material/Button";
import { enhancedApi } from "../../../../../../../../../LogicFiles/Redux/codegen/enhancedApi";
import Stack from "@mui/material/Stack";
import { useNavigations } from "../../../../../../../../../LogicFiles/Hooks/Navigations";

interface IActivityPageProps {
    activity: ActivityDto;
}

export default function ActivityPage() {

    return (
        <DumbGetCasesSuspense>
            <ActivityForm/>
        </DumbGetCasesSuspense>
    );
}

function ActivityForm() {
    const params = useSearchParams();
    const invoiceId = params.get("invoiceId");
    const [triggerArchiveActivity, data] = enhancedApi.usePutInvoiceRemoveactivityMutation();
    const [triggerSaveActivity, putInvoiceData] = enhancedApi.usePutInvoiceUpdateactivityMutation();
    const { isSuccess, isFetching } = enhancedApi.useGetCaseGetcasescontextQuery();
    const { navigateToInvoice } = useNavigations();
    const activity = useActivityInitialization();
    const [d, a, l] = enhancedApi.useLazyGetCaseGetcasescontextQuery();


    const { register, handleSubmit, reset } = useForm<ActivityDto>({ defaultValues: activity! });
    useFormReset(isSuccess, activity!, reset);

    // const onSubmitClientUpdate: SubmitHandler<ClientDto> = async (caseDtoFormData) => {
    //     console.log("submitting client");
    //     const nextClientDto = mapFormDataToCaseDto(clientDto, caseDtoFormData);
    //     triggerUpdateClient({ body: nextClientDto });
    // };

    if (!activity) {
        console.log("act w2as nul");
        return <div> Loading </div>;
    }

    // I need to access the invoiceId from the activity, I guess ill just reintroduce the activityId inside the backend.
    function archiveActivity() {
        triggerArchiveActivity({ activityId: activity!.id }).unwrap().then(() => {
            console.log("archiving stuff");
            navigateToInvoice(invoiceId!);
        });
    }

    const onSubmitActivity: SubmitHandler<ActivityDto> = async (formActivityDto) => {
        const modifiedActivity = mapFormDataToActivity(activity, formActivityDto);
        triggerSaveActivity({ body: modifiedActivity });
    };

    const activityType = checkActivityType(activity!);
    return (
        <Container sx={{ display: "flex" }}>
            <Stack direction={"column"}>
                <form onSubmit={handleSubmit(onSubmitActivity)}>
                    <Paper sx={{ display: "flex", flexDirection: "column" }}>
                        <TextField
                            autoComplete={"off"}
                            {...register("description", {})}
                            id="standard-basic"
                            label="desc"
                            variant="outlined"
                            className="input mb-5 input-bordered"
                            defaultValue=""
                        />
                        <TextField
                            {...register("costInDollars", {})}
                            id="standard-basic"
                            label="cost"
                            variant="outlined"
                            className="input mb-5 input-bordered"
                            defaultValue=""
                        />
                        <TextField
                            {...register("quantity", {})}
                            id="standard-basic"
                            label="quantity"
                            variant="outlined"
                            className="input mb-5 input-bordered"
                            defaultValue=""
                        />
                    </Paper>
                    <Button type="submit"> Save </Button>

                </form>
                <Button onClick={archiveActivity}> Archive </Button>
            </Stack>
        </Container>
    );
}


