import IIconProps from "@/Components/Icons/IconProps";
import OverridableFab from "@/Components/Icons/OverridableFab";
import AddIcon from "@mui/icons-material/Add";
import ArchiveIcon from "@mui/icons-material/Archive";
import SaveIcon from "@mui/icons-material/Save";


export function AddIconButton(props: IIconProps) {
    return (
        <OverridableFab {...props}>
            <AddIcon/>
        </OverridableFab>
    );
}

export function ArchiveIconButton(props: IIconProps) {

    return (
        <OverridableFab {...props}>
            <ArchiveIcon/>
        </OverridableFab>
    );
}

export function SaveIconButton(props: IIconProps) {

    return (
        <OverridableFab {...props}>
            <SaveIcon/>
        </OverridableFab>
    );
}
