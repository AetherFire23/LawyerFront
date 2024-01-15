import { produce } from "immer";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FieldValues, UseFormReset } from "react-hook-form";
import { ClientDto } from "../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import useStoreUserFromLocalStorage from "../../../../../../LogicFiles/Hooks/useGetCasesLocal";
import { useAppSelector } from "../../../../../../LogicFiles/Redux/hooks";
import { enhancedApi } from "../../../../../../LogicFiles/Redux/codegen/enhancedApi";
// use absolute paths from nextjs from ROOT
// one day : https://nextjs.org/docs/app/building-your-application/configuring/absolute-imports-and-module-aliases
export function useCaseIdSearchParam() {
    const searchParams = useSearchParams()
    const caseId = searchParams.get("clientId")
    return caseId
}
export function useClientDtoSearchParam() {
    useStoreUserFromLocalStorage();
    const { isSuccess, isFetching } = enhancedApi.useGetCaseGetcasescontextQuery();

    const searchParams = useSearchParams();
    const caseId = searchParams.get("clientId");
    const clients = useAppSelector((s) => s.caseSlice.clients);

    // need this cast as clientDto to avoid
    // feeding undefined to the react hook form library and therefore
    // I avoid a null exception


    const clientDto = clients
        ? (clients.find((c) => c.id === caseId) as ClientDto)
        : {} as ClientDto | undefined;

    return clientDto;
}

export function mapFormDataToClientDto(clientDto: ClientDto, formData: ClientDto): ClientDto {
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
 * ie: when refetching data
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
