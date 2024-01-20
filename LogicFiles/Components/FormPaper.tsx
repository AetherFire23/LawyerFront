import { Paper } from "@mui/material";

export default function CaseNavCard({ children }: { children: React.ReactNode }) {
    return (
        <Paper
            elevation={3}
            sx={{
                display: "flex",
                padding: "1rem",
                marginRight: "2rem",
            }}>
            {children}
        </Paper>
    );
}
