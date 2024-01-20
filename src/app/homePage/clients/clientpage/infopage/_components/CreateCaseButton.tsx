import { useNavigations } from "../../../../../../../LogicFiles/Hooks/Navigations";
import { enhancedApi } from "../../../../../../../LogicFiles/Redux/codegen/enhancedApi";
import BasicAddFab from "../../../../../../../LogicFiles/Components/BasicAddFab";


export default function CreateCaseButton({ clientId }: { clientId: string }) {
    const [triggerAddCase, queryData] = enhancedApi.usePostCaseCreatenewcaseMutation();
    const { navigateToCase } = useNavigations();

    function addCaseAndNavigate() {
        triggerAddCase({ clientId: clientId }).unwrap().then(caseid => {
            navigateToCase(caseid.createdId!);
        });
    }

    return (
        <BasicAddFab onClick={addCaseAndNavigate} sx={{
            margin: "1rem"
        }}/>
    );
}
