import { CasesContext } from "../../../../mercichatgpt/ProcedureMakerServer/Dtos/CasesContext";
import { CasesActionData, CasesActionTypes } from "./CaseContext";

export default function casesReducer(cases: CasesContext | null, payload: CasesActionData) { 
    // const action: (data: CasesContext | null) => void = actionDispatcher[payload.actionType]
    // action(userDto)

    switch (payload.actionType) {
        case CasesActionTypes.overWriteCases: {
            cases = {
                ...payload.info
            }
            return cases;
        }
    }

    return;
}