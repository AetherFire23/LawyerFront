import AddClientButton from "@/app/homePage/clients/findclient/_components/AddClientButton";
import { Container, Paper } from "@mui/material";
import InsetList from "@/Components/BasicListTest";
import { ClientDto } from "@/Redux/codegen/userApi2Gen";
import { useNavigations } from "@/Hooks/Navigations";
import { isFalsyOrWhitespace } from "@/Utils/StringExtensions";
import TitleDivider from "@/Components/TitleDivider";

export default function ClientList({ clients }: { clients: ClientDto[] }) {
    const { navigateToClient } = useNavigations();
    return (
        <Container sx={{ width: "75vw" }}>
            <Paper sx={{ marginBottom: "1rem", marginTop: "1rem" }}>
                <TitleDivider title={"Clients"}>
                    <AddClientButton/>
                </TitleDivider>
                <InsetList
                    items={clients!}
                    onClickHandler={(arg) => navigateToClient(arg.id)}
                    toStringValue={(arg) => isFalsyOrWhitespace(`${arg.firstName} ${arg.lastName}`) ? "Define Client Name" : `${arg.firstName} ${arg.lastName}`}
                    maxHeight={"50vw"}
                />
            </Paper>
        </Container>
    );
}



