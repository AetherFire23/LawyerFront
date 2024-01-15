import {
    ActivityDto,
} from "../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { RenderKeyedList } from "@/app/homePage/clients/clientpage/infopage/infpoage-hooks";
import Button from "@mui/material/Button";
import ActivitySummary from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/ActivitySummary";
import { useNavigations } from "../../../../../../../../LogicFiles/Hooks/Navigations";
import { enhancedApi } from "../../../../../../../../LogicFiles/Redux/codegen/enhancedApi";

interface ITaxableDisbursesSectionProps {
    taxableDisburses: ActivityDto[],
    invoiceId: string,
}

export default function TaxableDisbursesSection({ taxableDisburses, invoiceId }: ITaxableDisbursesSectionProps) {
    if (!taxableDisburses) return <div></div>;

    const taxableDisburseRenderer = (a: ActivityDto) => (<ActivitySummary activity={a} invoiceId={invoiceId}/>);
    return (
        <div>
            <h1> taxable disburses section </h1>
            <RenderKeyedList keyedObjects={taxableDisburses} componentRenderer={taxableDisburseRenderer}/>
            <AddTaxableDisburseButton invoiceId={invoiceId}/>
        </div>
    );
}
function AddTaxableDisburseButton({ invoiceId }: { invoiceId: string }) {
    const { navigateToActivity } = useNavigations()
    const [triggerAddActivity, data] = enhancedApi.usePostInvoiceCreateactivityMutation();

    function addActivityThenNavigate() {
        triggerAddActivity({ invoiceId: invoiceId, isTaxable: true, isDisburse: true }).unwrap().then(activityId => {
            navigateToActivity(activityId, invoiceId);
        });
    }

    return (
        <Button onClick={addActivityThenNavigate}> Add Taxable Disburse </Button>
    );
}
