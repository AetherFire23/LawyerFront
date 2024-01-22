import { Container, Paper } from "@mui/material";
import CreateCaseButton from "@/app/homePage/clients/clientpage/infopage/_components/CreateCaseButton";
import { useNavigations } from "@/Hooks/Navigations";
import { ClientDto } from "@/Redux/codegen/userApi2Gen";
import TitleDivider from "@/Components/TitleDivider";
import InsetList from "@/Components/BasicListTest";

export default function CasesNavList({ clientDto }: { clientDto: ClientDto }) {
    const{navigateToCase} = useNavigations()
    return (
        // make screen half of window, some margin at top
        <Container
            sx={{
                width: "54vw",
                marginTop: "2rem",
                alignItems: "center"
            }}>

            <Paper sx={{ marginBottom: "1rem" }}>
                <TitleDivider title={"Cases"}>
                    <CreateCaseButton clientId={clientDto!.id}/>
                </TitleDivider>
                <InsetList
                    items={clientDto.cases!}
                    onClickHandler={(arg) => navigateToCase(arg.id)}
                    toStringValue={(arg) => arg.caseNumber!.toString() + arg.chamberName}
                    maxHeight={"18rem"}
                />
            </Paper>
        </Container>
    );
}

