"use client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import useStoreUserFromLocalStorage from "../../../../../LogicFiles/Hooks/useGetCasesLocal";
import { Button } from "@mui/material";
import { ClientDto, useGetCaseGetcasescontextQuery } from "../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { useNavigateToClient } from "../../../../../LogicFiles/Hooks/Navigations";
import { useAppSelector } from "../../../../../LogicFiles/Redux/hooks";
import { Client } from "undici-types";
import KeyedList from "../../../../../LogicFiles/Components/KeyedList";

export default function FindClientPage() {
    const caseSlice = useAppSelector(s => s.userSlice.userDto);

    useStoreUserFromLocalStorage();
    const { isError, isFetching, data: caseContext } = useGetCaseGetcasescontextQuery();

    return (
        <div>
        </div>
    );
}

function ClientList({ clients }: { clients: ClientDto[] }) {

    const renderer = (client: ClientDto) => (<ClientSummary client={client}/>)
    return (
        <Container>
            <Box>
                <Stack direction="row" justifyContent="center" alignContent="center">
                    <KeyedList list={clients!} renderer={renderer}/>

                    {/* <ul> */}
                    {/*     {clients?.map(c => ( */}
                    {/*         <li key={c.id}> */}
                    {/*             <ClientSummary client={c}/> */}
                    {/*         </li> */}
                    {/*     ))} */}
                    {/* </ul> */}
                </Stack>
            </Box>
        </Container>
    );
}

interface IClientSummaryProps {
    client: ClientDto;
}

function ClientSummary({ client }: IClientSummaryProps) {
    const navigateToClient = useNavigateToClient();

    function navigateToClientPage(e: any) {
        navigateToClient(client.id);
    }

    return (
        <div>
            <div onClick={navigateToClientPage}>
                <Card>
                    <Box sx={{ margin: "2rem", padding: "2rem" }}>
                        <Stack alignContent={"center"} justifyItems="center">
                            <Typography alignItems={"center"} justifyContent={"center"}> Test </Typography>
                        </Stack>
                    </Box>
                </Card>
            </div>
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
