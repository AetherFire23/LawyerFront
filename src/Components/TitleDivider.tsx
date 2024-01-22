import { Divider, SxProps, Theme, Typography } from "@mui/material";

interface ITitleDividerProps {
    children?: React.ReactNode,
    title: string,
    sx?: SxProps<Theme>
}

export default function TitleDivider({ children, title, sx }: ITitleDividerProps) {
    return (
        <Divider sx={sx}>
            <Typography> {title} {children}  </Typography>
        </Divider>
    );
}
