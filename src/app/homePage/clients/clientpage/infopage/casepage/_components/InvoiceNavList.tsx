import {
    InvoiceDto,
} from "../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { Container } from "@mui/material";
import KeyedList from "../../../../../../../../LogicFiles/Components/KeyedList";
import CreateInvoiceButton from "@/app/homePage/clients/clientpage/infopage/casepage/_components/CreateInvoiceButton";
import Invoice from "@/app/homePage/clients/clientpage/infopage/casepage/_components/InvoiceNavCard";
import { enhancedApi } from "../../../../../../../../LogicFiles/Redux/codegen/enhancedApi";

export default function InvoiceNavList({ invoices, caseId }: { invoices: InvoiceDto[] | undefined | null, caseId: string | undefined }) {
    const invoiceRenderer = (invoice: InvoiceDto) => (<Invoice invoice={invoice}/>);
    const {} = enhancedApi.useGetCaseGetcasescontextQuery();
    return (
        <Container>
            <div> Invoices:</div>
            <CreateInvoiceButton caseId={caseId}/>
            <KeyedList list={invoices!} renderer={invoiceRenderer}/>
        </Container>
    );
}
