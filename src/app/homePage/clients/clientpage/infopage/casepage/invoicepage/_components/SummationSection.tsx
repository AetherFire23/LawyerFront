import { Box, Paper, Typography } from "@mui/material";
import { InvoiceSummation } from "@/Redux/codegen/userApi2Gen";
import TitleDivider from "@/Components/TitleDivider";

export default function SummationSection({ invoiceSummation }: { invoiceSummation: InvoiceSummation }) {

    return (
        <Paper>
            <Box sx={{ width: "50vw", marginTop: "2rem", marginBottom: "2rem" }}>
                <TitleDivider title={"Summary"} sx={{ paddingBottom: "0.5rem" }}/>
                <Box sx={{ marginLeft: "1rem" }}>
                    <Box>
                        <InvoiceSummaryRow name={"Hourly Activities"}
                                           amount={invoiceSummation.hourlyRatesCostTotal!}/>
                        <InvoiceSummaryRow name={"Taxable Disburses"}
                                           amount={invoiceSummation.disbursesTaxableTotal!}/>
                        <InvoiceSummaryRow name={"taxable fees"}
                                           amount={invoiceSummation.taxableFeesCost!}/>
                        <InvoiceSummaryRow name={"tps"}
                                           amount={invoiceSummation.tpsTax!}/>
                        <InvoiceSummaryRow name={"tvq"}
                                           amount={invoiceSummation.tvqTax!}/>
                        <InvoiceSummaryRow name={"taxableSubtotal"}
                                           amount={invoiceSummation.taxableSubtotal!}/>
                        <InvoiceSummaryRow name={"tvq"}
                                           amount={invoiceSummation.tvqTax!}/>
                        <InvoiceSummaryRow name={"disbursesNonTaxableTotal"}
                                           amount={invoiceSummation.disbursesNonTaxableTotal!}/>
                        <InvoiceSummaryRow name={"invoiceTotal"}
                                           amount={invoiceSummation.invoiceTotal!}/>
                        <InvoiceSummaryRow name={"paymentsTotal"}
                                           amount={invoiceSummation.paymentsTotal!}/>
                        <InvoiceSummaryRow name={"Balance"}
                                           amount={invoiceSummation.balance!}/>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}

function InvoiceSummaryRow({ name, amount }: { name: string, amount: number }) {
    return (
        <Box sx={{ display: "flex", flexDirection: "row", width: "100%",  }}>
            <Box sx={{width: "50%", display: "flex", justifyContent:"end", paddingRight: "1.5rem"}} id={"split-cost"}>
                <Typography> {name}</Typography>
            </Box>
            <Box>
                <Typography> {amount} $ </Typography>
            </Box>
        </Box>
    );
}
