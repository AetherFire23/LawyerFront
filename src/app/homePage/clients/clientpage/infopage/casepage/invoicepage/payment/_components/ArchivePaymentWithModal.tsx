import { ActivityDto, InvoicePaymentDto } from "@/Redux/codegen/userApi2Gen";
import { enhancedApi } from "@/Redux/codegen/enhancedApi";
import { useNavigations } from "@/Hooks/Navigations";
import AlertDialog, { useDialog } from "@/Components/BasicDialog";
import { Fab } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";
import * as React from "react";

export default function ArchivePaymentWithModal({ payment, invoiceId }: {
    payment: InvoicePaymentDto,
    invoiceId: string
}) {
    const [triggerArchivePayment,] = enhancedApi.usePutInvoiceRemoveinvoicepaymentMutation();
    const { navigateToInvoice } = useNavigations();
    const dialogState = useDialog();

    function archivePayment() {
        triggerArchivePayment({ invoicePaymentId: payment.id }).unwrap().then(() => {
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
                         onAgree={archivePayment}/>
        </>
    );
}
