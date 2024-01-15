import { useNavigations } from "../../../../../../../LogicFiles/Hooks/Navigations";
import Button from "@mui/material/Button";
import { enhancedApi } from "../../../../../../../LogicFiles/Redux/codegen/enhancedApi";

export default function CreateCaseButton({ clientId }: { clientId: string }) {
    const [triggerAddCase, queryData] = enhancedApi.usePostCaseCreatenewcaseMutation();
    const { navigateToCase } = useNavigations();

    function addCaseAndNavigate() {
        triggerAddCase({ clientId: clientId }).unwrap().then(caseid => {
            navigateToCase(caseid.createdId!);
        });
    }

    return (
        <Button onClick={addCaseAndNavigate}> Add Case </Button>
    );
}
