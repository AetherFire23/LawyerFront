import { SxProps, Theme } from "@mui/material";

export default interface IOverrideMUI {
    sx?: SxProps<Theme>,
    children?: React.ReactNode,
    onClick?: () => void,
    type?: "reset" | "button" | "submit" | undefined
}
