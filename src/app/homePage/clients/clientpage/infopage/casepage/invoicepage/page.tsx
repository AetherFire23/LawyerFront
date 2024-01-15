"use client";

import {
    DumbSuspenseCondition
} from "../../../../../../../../LogicFiles/Components/DumbGetCasesSusense";
import { Container } from "@mui/material";
import { InvoiceDto } from "../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import HourlyActivitiesSection
    from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/HourlyActivitiesSection";
import {
    useInvoiceDtoFromSearchParam
} from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/invoice-hooks";
import TaxableDisbursesSection
    from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/TaxableDisbursesSection";
import NonTaxableDisbursesSection
    from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/NonTaxableDisbursesSection";
import SummationSection from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/SummationSection";
import DownloadInvoiceButton
    from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/DownloadInvoiceButton";


// will consider making a context to inject the current invoice at this point.

export default function InvoicePage() {
    const invoiceDto = useInvoiceDtoFromSearchParam();

    return (
        <DumbSuspenseCondition condition={!!invoiceDto}>
            <label> invoice page</label>
            <InvoiceDetails invoice={invoiceDto!}/>
        </DumbSuspenseCondition>
    );
}

// InvoiceDetails
function InvoiceDetails({ invoice }: { invoice: InvoiceDto }) {
    return (
        <Container sx={{ width: "50vw" }}>
            <HourlyActivitiesSection hourlyActivities={invoice.hourlyActivities} invoiceId={invoice.id}/>
            <TaxableDisbursesSection taxableDisburses={invoice.taxableDisburses!} invoiceId={invoice.id}/>
            <NonTaxableDisbursesSection nonTaxables={invoice.nonTaxableDisburses!} invoiceId={invoice.id}/>
            <SummationSection invoiceSummation={invoice.invoiceSummation!}/>
            <DownloadInvoiceButton invoiceId={invoice.id}/>
        </Container>
    );
}


// HourlyActivities

// Disburses

// Taxable Disburses

// Non taxable disburses

// Payments

// Invoice Summation
