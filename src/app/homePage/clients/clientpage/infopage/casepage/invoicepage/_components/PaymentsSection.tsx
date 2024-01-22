import { ActivityDto, InvoicePaymentDto } from "@/Redux/codegen/userApi2Gen";
import { useNavigations } from "@/Hooks/Navigations";
import { Box, Fab, Paper } from "@mui/material";
import TitleDivider from "@/Components/TitleDivider";
import InsetList from "@/Components/BasicListTest";
import { enhancedApi } from "@/Redux/codegen/enhancedApi";
import AddIcon from "@mui/icons-material/Add";

interface IPaymentsSectionProps {
    payments: InvoicePaymentDto[],
    invoiceId: string
}

export default function PaymentsSection({ payments, invoiceId }: IPaymentsSectionProps) {
    const { navigateToPayment } = useNavigations();

    return (
        <Box
            sx={{
                width: "50vw",
                marginTop: "2rem",
                alignItems: "center",
            }}>
            <Paper sx={{ marginBottom: "1rem" }}>
                <TitleDivider title={"Payments"}>
                    <AddPaymentButton invoiceId={invoiceId}/>
                </TitleDivider>
                <InsetList
                    items={payments!}
                    onClickHandler={(arg) => navigateToPayment(arg.id, invoiceId)}
                    toStringValue={(arg) => arg.amoundPaidDate! + arg.amountPaid!}
                    maxHeight={"22rem"}
                />
            </Paper>
        </Box>
    );
}

function AddPaymentButton({ invoiceId }: { invoiceId: string }) {
    const { navigateToPayment } = useNavigations();
    const [triggerAddPayment, ] = enhancedApi.usePutInvoiceAddinvoicepaymentMutation();

    function addActivityThenNavigate() {
        triggerAddPayment({ invoiceId: invoiceId }).unwrap().then(c => {
            navigateToPayment(c, invoiceId);
        });
    }

    return (
        <Fab size={"medium"} color={"primary"} onClick={addActivityThenNavigate} sx={{ marginLeft: "1rem" }}>
            <AddIcon/>
        </Fab>
    );
}
