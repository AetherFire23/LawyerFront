import { Box, Container, Fab, Paper, } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ActivityDto } from "@/Redux/codegen/userApi2Gen";
import TitleDivider from "@/Components/TitleDivider";
import { useNavigations } from "@/Hooks/Navigations";
import InsetList from "@/Components/BasicListTest";
import { enhancedApi } from "@/Redux/codegen/enhancedApi";

export default function HourlyActivitiesSection({ hourlyActivities, invoiceId }: {
    hourlyActivities: ActivityDto[] | null | undefined,
    invoiceId: string
}) {
    const { navigateToActivity } = useNavigations();
    return (
        <>
            <Box
                sx={{
                    width: "50vw",
                    marginTop: "2rem",
                    alignItems: "center",
                }}>
                <Paper sx={{ marginBottom: "1rem" }}>
                    <TitleDivider title={"Hourly Activities"}>
                        <AddActivityButton invoiceId={invoiceId}/>
                    </TitleDivider>
                    <InsetList
                        items={hourlyActivities!}
                        onClickHandler={(arg: ActivityDto) => navigateToActivity(arg.id, invoiceId)}
                        toStringValue={(arg) => arg.createdAt!.toString()}
                        maxHeight={"22rem"}
                    />
                </Paper>
            </Box>
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
