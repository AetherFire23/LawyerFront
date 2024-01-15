import { Typography } from "@mui/material";
import KeyedList from "../../../../../../../../LogicFiles/Components/KeyedList";
import {
    ActivityDto,
} from "../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import Button from "@mui/material/Button";
import ActivitySummary from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/ActivitySummary";
import { useNavigations } from "../../../../../../../../LogicFiles/Hooks/Navigations";
import { enhancedApi } from "../../../../../../../../LogicFiles/Redux/codegen/enhancedApi";

interface INonTaxableDisbursesSectionProps {
    nonTaxables: ActivityDto[],
    invoiceId: string
}

export default function NonTaxableDisbursesSection({ nonTaxables, invoiceId }: INonTaxableDisbursesSectionProps) {
    const render = (nonTaxableDisburse: ActivityDto) => (<ActivitySummary activity={nonTaxableDisburse} invoiceId={invoiceId}/>);
    return (
        <div>
            <h1> Non Taxable Disburses section </h1>
            <KeyedList list={nonTaxables} renderer={render}/>
            <AddNonTaxableDisburseButton invoiceId={invoiceId}/>
        </div>
    );
}

function NonTaxableDisburse({ nonTaxable }: { nonTaxable: ActivityDto }) {
    return (
        <Typography> Non Taxable Disburse </Typography>
    );
}


function AddNonTaxableDisburseButton({ invoiceId }: { invoiceId: string }) {
    const { navigateToActivity } = useNavigations();
    const [triggerAddActivity, data] = enhancedApi.usePostInvoiceCreateactivityMutation();

    function addActivityThenNavigate() {
        triggerAddActivity({ invoiceId: invoiceId, isDisburse: true, isTaxable: false }).unwrap().then(c => {
            navigateToActivity(c, invoiceId);
        });
    }

    return (
        <Button onClick={addActivityThenNavigate}> Add Non Taxable Disburse </Button>
    );
}
