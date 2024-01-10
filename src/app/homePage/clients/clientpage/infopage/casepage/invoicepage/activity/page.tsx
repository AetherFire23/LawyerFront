"use client";

import {
    ActivityDto,
    usePutInvoiceRemoveactivityMutation
} from "../../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { DumbGetCasesSuspense } from "../../../../../../../../../LogicFiles/Components/DumbGetCasesSusense";
import {
    checkActivityType,
    useActivityInitialization
} from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/activity/activity-hooks";
import { useNavigateToInvoicePage } from "../../../../../../../../../LogicFiles/Hooks/Navigations";
import { useSearchParams } from "next/navigation";

interface IActivityPageProps {
    activity: ActivityDto;
}

export default function ActivityPage() {

    return (
        <DumbGetCasesSuspense>
            <ActivityForm/>
        </DumbGetCasesSuspense>
    );
}

function ActivityForm() {
    const params = useSearchParams()
    const invoiceId = params.get("invoiceId")
    const [triggerArchiveActivity, data] = usePutInvoiceRemoveactivityMutation();
    const navigateToInvoice = useNavigateToInvoicePage();
    const activity = useActivityInitialization();
    if (!activity)
    {
        console.log("act w2as nul")
        return <div> Loading </div>;
    }

    // I need to access the invoiceId from the activity, I guess ill just reintroduce the activityId inside the backend.
    function archiveActivity() {
        triggerArchiveActivity({ activityId: activity!.id });
        navigateToInvoice(invoiceId!);

    }

    // causes an error because activity is sometimes null wtf?

    const activityType = checkActivityType(activity!);
    return (
        <div>
            <div> activity </div>
            <div> {activityType} </div>
        </div>
    );
}


