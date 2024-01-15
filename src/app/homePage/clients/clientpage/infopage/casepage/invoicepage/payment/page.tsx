"use client";

import {
    usePaymentInitialization
} from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/payment/payment-hooks";
import { useForm } from "react-hook-form";
import {
    InvoicePaymentDto,
} from "../../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { DumbSuspenseCondition } from "../../../../../../../../../LogicFiles/Components/DumbGetCasesSusense";
import { enhancedApi } from "../../../../../../../../../LogicFiles/Redux/codegen/enhancedApi";

export default function PaymentPage() {
    const invoicePayment = usePaymentInitialization();
    const {} = enhancedApi.useGetCaseGetcasescontextQuery();

    return (
        <div>
            <DumbSuspenseCondition condition={!!invoicePayment}>
                <InvoicePaymentForm invoicePayment={invoicePayment!}/>
            </DumbSuspenseCondition>
        </div>
    );
}

function InvoicePaymentForm({ invoicePayment }: { invoicePayment: InvoicePaymentDto }) {
    const
        {
            register, reset,
        }
            = useForm<InvoicePaymentDto>({ defaultValues: invoicePayment! });
    return (
        <div>

        </div>
    );
}
