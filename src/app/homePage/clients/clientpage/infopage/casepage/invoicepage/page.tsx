'use client'

import { useAppSelector } from "@/app/Redux/hooks";
import { useSearchParams } from "next/navigation";
import { GetCases } from "../../../../../../../../LogicFiles/TypeScriptExtensions/CaseContextDtoExtensions";
import { isValidArray } from "../../../../../../../../LogicFiles/TypeScriptExtensions/ArrayExtensions";
import { ActivityDto, InvoiceDto, useGetCaseGetcasescontextQuery, usePostInvoiceCreateactivityMutation } from "@/app/Redux/codegen/userApi2Gen";
import { DumbGetCasesSuspense } from "../../../../../../../../LogicFiles/Components/DumbGetCasesSusense";
import useStoreUserFromLocalStorage from "../../../../../../../../LogicFiles/Hooks/useGetCasesLocal";
import { Container, Typography } from "@mui/material";
import { act } from "react-dom/test-utils";
import { Button } from '@mui/material'
import { useRouter } from "next/navigation";

function useInvoiceDtoFromSearchParam() {
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

export default function InvoicePage() {
    const invoiceDto = useInvoiceDtoFromSearchParam()

    // ds le backend jva amener le invoice summary dans le invoiceDto
    // et faire le mutual dependency thing 
    return (
        <DumbGetCasesSuspense>
            <label> invoice page</label>
            <InvoiceDetails invoice={invoiceDto!} />
        </DumbGetCasesSuspense>
    )
}

// InvoiceDetails
function InvoiceDetails({ invoice }: { invoice: InvoiceDto }) {
    return (
        <Container sx={{ width: '50vw' }}>
            <HourlyActivities activities={invoice.activities} />
        </Container>
    )
}


// HourlyActivities
function HourlyActivities({ activities, activityId }: { activities: ActivityDto[] | null | undefined, activityId: string }) {
    const isValid = isValidArray(activities)
    return (
        <div>
            <ul>
                {isValid && (activities?.map(c => (
                    <li key={c.id}>
                        <HourlyActivity activity={c} />
                    </li>
                )))}
            </ul>

            <AddActivityButton invoiceId={activityId} />
        </div>
    )
}

function HourlyActivity({ activity }: { activity: ActivityDto }) {

    return (
        <>
            <Typography> {activity.createdAt} </Typography>
            <Typography> {activity.description} </Typography>
            <Typography> {activity.costInDollars} </Typography>
            <Typography> {activity.quantity} </Typography>
            <Typography> {activity.totalCost} </Typography>
        </>
    )
}

function AddActivityButton({ invoiceId }: { invoiceId: string }) {
    const router = useRouter()
    const [triggerAddActivity, data] = usePostInvoiceCreateactivityMutation()

    function addActivity() {
        triggerAddActivity({ invoiceId: invoiceId }).unwrap().then(c => {
            router.push(`/homePage/clients/clientpage/infopage/casepage/invoicepage/activity?invoiceId=${invoiceId}`)
        })
    }
    return (
        <>
            <Button onClick={addActivity}> Add Activity </Button>
        </>
    )
}

// Disburses

// Taxable Disburses

// Non taxable disburses

// Payments

// Invoice Summation