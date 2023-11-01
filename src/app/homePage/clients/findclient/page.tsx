'use client'
import { useCasesContext } from '@/app/Contexts/CaseSlice/CaseContext'
import { useSearchParams } from 'next/navigation'
import { Client } from '../../../../../mercichatgpt/ProcedureMakerServer/Entities/Client'
import { CaseDto } from '../../../../../mercichatgpt/ProcedureMakerServer/Dtos/CaseDto'
export default function FindClient() {
    const caseContext = useCasesContext()
    console.log(caseContext)

    return (
        <div>
            <label> client page </label>
            <CaseList caseDtos={caseContext?.cases as CaseDto[]}></CaseList>

        </div>
    )
}


interface ICaseListProps {
    caseDtos: CaseDto[]
}
function CaseList({ caseDtos }: ICaseListProps) {

    return (
        <div>
            {caseDtos !== null && (
                <ul>
                    {caseDtos.map(c => (
                        <li key={c.client.id}>{c.client.firstName}</li>
                    ))}
                </ul>
            )}
        </div>

    )
}
