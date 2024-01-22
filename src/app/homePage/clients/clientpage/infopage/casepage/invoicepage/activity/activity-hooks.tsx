import { useSearchParams } from "next/navigation";
import { produce } from "immer";
import useStoreUserFromLocalStorage from "@/Hooks/useGetCasesLocal";
import { useAppSelector } from "@/Redux/hooks";
import { ActivityDto } from "@/Redux/codegen/userApi2Gen";
import logObject from "@/Utils/logObject";


export type ActivityType = "HourlyActivity" | "TaxableDisburse" | "NonTaxableDisburse"

export function useActivityInitialization() {
    useStoreUserFromLocalStorage();
    const searchParams = useSearchParams();
    const activityId = searchParams.get("activityId");
    const caseSlice = useAppSelector(c => c.caseSlice);
    // this is probably pushable into back-end instead of mapping
    if(!caseSlice || !caseSlice.clients) return {} as ActivityDto | null | undefined;

    const activities = caseSlice.clients!.flatMap(c => c.cases)!.flatMap(c => c!.invoices)!.flatMap(c => c!.activities);
    const activityParameter = activities
        ? activities.find(a => a!.id === activityId)
        : {} as ActivityDto | null | undefined;

    logObject("was this null when page loaded", activityParameter);
    return activityParameter;
}


export function mapFormDataToActivity(activity: ActivityDto, formActivity: ActivityDto) {
    const modifiedActivity = produce(activity, activityDraft => {
        activityDraft.costInDollars = formActivity.costInDollars;
        activityDraft.quantity = formActivity.quantity;
        activityDraft.description = formActivity.description;
    });

    return modifiedActivity;
}

// should be done server side lolzida
export function checkActivityType(activity: ActivityDto): ActivityType {
    if (!activity!.isDisburse) {
        return "HourlyActivity";
    } else if (activity.isTaxable) {
        return "TaxableDisburse";
    } else {
        return "NonTaxableDisburse";
    }
}
