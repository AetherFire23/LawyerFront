import { useNavigations } from "../../../../../../../../LogicFiles/Hooks/Navigations";
import { Button, SxProps, Theme } from "@mui/material";
import { enhancedApi } from "../../../../../../../../LogicFiles/Redux/codegen/enhancedApi";
import BasicAddFab from "../../../../../../../../LogicFiles/Components/BasicAddFab";


interface CreateInvoiceButtonProps{
    caseId: string,
    sx?: SxProps<Theme>

}

export default function CreateInvoiceButton({ caseId, sx }: CreateInvoiceButtonProps) {
    const [triggerAddInvoice, queryData] = enhancedApi.usePostInvoiceCreateinvoiceMutation();
    const { navigateToInvoice } = useNavigations();

    function onAddInvoiceButtonClick() {
        triggerAddInvoice({ caseId: caseId }).unwrap()
            .then(invoiceId => {
                navigateToInvoice(invoiceId);
            });
    }

    return (
        <BasicAddFab onClick={onAddInvoiceButtonClick} sx={sx}/>
    );
}
