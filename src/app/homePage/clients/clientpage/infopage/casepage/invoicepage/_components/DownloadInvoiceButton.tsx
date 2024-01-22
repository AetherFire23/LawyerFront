import DownloadIcon from "@mui/icons-material/Download";
import { Fab } from "@mui/material";
import downloadPdf from "@/Utils/PdfDownloader";

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
