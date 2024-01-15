import useStoreUserFromLocalStorage from "../../../../../../../LogicFiles/Hooks/useGetCasesLocal";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "../../../../../../../LogicFiles/Redux/hooks";
import { GetCases } from "../../../../../../../LogicFiles/TypeScriptExtensions/CaseContextDtoExtensions";
import { isValidArray } from "../../../../../../../LogicFiles/TypeScriptExtensions/ArrayExtensions";
import { CaseDto } from "../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { produce } from "immer";

export function useCaseDtoFromParam() {
    // should check if fetching befaire all this could result in lesser null checking
    useStoreUserFromLocalStorage();
    const params = useSearchParams();
    const caseId = params.get("caseId");
    const caseCtx = useAppSelector(c => c.caseSlice);
    const cases = GetCases(caseCtx);
    const isValidArr = isValidArray(cases);

    const caseDto = isValidArr
        ? cases.find(c => c.id === caseId)
        : {} as CaseDto;

    return caseDto;
}


export function mapCaseFormDataToDto(caseDto: CaseDto, caseForm: CaseDto) {

    const nextCaseDto = produce(caseDto, caseDraft => {
        caseDraft.caseNumber = caseForm.caseNumber
        caseDraft.chamberName = caseForm.chamberName
    });

    return nextCaseDto
}
