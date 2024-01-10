import {
    ActivityDto,
    usePostInvoiceCreateactivityMutation
} from "../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { RenderKeyedList } from "@/app/homePage/clients/clientpage/infopage/infpoage-hooks";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigateToActivity, useNavigateToClient } from "../../../../../../../../LogicFiles/Hooks/Navigations";

interface ITaxableDisbursesSectionProps {
    taxableDisburses: ActivityDto[],
    invoiceId: string,
}

export default function TaxableDisbursesSection({ taxableDisburses, invoiceId }: ITaxableDisbursesSectionProps) {
    if (!taxableDisburses) return <div></div>;

    const taxableDisburseRenderer = (a: ActivityDto) => (<TaxableDisburse activity={a}/>);
    return (
        <div>
            <h1> taxable disburses section </h1>
            <RenderKeyedList keyedObjects={taxableDisburses} componentRenderer={taxableDisburseRenderer}/>
            <AddTaxableDisburseButton invoiceId={invoiceId}/>
        </div>
    );
}

function TaxableDisburse({ activity }: { activity: ActivityDto }) {
    return (
        <>
            <Typography> Supposed to be a taxable disburse summary hereg </Typography>
        </>
    );
}

function AddTaxableDisburseButton({ invoiceId }: { invoiceId: string }) {
    const navigateToActivity = useNavigateToActivity();
    const [triggerAddActivity, data] = usePostInvoiceCreateactivityMutation();

    function addActivityThenNavigate() {
        triggerAddActivity({ invoiceId: invoiceId, isTaxable: true, isDisburse: true }).unwrap().then(activityId => {
            navigateToActivity(activityId, invoiceId);
        });
    }

    return (
        <Button onClick={addActivityThenNavigate}> Add Taxable Disburse </Button>
    );
}
