import {
    ActivityDto,
} from "../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { Button, } from "@mui/material";
import KeyedList from "../../../../../../../../LogicFiles/Components/KeyedList";
import ActivitySummary from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/ActivitySummary";
import { useNavigations } from "../../../../../../../../LogicFiles/Hooks/Navigations";
import { enhancedApi } from "../../../../../../../../LogicFiles/Redux/codegen/enhancedApi";

export default function HourlyActivitiesSection({ hourlyActivities, invoiceId }: {
    hourlyActivities: ActivityDto[] | null | undefined,
    invoiceId: string
}) {
    const hourlyActivityRenderer = (activity: ActivityDto) => (
        <ActivitySummary activity={activity} invoiceId={invoiceId}/>);
    return (
        <>
            <label> Hourly Activities: </label>
            <KeyedList list={hourlyActivities!} renderer={hourlyActivityRenderer}/>
            <AddActivityButton invoiceId={invoiceId}/>
        </>
    );
}

// function HourlyActivitySummary({ activity, invoiceId }: { activity: ActivityDto, invoiceId: string }) {
//     const navigateToActivity = useNavigateToActivity();
//     return (
//         <>
//             <Paper sx={{ margin: "1rem", padding: "1rem" }} onClick={() => navigateToActivity(activity.id, invoiceId)}>
//                 <Stack direction={"row"}>
//                     <Typography> {activity.createdAt} </Typography>
//                     <Typography> {activity.description} </Typography>
//                     <Typography> {activity.costInDollars} </Typography>
//                     <Typography> {activity.quantity} </Typography>
//                     <Typography> {activity.totalCost} </Typography>
//                 </Stack>
//             </Paper>
//         </>
//     );
// }

function AddActivityButton({ invoiceId }: { invoiceId: string }) {
    const [triggerAddActivity, data] = enhancedApi.usePostInvoiceCreateactivityMutation();
    const { navigateToActivity } = useNavigations();

    function onAddActivity() {
        triggerAddActivity({ invoiceId: invoiceId, isDisburse: false, isTaxable: true }).unwrap()
            .then(activityId => {
                navigateToActivity(activityId, invoiceId);
            });
    }

    return (
        <Button onClick={onAddActivity}> Add Activity </Button>
    );
}


// Remove Activity
