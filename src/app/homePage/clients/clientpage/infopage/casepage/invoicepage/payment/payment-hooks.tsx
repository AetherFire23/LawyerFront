import { useSearchParams } from "next/navigation";
import useStoreUserFromLocalStorage from "@/Hooks/useGetCasesLocal";
import { useAppSelector } from "@/Redux/hooks";
import { ActivityDto, InvoicePaymentDto } from "@/Redux/codegen/userApi2Gen";
import logObject from "@/Utils/logObject";

export function usePaymentInitialization() {
    useStoreUserFromLocalStorage();
    const searchParams = useSearchParams();
    const paymentId = searchParams.get("paymentId");
    const caseSlice = useAppSelector(c => c.caseSlice);
    if(!caseSlice || !caseSlice.clients) return {} as InvoicePaymentDto | null | undefined;

    // this is probably pushable into back-end instead of mapping here
    const payments = caseSlice!.clients!.flatMap(c => c.cases)!.flatMap(c => c!.invoices)!.flatMap(c => c!.payments);


    const payment = payments
        ? payments.find(a => a!.id === paymentId)
        : {} as InvoicePaymentDto | null | undefined;

    return payment;
}
