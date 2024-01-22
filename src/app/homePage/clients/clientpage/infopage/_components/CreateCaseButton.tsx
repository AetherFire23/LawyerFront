import { enhancedApi } from "@/Redux/codegen/enhancedApi";
import { useNavigations } from "@/Hooks/Navigations";
import BasicAddFab from "@/Components/BasicAddFab";

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
