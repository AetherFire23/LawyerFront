import { CaseDto } from "../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { useNavigations } from "../../../../../../../LogicFiles/Hooks/Navigations";
import { Paper, Typography } from "@mui/material";

export default function CaseNavCard({ caseDto }: { caseDto: CaseDto }) {
    const { navigateToCase } = useNavigations();
    return (
        <Paper
            elevation={3}
            sx={{}}
            onClick={() => navigateToCase(caseDto.id)}
        >
            <Typography> {caseDto.chamberName} </Typography>
        </Paper>
    );
}
