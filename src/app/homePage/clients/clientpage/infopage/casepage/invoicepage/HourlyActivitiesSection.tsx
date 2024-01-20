import { ActivityDto, } from "../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { Button, Container, Fab, Paper, } from "@mui/material";
import KeyedList from "../../../../../../../../LogicFiles/Components/KeyedList";
import ActivitySummary from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/ActivitySummary";
import { useNavigations } from "../../../../../../../../LogicFiles/Hooks/Navigations";
import { enhancedApi } from "../../../../../../../../LogicFiles/Redux/codegen/enhancedApi";
import TitleDivider from "../../../../../../../../LogicFiles/Components/TitleDivider";
import InsetList from "../../../../../../../../LogicFiles/Components/BasicListTest";
import AddIcon from "@mui/icons-material/Add";

export default function HourlyActivitiesSection({ hourlyActivities, invoiceId }: {
    hourlyActivities: ActivityDto[] | null | undefined,
    invoiceId: string
}) {
    const { navigateToActivity } = useNavigations();
    return (
        <>
            <Container
                sx={{
                    width: "54vw",
                    marginTop: "2rem",
                    alignItems: "center",
                }}>
                <Paper sx={{ marginBottom: "1rem" }}>
                    <TitleDivider title={"Hourly Activities"}>
                        <AddActivityButton invoiceId={invoiceId}/>
                    </TitleDivider>
                    <InsetList
                        items={hourlyActivities!}
                        onClickHandler={(arg) => navigateToActivity(arg.id, invoiceId)}
                        toStringValue={(arg) => arg.createdAt!.toString()}
                        maxHeight={"22rem"}
                    />
                </Paper>
            </Container>
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
        <Fab size="medium" color="primary" sx={{ marginLeft: "1rem" }} onClick={onAddActivity}>
            <AddIcon/>
        </Fab>
    );
}


// Remove Activity
