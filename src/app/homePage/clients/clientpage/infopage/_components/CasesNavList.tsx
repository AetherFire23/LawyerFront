import { ClientDto } from "../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { Box, Container, Paper, Typography } from "@mui/material";
import CaseNavCard from "@/app/homePage/clients/clientpage/infopage/_components/CaseNavCard";
import CreateCaseButton from "@/app/homePage/clients/clientpage/infopage/_components/CreateCaseButton";
import TitleDivider from "../../../../../../../LogicFiles/Components/TitleDivider";
import CreateInvoiceButton from "@/app/homePage/clients/clientpage/infopage/casepage/_components/CreateInvoiceButton";
import InsetList from "../../../../../../../LogicFiles/Components/BasicListTest";
import { useNavigations } from "../../../../../../../LogicFiles/Hooks/Navigations";

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

