import useStoreUserFromLocalStorage from "../../../../../../../../LogicFiles/Hooks/useGetCasesLocal";
import { useAppSelector } from "../../../../../../../../LogicFiles/Redux/hooks";
import { GetCases } from "../../../../../../../../LogicFiles/TypeScriptExtensions/CaseContextDtoExtensions";
import { isValidArray } from "../../../../../../../../LogicFiles/TypeScriptExtensions/ArrayExtensions";
import { InvoiceDto } from "../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { useSearchParams } from "next/navigation";

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

