import axios from "axios";
import Button from "@mui/material/Button";
import logObject from "../../../../../../../../LogicFiles/Utils/logObject";
import fileDownload from "js-file-download";

interface IBlob {
    fileContents: string;
    contentType: string;
    fileDownloadName: string;
    lastModified: any;
    entityTag: any;
    enableRangeProcessing: boolean;
}


export default function DownloadInvoiceButton({ invoiceId }: { invoiceId: string }) {
    function triggerDownloadFile() {
        logObject("stuff sent:", invoiceId);
        const url = `http://localhost:5099/invoice/GetInvoice2?invoiceId=${invoiceId}`;
        // axios.get<Blob>(`http://localhost:5099/invoice/GetInvoice=${invoiceId}`).then(c => {
        axios.get(url, {
            responseType: "blob", // important to get blob
        }).then(res => {
            console.log(res.data);
            const bloop = new Blob([res.data], { type: "application/pdf" });


            // so this is fucked up here
            // the normal blolb would be fine to download files, or so it seems.
            // For pdfs, things are more complicated.

            // HTTP only allows strings in base64
            // but there is no way to access the actual content of the PDF in a blob, I do not know the exact reason honestly
            bloop.text().then(c => {
                // So I ran the blob text() content into a JSON to typescript converter... and I got the IBlob interface that way
                const asIBlob = JSON.parse(c) as IBlob
                console.log(asIBlob)
                const linkSource = `data:application/pdf;base64,${asIBlob.fileContents}`;
                const downloadLink = document.createElement("a");
                const fileName = `${invoiceId}.pdf`;
                downloadLink.href = linkSource;
                downloadLink.download = fileName;
                downloadLink.click();
                downloadLink.remove()
              //  downloadLink!.parentNode!.removeChild(downloadLink)
            });


        }).catch(error => {
            console.error(error);
        });

    }

    return (
        <div>
            <Button onClick={triggerDownloadFile}> download invoice </Button>
        </div>
    );
}
