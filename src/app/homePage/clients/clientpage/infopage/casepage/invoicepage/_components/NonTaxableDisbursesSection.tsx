import { Box, Container, Fab, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ActivityDto } from "@/Redux/codegen/userApi2Gen";
import { useNavigations } from "@/Hooks/Navigations";
import { enhancedApi } from "@/Redux/codegen/enhancedApi";
import TitleDivider from "@/Components/TitleDivider";
import InsetList from "@/Components/BasicListTest";

interface INonTaxableDisbursesSectionProps {
    nonTaxables: ActivityDto[],
    invoiceId: string
}

export default function NonTaxableDisbursesSection({ nonTaxables, invoiceId }: INonTaxableDisbursesSectionProps) {
    const { navigateToActivity } = useNavigations();

    return (
        <Box
            sx={{
                width: "50vw",
                marginTop: "2rem",
                alignItems: "center",
            }}>
            <Paper sx={{ marginBottom: "1rem" }}>
                <TitleDivider title={"Non Taxable Disburses"}>
                    <AddNonTaxableDisburseButton invoiceId={invoiceId}/>
                </TitleDivider>
                <InsetList
                    items={nonTaxables!}
                    onClickHandler={(arg) => navigateToActivity(arg.id, invoiceId)}
                    toStringValue={(arg) => arg.createdAt!.toString()}
                    maxHeight={"22rem"}
                />
            </Paper>
        </Box>
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
        <Fab size={"medium"} color={"primary"} onClick={addActivityThenNavigate} sx={{marginLeft: "1rem"}}>
            <AddIcon/>
        </Fab>
    );
}
