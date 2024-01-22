import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


export interface IUseDialogState {
    handleClickOpen: () => void,
    handleClose: () => void,
    isOpen: boolean,
}

export function useDialog(): IUseDialogState {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const returnValue: IUseDialogState = {
        handleClickOpen: handleClickOpen,
        handleClose: handleClose,
        isOpen: open
    };

    return returnValue;
}

export interface IDialogProps {
    dialogState: IUseDialogState,
    title: string,
    content: string,
    onAgree?: () => void,
    onDisagree?: () => void,
}

export default function AlertDialog({ dialogState, title, content, onAgree, onDisagree }: IDialogProps) {

    function onDialogAgree() {
        if (onAgree) {
            onAgree();
        }
        dialogState.handleClose();
        console.log("on agree")
    }

    function onDialogDisagree() {
        if (onDisagree) {
            onDisagree()
        }
        dialogState.handleClose()
        console.log("on disagree")
    }

    return (
        <React.Fragment>
            <Dialog
                open={dialogState.isOpen}
                onClose={dialogState.handleClose}
            >
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onDialogDisagree}>Disagree</Button>
                    <Button onClick={onDialogAgree} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
