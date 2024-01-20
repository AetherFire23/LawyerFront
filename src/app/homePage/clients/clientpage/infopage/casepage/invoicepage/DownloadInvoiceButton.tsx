import axios from "axios";
import Button from "@mui/material/Button";
import logObject from "../../../../../../../../LogicFiles/Utils/logObject";
import fileDownload from "js-file-download";
import downloadPdf from "../../../../../../../../LogicFiles/Utils/PdfDownloader";
import DownloadIcon from '@mui/icons-material/Download';
import { Fab } from "@mui/material";
export default function DownloadInvoiceButton({ invoiceId }: { invoiceId: string }) {
    function triggerDownloadFile() {
        downloadPdf(`http://localhost:5099/invoice/GetInvoice2?invoiceId=${invoiceId}`, invoiceId);
    }

    return (
        <Fab size={"medium"} color={"primary"} onClick={triggerDownloadFile}>
            <DownloadIcon/>
        </Fab>
    );
}
