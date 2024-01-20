import { Fab, SxProps, Theme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { MouseEventHandler } from "react";


interface IAddFabProps {
    sx?: SxProps<Theme> | undefined,
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined,
}

export default function BasicAddFab({ onClick, sx }: IAddFabProps) {

    return (
        <>
            <Fab size="medium" color="primary" aria-label="add" onClick={onClick} sx={sx}>
                <AddIcon/>
            </Fab>
        </>
    );
}
