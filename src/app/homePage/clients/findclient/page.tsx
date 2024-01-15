"use client";
import useStoreUserFromLocalStorage from "../../../../../LogicFiles/Hooks/useGetCasesLocal";
import { useAppSelector } from "../../../../../LogicFiles/Redux/hooks";
import ClientList from "@/app/homePage/clients/findclient/_components/ClientList";
import { DumbSuspenseCondition } from "../../../../../LogicFiles/Components/DumbGetCasesSusense";
import { enhancedApi } from "../../../../../LogicFiles/Redux/codegen/enhancedApi";

export default function FindClientPage() {
    useStoreUserFromLocalStorage();
    const { isSuccess, } = enhancedApi.useGetCaseGetcasescontextQuery();
    const caseSlice = useAppSelector(s => s.caseSlice);

    return (
        <div>
            <DumbSuspenseCondition condition={!!caseSlice.clients && isSuccess}>
                <ClientList clients={caseSlice.clients!}/>
            </DumbSuspenseCondition>
        </div>
    );
}


// interface ICaseListProps {
//     caseDtos: CaseDto[] | undefined
// }

// function CaseList({ caseDtos }: ICaseListProps) {
//     console.log("is case list rendering?")
//     console.log(caseDtos)
//     return (
//         <Container>
//             <Box>
//                 <Stack direction='row' justifyContent='center' alignContent='center' >
//                     <ul>
//                         {caseDtos?.map(c => (
//                             <li key={c.id}>
//                                 <CaseSummary caseDto={c} />
//                             </li>
//                         ))}
//                     </ul>
//                 </Stack>
//             </Box>
//         </Container>
//     )
// }

// interface ICaseSummaryProps {
//     caseDto: CaseDto
// }
// function CaseSummary({ caseDto }: ICaseSummaryProps) {
//     const caseSlice = useAppSelector(s => s.userSlice.userDto)
//     const router = useRouter()
//     console.log(`This is `)
//     function navigateToClientPage(e: any) {
//         router.push(`/homePage/clients/clientpage/infopage?search=${caseDto.id}`)
//     }
//     return (
//         <div onClick={navigateToClientPage}>
//             {/* <TitleCard title={caseDto.client.firstName} subText={caseDto.caseNumber} /> */}
//             <Card>
//                 <Box sx={{ margin: "2rem", padding: '2rem'} }>
//                     <Stack alignContent={'center'} justifyItems='center'>
//                         <Typography alignItems={'center'} justifyContent={'center'}> Test </Typography>
//                     </Stack>
//                 </Box>
//             </Card>
//         </div >
//     )
// }
