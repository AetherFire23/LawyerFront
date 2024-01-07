'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { CaseDto, InvoiceDto, useGetCaseGetcasescontextQuery, usePostInvoiceCreateinvoiceMutation } from '../../../../../Redux/codegen/userApi2Gen';
import { Button, Container, Typography } from "@mui/material";
import { useAppSelector } from "@/app/Redux/hooks";
import { GetCases } from "../../../../../../../LogicFiles/TypeScriptExtensions/CaseContextDtoExtensions";
import caseSlice from "@/app/Redux/Slices/caseSlice";
import { isValidArray } from "../../../../../../../LogicFiles/TypeScriptExtensions/ArrayExtensions";
import useStoreUserFromLocalStorage from "../../../../../../../LogicFiles/Hooks/useGetCasesLocal";

function useCaseDtoFromParam() {
    // should check if fetching befaire all this could result in lesser null checking
    useStoreUserFromLocalStorage()
    const params = useSearchParams()
    const caseId = params.get("caseId")
    const caseCtx = useAppSelector(c => c.caseSlice)
    const cases = GetCases(caseCtx)
    const isValidArr = isValidArray(cases)
    const caseDto = isValidArr
        ? cases.find(c => c.id === caseId)
        : {} as CaseDto

    return caseDto
}

export default function CasePage() {
    const caseDto = useCaseDtoFromParam()
    const { isSuccess } = useGetCaseGetcasescontextQuery()

    return (
        <Container sx={{ width: '30vw' }}>
            {!isSuccess && (<div> Loading... </div>)}
            {isSuccess &&
                (
                    <>
                        <div> should be a form here</div>
                        <InvoiceList invoices={caseDto?.invoices} caseId={caseDto?.id} />
                    </>
                )}

        </Container>
    )
}

function InvoiceList({ invoices, caseId }: { invoices: InvoiceDto[] | undefined | null, caseId: string | undefined }) {

    return (
        <Container>
            <div> Invoices: </div>
            <AddInvoiceButton caseId={caseId} />
            <ul>
                {isValidArray(invoices) &&
                    invoices?.map(i => (
                        <li key={i.id}>
                            <Invoice invoice={i} />
                        </li>
                    ))
                }
            </ul>
        </Container>
    )
}

function Invoice({ invoice }: { invoice: InvoiceDto }) {
    return (
        <Container>
            <Typography> {invoice.id}</Typography>
        </Container>
    )
}

function AddInvoiceButton({ caseId }: { caseId: string | undefined }) {
    const [triggerAddInvoice, queryData] = usePostInvoiceCreateinvoiceMutation()
    const navigateToInvoice = useNavigateToInvoice()
    function addInvoice() {
        triggerAddInvoice({ caseId: caseId }).unwrap()
            .then(invoiceId => {
                navigateToInvoice(invoiceId)
            })
    }
    return (
        <Button onClick={addInvoice}>
            Add Invoice
        </Button>
    )
}

function useNavigateToInvoice() {
    const router = useRouter()
    function navigate(invoiceId: string) {
        router.push(`/homePage/clients/clientpage/infopage/casepage/invoicepage?invoiceId=${invoiceId}`)
    }

    return navigate
}