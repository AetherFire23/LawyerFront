import { Typography } from "@mui/material";
import KeyedList from "../../../../../../../../LogicFiles/Components/KeyedList";
import {
    ActivityDto,
    usePostInvoiceCreateactivityMutation
} from "../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { useActivityNavigation, useNavigateToClient } from "../../../../../../../../LogicFiles/Hooks/Navigations";
import Button from "@mui/material/Button";


interface INonTaxableDisbursesSectionProps {
    nonTaxables: ActivityDto[],
    invoiceId: string
}


export default function NonTaxableDisbursesSection({ nonTaxables, invoiceId }: INonTaxableDisbursesSectionProps) {
    const render = (nonTaxableDisburse: ActivityDto) => (<NonTaxableDisburse nonTaxable={nonTaxableDisburse}/>);
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
    const navigateToActivity = useActivityNavigation();
    const [triggerAddActivity, data] = usePostInvoiceCreateactivityMutation();

    function addActivityThenNavigate() {
        triggerAddActivity({ invoiceId: invoiceId, isDisburse: true, isTaxable: false }).unwrap().then(c => {
            navigateToActivity(c);
        });
    }

    return (
        <Button onClick={addActivityThenNavigate}> Add Non Taxable Disburse </Button>
    );
}
