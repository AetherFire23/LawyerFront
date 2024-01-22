import { useSearchParams } from "next/navigation";
import { produce } from "immer";
import useStoreUserFromLocalStorage from "@/Hooks/useGetCasesLocal";
import { useAppSelector } from "@/Redux/hooks";
import { GetCases } from "@/TypeScriptExtensions/CaseContextDtoExtensions";
import { isValidArray } from "@/TypeScriptExtensions/ArrayExtensions";
import { CaseDto } from "@/Redux/codegen/userApi2Gen";

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
