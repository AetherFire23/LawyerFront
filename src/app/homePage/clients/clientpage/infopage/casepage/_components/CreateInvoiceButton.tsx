import { useNavigations } from "../../../../../../../../LogicFiles/Hooks/Navigations";
import { Button } from "@mui/material";
import { enhancedApi } from "../../../../../../../../LogicFiles/Redux/codegen/enhancedApi";

export default function CreateInvoiceButton({ caseId }: { caseId: string | undefined }) {
    const [triggerAddInvoice, queryData] = enhancedApi.usePostInvoiceCreateinvoiceMutation();
    const { navigateToInvoice } = useNavigations();

    function onAddInvoiceButtonClick() {
        triggerAddInvoice({ caseId: caseId }).unwrap()
            .then(invoiceId => {
                navigateToInvoice(invoiceId);
            });
    }

    return (
        <Button onClick={onAddInvoiceButtonClick}>
            Add Invoice
        </Button>
    );
}
