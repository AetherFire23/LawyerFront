import { InvoiceDto } from "../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { useNavigations } from "../../../../../../../../LogicFiles/Hooks/Navigations";
import { Paper, Typography } from "@mui/material";

export default function InvoiceNavCard({ invoice }: { invoice: InvoiceDto }) {
    const { navigateToInvoice } = useNavigations();
    return (
        <Paper onClick={() => navigateToInvoice(invoice.id)}>
            <Typography> {invoice.invoiceNumber}</Typography>
        </Paper>
    );
}
