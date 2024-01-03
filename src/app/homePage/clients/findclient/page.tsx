'use client'
import { useAppSelector } from '@/app/Redux/hooks'
import { useRouter } from 'next/navigation';
import styles from './cardHover.module.css'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import useGetCasesLocal from '@/app/Hooks/useGetCasesLocal';
import { CaseDto, useGetCaseGetcasescontextQuery } from '@/app/Redux/codegen/userApi2Gen';
import { GetCases } from '@/app/TypeScriptExtensions/CaseContextDtoExtensions';
export default function FindClient() {
    const caseSlice = useAppSelector(s => s.userSlice.userDto)

    useGetCasesLocal()
    const { isError, isFetching, data: caseContext } = useGetCaseGetcasescontextQuery()

    return (
        <div>
            {(!isError && !isFetching) && <CaseList caseDtos={GetCases(caseContext)} />}
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
        <Container>
            <Box>
                <Stack direction='row' justifyContent='center' alignContent='center' >
                    <ul>
                        {caseDtos?.map(c => (
                            <li key={c.id}>
                                <CaseSummary caseDto={c} />
                            </li>
                        ))}
                    </ul>
                </Stack>
            </Box>
        </Container>
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
        <div onClick={navigateToClientPage}>
            {/* <TitleCard title={caseDto.client.firstName} subText={caseDto.caseNumber} /> */}
            <Card>
                <Box sx={{ margin: "2rem", padding: '2rem'} }>
                    <Stack alignContent={'center'} justifyItems='center'>
                        <Typography alignItems={'center'} justifyContent={'center'}> Test </Typography>
                    </Stack>
                </Box>
            </Card>
        </div >
    )
}