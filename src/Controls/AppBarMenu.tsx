import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";


interface IProps {
    children: React.ReactNode
    buttonText: string
}

// check if i can constrain this to only Menuitems
// ExtendButtonBase<MenuItemTypeMap<{}, "li">>
export default function AppBarMenu({ children, buttonText }: IProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button variant='outlined' sx={{width: '6rem'}}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {buttonText}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {children}
            </Menu>
        </div>
    );
}
