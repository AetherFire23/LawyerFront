import IOverrideMUI from "@/Components/Interfaces/IOverrideMUI";
import { OverridableStringUnion } from "@mui/types";
import { FabPropsColorOverrides, FabPropsSizeOverrides, PropTypes } from "@mui/material";

export default interface IIconProps extends IOverrideMUI {
    size?: OverridableStringUnion<"small" | "medium" | "large", FabPropsSizeOverrides> | undefined,
    color?: OverridableStringUnion<PropTypes.Color | "success" | "error" | "info" | "warning", FabPropsColorOverrides> | undefined

}
