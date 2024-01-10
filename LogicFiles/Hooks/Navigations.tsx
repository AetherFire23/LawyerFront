import { useRouter } from "next/navigation";

export function useNavigateToInvoicePage() {
    const router = useRouter();

    function navigateToInvoicePage(invoiceId: string) {
        router.push(`/homePage/clients/clientpage/infopage/casepage/invoicepage?invoiceId=${invoiceId}`);
    }

    return navigateToInvoicePage;
}

export function useActivityNavigation() {
    const router = useRouter();

    function navigateToInvoicePage(activityId: string) {
        router.push(`/homePage/clients/clientpage/infopage/casepage/invoicepage/activity?activityId=${activityId}`);
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
