import {
    ActivityDto,
    usePostInvoiceCreateactivityMutation, usePutInvoiceArchiveinvoiceMutation, usePutInvoiceRemoveactivityMutation
} from "../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { Button, Typography } from "@mui/material";
import KeyedList from "../../../../../../../../LogicFiles/Components/KeyedList";
import { useNavigateToInvoicePage, useNavigateToActivity } from "../../../../../../../../LogicFiles/Hooks/Navigations";
import logObject from "../../../../../../../../LogicFiles/Utils/logObject";

export default function HourlyActivitiesSection({ hourlyActivities, invoiceId }: {
    hourlyActivities: ActivityDto[] | null | undefined,
    invoiceId: string
}) {
    const hourlyActivityRenderer = (activity: ActivityDto) => (
        <HourlyActivity activity={activity} invoiceId={invoiceId}/>);
    return (
        <div>
            <label> Hourly Activities: </label>
            <KeyedList list={hourlyActivities!} renderer={hourlyActivityRenderer}/>
            <AddActivityButton invoiceId={invoiceId}/>
        </div>
    );
}

function HourlyActivity({ activity, invoiceId }: { activity: ActivityDto, invoiceId: string }) {
    const [triggerArchiveActivity, data] = usePutInvoiceRemoveactivityMutation();
    const navigateToInvoice = useNavigateToInvoicePage();


    return (
        <>
            <Typography> {activity.createdAt} </Typography>
            <Typography> {activity.description} </Typography>
            <Typography> {activity.costInDollars} </Typography>
            <Typography> {activity.quantity} </Typography>
            <Typography> {activity.totalCost} </Typography>
        </>
    );
}

function AddActivityButton({ invoiceId }: { invoiceId: string }) {
    const [triggerAddActivity, data] = usePostInvoiceCreateactivityMutation();
    const navigateToActivity = useNavigateToActivity();

    function onAddActivity() {
        triggerAddActivity({ invoiceId: invoiceId, isDisburse: false, isTaxable: true }).unwrap()
            .then(activityId => {
                logObject("this is createdActivity:", activityId);
                navigateToActivity(activityId, invoiceId);
            });
    }

    return (
        <Button onClick={onAddActivity}> Add Activity </Button>
    );
}


// Remove Activity
