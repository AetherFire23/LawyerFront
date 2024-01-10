import useStoreUserFromLocalStorage from "../../../../../../../../../LogicFiles/Hooks/useGetCasesLocal";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "../../../../../../../../../LogicFiles/Redux/hooks";
import { ActivityDto } from "../../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import logObject from "../../../../../../../../../LogicFiles/Utils/logObject";

export type ActivityType = "HourlyActivity" | "TaxableDisburse" | "NonTaxableDisburse"

export function useActivityInitialization() {
    useStoreUserFromLocalStorage();
    const searchParams = useSearchParams();
    const activityId = searchParams.get("activityId");
    const caseSlice = useAppSelector(c => c.caseSlice);
    // this is probably pushable into back-end instead of mapping here
    const activities = caseSlice!.clients!.flatMap(c => c.cases)!.flatMap(c => c!.invoices)!.flatMap(c => c!.activities);
    const activityParameter = activities
        ? activities.find(a => a!.id === activityId)
        : {} as ActivityDto | null | undefined

    logObject("was this null when page loaded", activityParameter);
    return activityParameter;
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
