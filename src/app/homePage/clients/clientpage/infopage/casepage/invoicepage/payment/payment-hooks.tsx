import useStoreUserFromLocalStorage from "../../../../../../../../../LogicFiles/Hooks/useGetCasesLocal";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "../../../../../../../../../LogicFiles/Redux/hooks";
import { ActivityDto, InvoicePaymentDto } from "../../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import logObject from "../../../../../../../../../LogicFiles/Utils/logObject";

export function usePaymentInitialization() {
    useStoreUserFromLocalStorage();
    const searchParams = useSearchParams();
    const paymentId = searchParams.get("paymentId");
    const caseSlice = useAppSelector(c => c.caseSlice);

    // this is probably pushable into back-end instead of mapping here
    const payments = caseSlice!.clients!.flatMap(c => c.cases)!.flatMap(c => c!.invoices)!.flatMap(c => c!.payments);
    const payment = payments
        ? payments.find(a => a!.id === paymentId)
        : {} as InvoicePaymentDto | null | undefined;

    logObject("was this null when page loaded", payment);
    return payment;
}
