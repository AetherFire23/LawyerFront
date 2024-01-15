import { userApiGen2 } from "./userApi2Gen";
// ostie que ca devient compliexe.
// en tout cas, faut caller cet api-la pour que ca marche.

const caseTag = ["Case"];
export const enhancedApi = userApiGen2.enhanceEndpoints({
    addTagTypes: caseTag,
    endpoints: {
        getCaseGetcasescontext: {
            providesTags: caseTag,
        },
        putCaseAddclient: {
            invalidatesTags: caseTag,
        },
        putCaseUpdateclient: {
            invalidatesTags: caseTag
        },
        postCaseCreatenewcase: {
            invalidatesTags: caseTag
        },
        postInvoiceCreateinvoice: {
            invalidatesTags: caseTag
        },
        postInvoiceCreateactivity: {
            invalidatesTags: caseTag
        },
        putCaseUpdatelawyer: {
            invalidatesTags: caseTag
        },
        putInvoiceUpdateactivity: {
            invalidatesTags: caseTag
        },
        putInvoiceArchiveinvoice: {
            invalidatesTags: caseTag
        },
        putInvoiceRemoveactivity: {
            invalidatesTags: caseTag
        },
        putCaseSavecase: {
            invalidatesTags: caseTag
        },


    }
});

