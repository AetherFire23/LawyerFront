import { Paper, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { ActivityDto } from "../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { useNavigations } from "../../../../../../../../LogicFiles/Hooks/Navigations";


export default function ActivitySummary({ activity, invoiceId }: { activity: ActivityDto, invoiceId: string }) {
    const { navigateToActivity } = useNavigations()
    return (
        <>
            <Paper sx={{ margin: "1rem", padding: "1rem" }} onClick={() => navigateToActivity(activity.id, invoiceId)}>
                <Stack direction={"row"}>
                    <Typography> {activity.createdAt} </Typography>
                    <Typography> {activity.description} </Typography>
                    <Typography> {activity.costInDollars} </Typography>
                    <Typography> {activity.quantity} </Typography>
                    <Typography> {activity.totalCost} </Typography>
                </Stack>
            </Paper>
        </>
    );
}
