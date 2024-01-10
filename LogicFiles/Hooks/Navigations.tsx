import { useRouter } from "next/navigation";

export function useNavigateToInvoicePage() {
    const router = useRouter();

    function navigateToInvoicePage(invoiceId: string) {
        router.push(`/homePage/clients/clientpage/infopage/casepage/invoicepage?invoiceId=${invoiceId}`);
    }

    return navigateToInvoicePage;
}


export function useNavigateToClient() {
    const router = useRouter();

    function navigateToClient(clientId: string) {
        router.push(`/homePage/clients/clientpage/infopage?clientId=${clientId}`);
    }

    return navigateToClient;
}

export function useNavigateToActivity() {
    const router = useRouter();

    function navigate(activityId: string, invoiceId: string) {
        const baseUrl = "/homePage/clients/clientpage/infopage/casepage/invoicepage/activity";
        const parameters = `?activityId=${activityId}&invoiceId=${invoiceId}`;
        const route = baseUrl + parameters
        router.push(route);
    }

    return navigate
}
