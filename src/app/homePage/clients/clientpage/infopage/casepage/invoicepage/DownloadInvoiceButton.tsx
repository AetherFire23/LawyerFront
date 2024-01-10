import axios from "axios";
import Button from "@mui/material/Button";
import logObject from "../../../../../../../../LogicFiles/Utils/logObject";
import fileDownload from "js-file-download";
import downloadPdf from "../../../../../../../../LogicFiles/Utils/PdfDownloader";

export default function DownloadInvoiceButton({ invoiceId }: { invoiceId: string }) {
    function triggerDownloadFile() {
        downloadPdf(`http://localhost:5099/invoice/GetInvoice2?invoiceId=${invoiceId}`, invoiceId);
    }

    return (
        <Button onClick={triggerDownloadFile}> download invoice </Button>
    );
}
