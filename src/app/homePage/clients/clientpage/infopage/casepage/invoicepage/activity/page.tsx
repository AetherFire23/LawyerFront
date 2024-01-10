"use client";

import { ActivityDto } from "../../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { DumbGetCasesSuspense } from "../../../../../../../../../LogicFiles/Components/DumbGetCasesSusense";
import {
    checkActivityType,
    useActivityInitialization
} from "@/app/homePage/clients/clientpage/infopage/casepage/invoicepage/activity/activity-hooks";

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
    const activity = useActivityInitialization();
    if (!activity)
    {
        console.log("act w2as nul")
        return <div> ouache</div>;

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


