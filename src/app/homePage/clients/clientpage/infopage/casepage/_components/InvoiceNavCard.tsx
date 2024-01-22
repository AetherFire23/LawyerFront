import { Paper, Typography } from "@mui/material";
import { InvoiceDto } from "@/Redux/codegen/userApi2Gen";
import { useNavigations } from "@/Hooks/Navigations";

export default function InvoiceNavCard({ invoice }: { invoice: InvoiceDto }) {
    const { navigateToInvoice } = useNavigations();
    return (
        <Paper onClick={() => navigateToInvoice(invoice.id)}>
            <Typography> {invoice.invoiceNumber}</Typography>
        </Paper>
    );
}
