import IIconProps from "@/Components/Icons/IconProps";
import { Fab } from "@mui/material";

export default function OverridableFab(props: IIconProps) {
    return (
        <Fab
            type={props.type}
            onClick={props.onClick}
            color={props.color ?? "primary"}
            size={props.size ?? "medium"}
            sx={props.sx ?? { marginLeft: "1rem" }}>
            {props.children}

        </Fab>
    );
}
