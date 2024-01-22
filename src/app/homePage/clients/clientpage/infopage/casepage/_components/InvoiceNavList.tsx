import { Container, Paper } from "@mui/material";
import CreateInvoiceButton from "@/app/homePage/clients/clientpage/infopage/casepage/_components/CreateInvoiceButton";
import { InvoiceDto } from "@/Redux/codegen/userApi2Gen";
import { enhancedApi } from "@/Redux/codegen/enhancedApi";
import { useNavigations } from "@/Hooks/Navigations";
import TitleDivider from "@/Components/TitleDivider";
import InsetList from "@/Components/BasicListTest";

export default function InvoiceNavList({ invoices, caseId }: {
    invoices: InvoiceDto[] | undefined | null,
    caseId: string | undefined
}) {
    const {} = enhancedApi.useGetCaseGetcasescontextQuery();
    const { navigateToInvoice } = useNavigations();

    return (
        // make screen half of window, some margin at top
        <Container
            sx={{
                width: "54vw",
                marginTop: "2rem",
                alignItems: "center"
            }}>
            <Paper sx={{ marginBottom: "1rem" }}>
                    <TitleDivider title={"Invoices"}>
                        <CreateInvoiceButton caseId={caseId!} sx={{ marginLeft: "1rem" }}/>
                    </TitleDivider>
                    <InsetList
                        items={invoices!}
                        onClickHandler={(arg) => navigateToInvoice(arg.id)}
                        toStringValue={(arg) => arg.invoiceNumber!.toString()}
                        maxHeight={"22rem"}
                    />
            </Paper>
        </Container>
    );
}
