import { useRouter } from "next/navigation";

// interface INavigationsReturns {
//     navigateToClient: () => void,
//     navigateToInvoice: () => void,
//     navigateToCase: () => void,
//     navigateToActivity: () => void,
// }

export function useNavigations() {
    const router = useRouter();

    function navigateToInvoicePage(invoiceId: string) {
        router.push(`/homePage/clients/clientpage/infopage/casepage/invoicepage?invoiceId=${invoiceId}`);
    }

    function navigateToActivity(activityId: string, invoiceId: string) {
        const baseUrl = "/homePage/clients/clientpage/infopage/casepage/invoicepage/activity";
        const parameters = `?activityId=${activityId}&invoiceId=${invoiceId}`;
        const route = baseUrl + parameters;
        router.push(route);
    }

    function navigateToClient(clientId: string) {
        router.push(`/homePage/clients/clientpage/infopage?clientId=${clientId}`);
    }

    function navigateToCase(caseId: string) {
        const baseUrl = "/homePage/clients/clientpage/infopage/casepage";
        const parameters = `?caseId=${caseId}`;
        const route = baseUrl + parameters;
        router.push(route);
    }

    const navigations = {
        navigateToActivity,
        navigateToCase,
        navigateToClient,
        navigateToInvoice: navigateToInvoicePage
    };
    return navigations
}

export function useNavigateToClient() {
    const router = useRouter();

    function navigateToClient(clientId: string) {
        router.push(`/homePage/clients/clientpage/infopage?clientId=${clientId}`);
    }

    return navigateToClient;
}
//
// export function useNavigateToActivity() {
//     const router = useRouter();
//
//     function navigate(activityId: string, invoiceId: string) {
//         const baseUrl = "/homePage/clients/clientpage/infopage/casepage/invoicepage/activity";
//         const parameters = `?activityId=${activityId}&invoiceId=${invoiceId}`;
//         const route = baseUrl + parameters;
//         router.push(route);
//     }
//
//     return navigate;
// }
//
// export function useNavigateToCase() {
//     const router = useRouter();
//
//     function navigate(caseId: string) {
//         const baseUrl = "/homePage/clients/clientpage/infopage/casepage";
//         const parameters = `?caseId=${caseId}`;
//         const route = baseUrl + parameters;
//         router.push(route);
//     }
//
//     return navigate;
// }
