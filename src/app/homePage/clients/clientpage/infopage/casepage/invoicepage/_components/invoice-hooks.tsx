import { useSearchParams } from "next/navigation";
import { GetCases } from "@/TypeScriptExtensions/CaseContextDtoExtensions";
import { isValidArray } from "@/TypeScriptExtensions/ArrayExtensions";
import { InvoiceDto } from "@/Redux/codegen/userApi2Gen";
import useStoreUserFromLocalStorage from "@/Hooks/useGetCasesLocal";
import { useAppSelector } from "@/Redux/hooks";

export function useInvoiceDtoFromSearchParam() {
    useStoreUserFromLocalStorage()
    const params = useSearchParams()
    const invoiceId = params.get('invoiceId')
    const caseCtx = useAppSelector(c => c.caseSlice)
    const cases = GetCases(caseCtx)
    const invoices = cases?.flatMap(c => c.invoices)
    const invoiceDto = isValidArray(invoices)
        ? invoices.find(i => i?.id === invoiceId)
        : {} as InvoiceDto

    return invoiceDto;
}

