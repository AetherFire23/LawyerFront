"use client";

import {
    ActivityDto
} from "../../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import {
    DumbSuspenseCondition
} from "../../../../../../../../../LogicFiles/Components/DumbGetCasesSusense";
import {
    mapFormDataToActivity,
    useActivityInitialization
} from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/activity/activity-hooks";
import { useSearchParams } from "next/navigation";
import { Container, Fab, Paper, TextField } from "@mui/material";
import { SubmitHandler, useForm, UseFormRegisterReturn } from "react-hook-form";
import { useFormReset } from "@/app/homePage/clients/clientpage/infopage/infpoage-hooks";
import Button from "@mui/material/Button";
import { enhancedApi } from "../../../../../../../../../LogicFiles/Redux/codegen/enhancedApi";
import { useNavigations } from "../../../../../../../../../LogicFiles/Hooks/Navigations";
import TitleDivider from "../../../../../../../../../LogicFiles/Components/TitleDivider";
import SaveIcon from "@mui/icons-material/Save";
import ArchiveIcon from "@mui/icons-material/Archive";
import AlertDialog, { useDialog } from "../../../../../../../../../LogicFiles/Components/BasicDialog";


export default function ActivityPage() {

    return (
        <>
            <ActivityForm/>
        </>
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

    // I need to access the invoiceId from the activity, I guess ill just reintroduce the activityId inside the backend.
    function archiveActivity() {
        triggerArchiveActivity({ activityId: activity!.id }).unwrap().then(() => {
            console.log("archiving stuff");
            navigateToInvoice(invoiceId!);
        });
    }

    const onSubmitActivity: SubmitHandler<ActivityDto> = async (formActivityDto) => {
        const modifiedActivity = mapFormDataToActivity(activity!, formActivityDto);
        triggerSaveActivity({ body: modifiedActivity });
    };

    //const activityType = checkActivityType(activity!);
    return (
        <DumbSuspenseCondition condition={(isSuccess && !isFetching) && !!activity}>
            <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Paper sx={{ display: "flex", flexDirection: "column", marginTop: "2rem", width: "50vw" }}>
                    <form onSubmit={handleSubmit(onSubmitActivity)}>
                        <TitleDivider title={"Activity information"}>
                            <Fab type="submit" color={"primary"} sx={{ marginLeft: "1rem" }}>
                                <SaveIcon/>
                            </Fab>
                            <ArchiveButtonWithModal activity={activity!} invoiceId={invoiceId!}/>

                        </TitleDivider>
                        <Container sx={{ marginLeft: "1rem", marginTop: "1rem" }}>
                            <FormTextField label={"description"} register={register("description")}/>
                            <FormTextField label={"cost"} register={register("costInDollars")}/>
                            <FormTextField label={"quantity"} register={register("quantity")}/>
                        </Container>
                    </form>
                    <Button onClick={archiveActivity}> Archive </Button>
                </Paper>
            </Container>
        </DumbSuspenseCondition>
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

function ArchiveButtonWithModal({ activity, invoiceId }: { activity: ActivityDto, invoiceId: string }) {
    const [triggerArchiveActivity, data] = enhancedApi.usePutInvoiceRemoveactivityMutation();
    const { navigateToInvoice } = useNavigations();
    const dialogState = useDialog();

    function archiveActivity() {
        triggerArchiveActivity({ activityId: activity!.id }).unwrap().then(() => {
            console.log("archiving stuff");
            navigateToInvoice(invoiceId!);
        });
    }

    return (
        <>
            <Fab color={"primary"} sx={{ marginLeft: "1rem" }} onClick={dialogState.handleClickOpen}>
                <ArchiveIcon/>
            </Fab>
            <AlertDialog dialogState={dialogState}
                         title={"Confirmation"}
                         content={"Do you really wish to archive this activity?"}
                         onAgree={archiveActivity}/>
        </>
    );
}
