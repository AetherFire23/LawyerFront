import { InvoiceDto, } from "../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { Container, Divider, Paper, Typography } from "@mui/material";
import Invoice from "@/app/homePage/clients/clientpage/infopage/casepage/_components/InvoiceNavCard";
import InvoiceNavCard from "@/app/homePage/clients/clientpage/infopage/casepage/_components/InvoiceNavCard";
import { enhancedApi } from "../../../../../../../../LogicFiles/Redux/codegen/enhancedApi";
import CreateInvoiceButton from "@/app/homePage/clients/clientpage/infopage/casepage/_components/CreateInvoiceButton";
import { isValidArray } from "../../../../../../../../LogicFiles/TypeScriptExtensions/ArrayExtensions";
import InsetList from "../../../../../../../../LogicFiles/Components/BasicListTest";
import { useNavigations } from "../../../../../../../../LogicFiles/Hooks/Navigations";
import BasicAddFab from "../../../../../../../../LogicFiles/Components/BasicAddFab";
import TitleDivider from "../../../../../../../../LogicFiles/Components/TitleDivider";

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
