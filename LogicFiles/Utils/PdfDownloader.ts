import logObject from "./logObject";
import axios from "axios";

interface IBlob {
    fileContents: string;
    contentType: string;
    fileDownloadName: string;
    lastModified: any;
    entityTag: any;
    enableRangeProcessing: boolean;
}

export default function downloadPdf(apiUrl: string, downloadFileName: string) {
    axios.get(apiUrl, {
        responseType: "blob", // important to get blob
    }).then(res => {
        console.log(res.data);
        const bloop = new Blob([res.data], { type: "application/pdf" });

        // so this is effed up here
        // the normal blob would be fine to download files, or so it seems.
        // For pdfs, things are more complicated.

        // HTTP only allows strings in base64
        // but there is no way to access the actual content of the PDF in a blob, I do not know the exact reason honestly
        bloop.text().then(c => {
            // So I ran the blob text() content into a JSON to typescript converter... and I got the IBlob interface that way
            const asIBlob = JSON.parse(c) as IBlob;

            // and I also ran fileContents into a Base64 to pdf converter online so I knew this was
            // the exact string I was looking for.

            // then there is this solution to download it. There are many others, but this seems to be the most common.
            const linkSource = `data:application/pdf;base64,${asIBlob.fileContents}`;
            const downloadLink = document.createElement("a");
            const fileName = `${downloadFileName}.pdf`;
            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
            downloadLink.remove();
        });


    }).catch(error => {
        console.error(error);
    });
}
