import { Container, Fab, Paper, Typography } from "@mui/material";
import { ActivityDto, } from "../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import ActivitySummary from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/ActivitySummary";
import { useNavigations } from "../../../../../../../../LogicFiles/Hooks/Navigations";
import { enhancedApi } from "../../../../../../../../LogicFiles/Redux/codegen/enhancedApi";
import TitleDivider from "../../../../../../../../LogicFiles/Components/TitleDivider";
import InsetList from "../../../../../../../../LogicFiles/Components/BasicListTest";
import AddIcon from "@mui/icons-material/Add";

interface INonTaxableDisbursesSectionProps {
    nonTaxables: ActivityDto[],
    invoiceId: string
}

export default function NonTaxableDisbursesSection({ nonTaxables, invoiceId }: INonTaxableDisbursesSectionProps) {
    const { navigateToActivity } = useNavigations();
    const render = (nonTaxableDisburse: ActivityDto) => (
        <ActivitySummary activity={nonTaxableDisburse} invoiceId={invoiceId}/>);
    return (
        <Container
            sx={{
                width: "54vw",
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
        </Container>
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
        <Fab size={"medium"} color={"primary"} onClick={addActivityThenNavigate} sx={{marginLeft: "1rem"}}>
            <AddIcon/>
        </Fab>
    );
}
