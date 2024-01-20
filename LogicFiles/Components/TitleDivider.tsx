import { Divider, Typography } from "@mui/material";
import CreateInvoiceButton from "@/app/homePage/clients/clientpage/infopage/casepage/_components/CreateInvoiceButton";

interface ITitleDividerProps {
    children?: React.ReactNode,
    title: string,
}

export default function TitleDivider({ children, title }: ITitleDividerProps) {
    return (
        <Divider>
            <Typography> {title} {children} </Typography>

        </Divider>

    );
}
