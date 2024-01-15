import { useNavigations } from "../../../../../../LogicFiles/Hooks/Navigations";
import logObject from "../../../../../../LogicFiles/Utils/logObject";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { enhancedApi } from "../../../../../../LogicFiles/Redux/codegen/enhancedApi";

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
        <div>
            <Fab onClick={addClientThenNavigate} color="primary" aria-label="add">
                <AddIcon/>
            </Fab>
        </div>
    );
}
