import { CaseContextDto, CaseDto } from '../Redux/codegen/userApi2Gen';

export function GetCases(caseContext: CaseContextDto | undefined): CaseDto[] {
    const cases = caseContext?.clients?.flatMap(c => c.cases) as CaseDto[]
    return cases 
}