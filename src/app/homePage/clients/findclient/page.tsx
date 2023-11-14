'use client'
import { CaseDto } from '../../../../../mercichatgpt/ProcedureMakerServer/Dtos/CaseDto';
import { useGetCasesQuery } from '@/app/Redux/Apis/caseApi'
import { useAppSelector } from '@/app/Redux/hooks'
import TitleCard from '../../../Controls/TitleCard';
import { useRouter } from 'next/navigation';
import styles from './cardHover.module.css'

export default function FindClient() {
    const caseSlice = useAppSelector(s => s.userSlice.userDto)

    const { isError, isFetching, data: caseContext } = useGetCasesQuery(caseSlice.lawyerId)

    return (
        <div>
            <label> find client page </label>
            {(!isError && !isFetching) && <CaseList caseDtos={caseContext?.cases} />}
        </div>
    )
}

interface ICaseListProps {
    caseDtos: CaseDto[] | undefined
}
function CaseList({ caseDtos }: ICaseListProps) {
    console.log("is case list rendering?")
    console.log(caseDtos)
    return (
        <div className="flex flex-col items-center justify-center">
            <label> client page</label>
            <ul>
                {caseDtos?.map(c => (
                    <li key={c.client.id}>
                        <CaseSummary caseDto={c} />
                    </li>
                ))}
            </ul>
        </div>
    )
}


interface ICaseSummaryProps {
    caseDto: CaseDto
}
function CaseSummary({ caseDto }: ICaseSummaryProps) {
    const caseSlice = useAppSelector(s => s.userSlice.userDto)
    const router = useRouter()
    console.log(`This is `)
    function navigateToClientPage(e: any) {
        router.push(`/homePage/clients/clientpage/infopage?search=${caseDto.id}`)
    }
    return (
        <div className={styles.cardHover} onClick={navigateToClientPage}>
            <TitleCard title={caseDto.client.firstName} subText={caseDto.caseNumber} />
        </div>
    )
}