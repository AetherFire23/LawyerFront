import { CasesContext } from "../../../../mercichatgpt/ProcedureMakerServer/Dtos/CasesContext";
import { AuthenticationActionTypes, useAuthenticationContext, useAuthenticationDispatch } from "../AuthenticationSlice/AuthenticationContext";
import { useCasesDispatch, CasesActionData, CasesActionTypes } from './CaseContext';
import { getCases } from "./CaseRequests";


interface CaseActions {
    refreshCases: () => Promise<CasesContext>
}

export function useCaseActions() {
    const caseDispatch = useCasesDispatch()
    const authContext = useAuthenticationContext()

    const refreshCases = async () => {
        const cases = await getCases(authContext?.lawyerId as string)
        console.log(caseDispatch)
        console.log(cases)

        caseDispatch?.({ actionType: CasesActionTypes.overWriteCases, info: cases })
        return cases
    }

    const caseActions: CaseActions = {
        refreshCases: refreshCases,
    }

    return caseActions
}