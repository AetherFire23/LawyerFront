import { Box, Container, Fab, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ActivityDto } from "@/Redux/codegen/userApi2Gen";
import { useNavigations } from "@/Hooks/Navigations";
import TitleDivider from "@/Components/TitleDivider";
import InsetList from "@/Components/BasicListTest";
import { enhancedApi } from "@/Redux/codegen/enhancedApi";

interface ITaxableDisbursesSectionProps {
    taxableDisburses: ActivityDto[],
    invoiceId: string,
}

export default function TaxableDisbursesSection({ taxableDisburses, invoiceId }: ITaxableDisbursesSectionProps) {
    const { navigateToActivity } = useNavigations();
    if (!taxableDisburses) return <div></div>;
    return (
        <Box
            sx={{
                width: "50vw",
                marginTop: "2rem",
                alignItems: "center",
            }}>
            <Paper sx={{ marginBottom: "1rem" }}>
                <TitleDivider title={"Taxable Disburses"}>
                    <AddTaxableDisburseButton invoiceId={invoiceId}/>
                </TitleDivider>
                <InsetList
                    items={taxableDisburses!}
                    onClickHandler={(arg) => navigateToActivity(arg.id, invoiceId)}
                    toStringValue={(arg) => arg.createdAt!.toString()}
                    maxHeight={"22rem"}
                />
            </Paper>
        </Box>
    );
}

function AddTaxableDisburseButton({ invoiceId }: { invoiceId: string }) {
    const { navigateToActivity } = useNavigations();
    const [triggerAddActivity, data] = enhancedApi.usePostInvoiceCreateactivityMutation();

    function addActivityThenNavigate() {
        triggerAddActivity({ invoiceId: invoiceId, isTaxable: true, isDisburse: true }).unwrap().then(activityId => {
            navigateToActivity(activityId, invoiceId);
        });
    }

    return (
        <>
            <Fab size="medium" color="primary" sx={{ marginLeft: "1rem" }} onClick={addActivityThenNavigate}>
                <AddIcon/>
            </Fab>
        </>
    );
}
