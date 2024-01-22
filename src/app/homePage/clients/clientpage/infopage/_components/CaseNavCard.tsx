import { Paper, Typography } from "@mui/material";
import styles from "../../../../../../../LogicFiles/CssModules/cardHover.module.css";
import { useNavigations } from "@/Hooks/Navigations";
import { CaseDto } from "@/Redux/codegen/userApi2Gen";

export default function CaseNavCard({ caseDto }: { caseDto: CaseDto }) {
    const { navigateToCase } = useNavigations();
    return (
        <Paper
            elevation={3}
            sx={{
                display: "flex",
                padding: "1rem",
                marginRight: "2rem",
            }}
            onClick={() => navigateToCase(caseDto.id)}
            className={styles.cardHover}
        >
            <Typography> {caseDto.caseNumber} - {caseDto.chamberName} </Typography>
        </Paper>
    );
}
