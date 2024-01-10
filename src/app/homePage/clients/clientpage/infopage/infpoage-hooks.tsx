import { produce } from "immer";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FieldValues, UseFormReset } from "react-hook-form";
import { ClientDto } from "../../../../../../LogicFiles/Redux/codegen/userApi2Gen";

export function useCaseIdSearchParam() {
    const searchParams = useSearchParams()
    const caseId = searchParams.get("clientId")
    return caseId
}

export function mapFormDataToCaseDto(clientDto: ClientDto, formData: ClientDto): ClientDto {
    const nextClient = produce(clientDto, clientDtoDraft => {
        clientDtoDraft.lastName = formData.lastName
        clientDtoDraft.firstName = formData.firstName
        clientDtoDraft.address = formData.address
        clientDtoDraft.email = formData.email
        return clientDtoDraft
    })!
    return nextClient
}

// if I dont do reset state, the formdata will get the empty clientDto and keep it first.
// that why is works when navigating but not when refreshing.
// absolutely necessary it seems.
/** Used when the default form value must be overriden when a condition is met
 */
export function useFormReset<T extends FieldValues>(mustReset: boolean, obj: T, reset: UseFormReset<T>) {
    const [isInitialized, setIsInitialized] = useState(false)
    if (mustReset && !isInitialized) {
        reset(obj)
        setIsInitialized(true)
    }
}




// the whlle idea is that it is clearer to define a function that knows
// how to create a  component and pass it down to it
// than to re-declare ul, li, map, over and over again
interface IKeyedObject {
    id: string
}
interface IRenderKeyedListProps<T extends IKeyedObject> {
    keyedObjects: T[],
    componentRenderer: (arg: T) => React.ReactNode
}
export function RenderKeyedList<T extends IKeyedObject>({ keyedObjects, componentRenderer: renderComponent }: IRenderKeyedListProps<T>) {
    // calling .map() on an empty object
    // can sometimes get empty objects when component is rendered but
    // data is not fetched yet, therefore I check if no props are there to avoid
    const isValidList = Object.keys(keyedObjects).length !== 0
    return (
        <ul>
            { isValidList && keyedObjects.map(o => (
                <li key={o.id}>
                    {renderComponent(o)}
                </li>
            ))}
        </ul>
    )
}
