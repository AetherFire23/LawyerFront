import { useAppSelector } from "@/app/Redux/hooks";
import { CaseDto } from "../../../../../../mercichatgpt/ProcedureMakerServer/Dtos/CaseDto";
import { useSearchParams } from "next/navigation";

export function useCaseDto() {
    const searchParams = useSearchParams()
    const caseId: string = searchParams.get("search") as string
    const cases: CaseDto[] = useAppSelector(s => s.caseSlice.cases)

    const c: CaseDto = cases.find(c => c.id === caseId) as CaseDto // break if not found, not supposed to happen
    return c
}