"use client";

import { Container } from "@mui/material";
import { DumbSuspenseCondition } from "../../../../../../../LogicFiles/Components/DumbGetCasesSusense";
import { useCaseDtoFromParam } from "@/app/homePage/clients/clientpage/infopage/casepage/casePage-hooks";
import InvoiceNavList from "@/app/homePage/clients/clientpage/infopage/casepage/_components/InvoiceNavList";
import CaseForm from "@/app/homePage/clients/clientpage/infopage/casepage/_components/CaseForm";
import { enhancedApi } from "../../../../../../../LogicFiles/Redux/codegen/enhancedApi";

export default function CasePage() {
    const caseDto = useCaseDtoFromParam();
    const { isSuccess, isFetching } = enhancedApi.useGetCaseGetcasescontextQuery();

    return (
        <DumbSuspenseCondition condition={isSuccess && !isFetching && !!caseDto}>
            {caseDto && (
                <Container sx={{width: "100vw"}}>
                    <CaseForm caseDto={caseDto}/>
                    <InvoiceNavList invoices={caseDto?.invoices} caseId={caseDto?.id}/>
                </Container>
            )}
        </DumbSuspenseCondition>
    );
}


// function useNavigateToInvoice() {
//     const router = useRouter();
//
//     function navigate(invoiceId: string) {
//         router.push(`/homePage/clients/clientpage/infopage/casepage/invoicepage?invoiceId=${invoiceId}`);
//     }
//
//     return navigate;
// }
