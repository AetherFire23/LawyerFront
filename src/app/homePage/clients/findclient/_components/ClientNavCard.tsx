import { ClientDto } from "../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { useNavigations } from "../../../../../../LogicFiles/Hooks/Navigations";
import { isFalsyOrWhitespace } from "../../../../../../LogicFiles/Utils/StringExtensions";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import styles from "../cardHover.module.css";

export default function ClientNavCard({ client }: { client: ClientDto }) {
    const { navigateToClient } = useNavigations();

    const fullClientName = `${client.firstName} ${client.lastName}`;
    const renderedname = isFalsyOrWhitespace(fullClientName)
        ? "Define Client Name"
        : fullClientName;

    return (
        <>
            <Paper
                sx={{
                    width: "75vw",
                    marginTop: "0.5rem",
                    padding: "0.25rem"
                }}
                className={styles.cardHover}>

                <div onClick={() => navigateToClient(client.id)}>
                    < Typography className="flex justify-center items-center"> {renderedname} </Typography>
                </div>
            </Paper>
        </>
    );
}
