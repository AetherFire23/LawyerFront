"use client";

import {
    usePaymentInitialization
} from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/payment/payment-hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { enhancedApi } from "@/Redux/codegen/enhancedApi";
import { DumbSuspenseCondition } from "@/Components/DumbGetCasesSusense";
import { InvoicePaymentDto, usePutInvoiceUpdateinvoicepaymentMutation } from "@/Redux/codegen/userApi2Gen";
import { useFormReset } from "@/app/homePage/clients/clientpage/infopage/infpoage-hooks";
import { FormBody, FormContainer, FormField, FormHeader } from "@/Components/GenericForms/FormBody";
import { SaveIconButton } from "@/Components/Icons/Icons";
import { Box, Typography } from "@mui/material";
import ArchivePaymentWithModal
    from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/payment/_components/ArchivePaymentWithModal";
import { useSearchParams } from "next/navigation";
import { DatePicker } from "@mui/x-date-pickers";
import useControlledDatePicker from "@/Hooks/useControlledDatePicker";
import { produce } from "immer";
import { DateTime } from "luxon";

export default function PaymentPage() {
    const invoicePayment = usePaymentInitialization();
    const { isSuccess, isFetching } = enhancedApi.useGetCaseGetcasescontextQuery();

    return (
        <div>
            <label> am i loading</label>
            <DumbSuspenseCondition condition={(isSuccess && !isFetching) && !!invoicePayment}>
                <InvoicePaymentForm invoicePayment={invoicePayment!} isSuccess={isSuccess}/>
            </DumbSuspenseCondition>
        </div>
    );
}

// DateimPicker https://mui.com/x/react-date-pickers/getting-started/
function InvoicePaymentForm({ invoicePayment, isSuccess }: { invoicePayment: InvoicePaymentDto, isSuccess: boolean }) {
    const params = useSearchParams();
    const invoiceId = params.get("invoiceId");
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm<InvoicePaymentDto>({ defaultValues: invoicePayment! });
    const [trig,] = usePutInvoiceUpdateinvoicepaymentMutation();
    useFormReset(isSuccess, invoicePayment!, reset);

    const { value, onChangeHandler, setValue } = useControlledDatePicker(invoicePayment.amoundPaidDate!);

    const onSubmit: SubmitHandler<InvoicePaymentDto> = async (formPaymentDto) => {
        const nextFormPayment = produce(formPaymentDto, formPaymentDraft => {
            formPaymentDraft.amoundPaidDate = dateAsIso8061;
        });
        trig({ body: nextFormPayment });
        console.log(formPaymentDto);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ width: "50vw" }}>
                <FormContainer submitHandler={handleSubmit(onSubmit)}>
                    <FormHeader title={"Modify Payment"}>
                        <SaveIconButton type={"submit"}/>
                        <ArchivePaymentWithModal
                            payment={invoicePayment}
                            invoiceId={invoiceId!}/>
                    </FormHeader>
                    <FormBody>
                        <FormField text={"PaymentMethod"} register={register("method")}/>
                        <FormField text={"amount paid"} register={register("amountPaid", { valueAsNumber: true })}/>
                        <DatePicker
                            value={value}
                            onChange={onChangeHandler}
                            sx={{ width: "70%", marginBottom: "1rem" }}/>
                    </FormBody>
                </FormContainer>

                {errors.amountPaid && (
                    <Typography>
                        ERr
                    </Typography>
                )}
            </Box>
        </Box>
    );
}
