import { ActivityDto } from "@/Redux/codegen/userApi2Gen";
import { enhancedApi } from "@/Redux/codegen/enhancedApi";
import { useNavigations } from "@/Hooks/Navigations";
import AlertDialog, { useDialog } from "@/Components/BasicDialog";
import { Fab } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import * as React from "react";

export default function ArchiveButtonWithModal({ activity, invoiceId }: { activity: ActivityDto, invoiceId: string }) {
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
            <Fab color={"primary"} sx={{ marginLeft: "1rem" }} onClick={dialogState.handleClickOpen} size={"medium"}>
                <ArchiveIcon/>
            </Fab>
            <AlertDialog dialogState={dialogState}
                         title={"Confirmation"}
                         content={"Do you really wish to archive this activity?"}
                         onAgree={archiveActivity}/>
        </>
    );
}
