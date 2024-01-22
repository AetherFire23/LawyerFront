import { useState } from "react";
import { DateTime } from "luxon";

export default function useControlledDatePicker(initialDate: string) {

    const [value, setValue] = useState<DateTime | null>(null);


    const onChangeHandler = (pushedValue: DateTime | null) => {

        setValue(pushedValue);
        console.log(pushedValue)
        // const test = DateTime.now()
        // console.log(test.toISO)

    };

    const returnValues = {
        value,
        onChangeHandler,
        setValue,
    };
    return returnValues;
}
