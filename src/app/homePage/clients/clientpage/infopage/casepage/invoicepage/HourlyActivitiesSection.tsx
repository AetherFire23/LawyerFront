import {
    ActivityDto,
    usePostInvoiceCreateactivityMutation
} from "../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { isValidArray } from "../../../../../../../../LogicFiles/TypeScriptExtensions/ArrayExtensions";
import { Button, Typography } from "@mui/material";
import KeyedList from "../../../../../../../../LogicFiles/Components/KeyedList";
import { useActivityNavigation, useNavigateToClient } from "../../../../../../../../LogicFiles/Hooks/Navigations";
import logObject from "../../../../../../../../LogicFiles/Utils/logObject";


export default function HourlyActivitiesSection({ hourlyActivities, invoiceId }: {
    hourlyActivities: ActivityDto[] | null | undefined,
    invoiceId: string
}) {

    return (
        <div>
            <label> Hourly Activities: </label>
            <KeyedList list={hourlyActivities!} renderer={a => (<HourlyActivity activity={a}/>)}/>
            <AddActivityButton invoiceId={invoiceId}/>
        </div>
    );
}

function HourlyActivity({ activity }: { activity: ActivityDto }) {
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
    const navigateToActivity = useActivityNavigation();

    function onAddActivity() {
        triggerAddActivity({ invoiceId: invoiceId, isDisburse: false, isTaxable: true }).unwrap().then(c => {
            logObject("this is createdActivity:", c);
            navigateToActivity(c);
        });
    }

    return (
        <>
            <Button onClick={onAddActivity}> Add Activity </Button>
        </>
    );
}

// Remove Activity
