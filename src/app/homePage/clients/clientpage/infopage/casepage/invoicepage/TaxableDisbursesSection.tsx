import {
    ActivityDto,
} from "../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { RenderKeyedList } from "@/app/homePage/clients/clientpage/infopage/infpoage-hooks";
import Button from "@mui/material/Button";
import ActivitySummary from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/ActivitySummary";
import { useNavigations } from "../../../../../../../../LogicFiles/Hooks/Navigations";
import { enhancedApi } from "../../../../../../../../LogicFiles/Redux/codegen/enhancedApi";
import { Container, Fab, Paper } from "@mui/material";
import TitleDivider from "../../../../../../../../LogicFiles/Components/TitleDivider";
import InsetList from "../../../../../../../../LogicFiles/Components/BasicListTest";
import AddIcon from "@mui/icons-material/Add";

interface ITaxableDisbursesSectionProps {
    taxableDisburses: ActivityDto[],
    invoiceId: string,
}

export default function TaxableDisbursesSection({ taxableDisburses, invoiceId }: ITaxableDisbursesSectionProps) {
    const { navigateToActivity } = useNavigations();
    if (!taxableDisburses) return <div></div>;
    const taxableDisburseRenderer = (a: ActivityDto) => (<ActivitySummary activity={a} invoiceId={invoiceId}/>);
    return (
        <Container
            sx={{
                width: "54vw",
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
        </Container>
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
