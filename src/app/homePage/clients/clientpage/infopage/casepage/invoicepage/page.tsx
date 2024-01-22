"use client";

import TaxableDisbursesSection
    from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/_components/TaxableDisbursesSection";
import {
    useInvoiceDtoFromSearchParam
} from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/_components/invoice-hooks";
import { DumbSuspenseCondition } from "@/Components/DumbGetCasesSusense";
import { InvoiceDto } from "@/Redux/codegen/userApi2Gen";
import { Box, Container } from "@mui/material";
import HourlyActivitiesSection
    from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/_components/HourlyActivitiesSection";
import NonTaxableDisbursesSection
    from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/_components/NonTaxableDisbursesSection";
import SummationSection
    from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/_components/SummationSection";
import DownloadInvoiceButton
    from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/_components/DownloadInvoiceButton";
import PaymentsSection
    from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/_components/PaymentsSection";

export default function InvoicePage() {
    const invoiceDto = useInvoiceDtoFromSearchParam();

    return (
        <DumbSuspenseCondition condition={!!invoiceDto}>
            <InvoiceDetails invoice={invoiceDto!}/>
        </DumbSuspenseCondition>
    );
}

function InvoiceDetails({ invoice }: { invoice: InvoiceDto }) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ width: "50vw" }}>
                <HourlyActivitiesSection hourlyActivities={invoice.hourlyActivities} invoiceId={invoice.id}/>
                <TaxableDisbursesSection taxableDisburses={invoice.taxableDisburses!} invoiceId={invoice.id}/>
                <NonTaxableDisbursesSection nonTaxables={invoice.nonTaxableDisburses!} invoiceId={invoice.id}/>
                <PaymentsSection payments={invoice.payments!} invoiceId={invoice.id}/>
                <SummationSection invoiceSummation={invoice.invoiceSummation!}/>
                <DownloadInvoiceButton invoiceId={invoice.id}/>
            </Box>
        </Box>
    );
}
