import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};


export interface IUseReturnModal {
    isOpen: boolean,
    handleOpen: () => void,
    handleClose: () => void
}

export function useModal() : IUseReturnModal {
    const [isOpen, setIsOpen] = React.useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const returnValue = {
        isOpen: isOpen,
        handleOpen,
        handleClose,
    };
    return returnValue;
}


interface IModalProps {
    modalState: IUseReturnModal
    modalTitle: string,
    modalText: string,
}

export default function BasicModal({ modalState, modalTitle, modalText }: IModalProps) {
    return (
        <div>
            <Modal
                open={modalState}
                onClose={modalState.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {modalTitle}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {modalText}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
