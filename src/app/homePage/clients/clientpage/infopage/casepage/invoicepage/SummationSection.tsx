import { InvoiceSummation } from "../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { Typography } from "@mui/material";

export default function SummationSection({ invoiceSummation }: { invoiceSummation: InvoiceSummation }) {
    return (
        <div>
            <Typography> {invoiceSummation.balance}</Typography>
        </div>
    );
}
