import { CaseDto, ClientDto } from "../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { Container } from "@mui/material";
import KeyedList from "../../../../../../../LogicFiles/Components/KeyedList";
import CaseNavCard from "@/app/homePage/clients/clientpage/infopage/_components/CaseNavCard";
import CreateCaseButton from "@/app/homePage/clients/clientpage/infopage/_components/CreateCaseButton";

export default function CasesNavList({ clientDto }: { clientDto: ClientDto }) {
    const renderer = (caseDto: CaseDto) => (<CaseNavCard caseDto={caseDto}/>);
    return (
        <Container
            sx={{
                width: "25vw",
            }}>
            <KeyedList list={clientDto.cases!} renderer={renderer}/>
        </Container>
    );
}

