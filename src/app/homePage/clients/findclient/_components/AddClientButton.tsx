import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigations } from "@/Hooks/Navigations";
import { enhancedApi } from "@/Redux/codegen/enhancedApi";
import logObject from "@/Utils/logObject";

export default function AddClientButton() {
    const { navigateToClient } = useNavigations();
    const [addClientTrigger, data] = enhancedApi.usePutCaseAddclientMutation();

    function addClientThenNavigate() {
        addClientTrigger().unwrap().then(clientId => {
            logObject("add client id:", clientId)
            navigateToClient(clientId);
        });
    }

    return (
        <>
            {/* https://mui.com/material-ui/react-floating-action-button/ */}
            <Fab size={"medium"} onClick={addClientThenNavigate} color="primary" aria-label="add" sx={{marginLeft: "1rem"}}>
                <AddIcon/>
            </Fab>
        </>
    );
}
