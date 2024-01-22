import { enhancedApi } from "@/Redux/codegen/enhancedApi";
import { SxProps, Theme } from "@mui/material";
import { useNavigations } from "@/Hooks/Navigations";
import BasicAddFab from "@/Components/BasicAddFab";

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
