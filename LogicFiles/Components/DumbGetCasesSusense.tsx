import { useGetCaseGetcasescontextQuery } from "@/app/Redux/codegen/userApi2Gen"
import { Container } from "@mui/material"
import useStoreUserFromLocalStorage from "../Hooks/useGetCasesLocal"

/** Display a dumb suspense if get cases query is not successful yet */
export function DumbGetCasesSuspense({ children }: { children: React.ReactNode }) {
    useStoreUserFromLocalStorage() // PEDRO QUESTION:
    // I am absolutely uncertain why this would break if I did not put usetoreUserFromLocalStorage here.
    // Since I Was expecting this to be called from elsewhere even before this component was rendered.
    //
    const { isSuccess } = useGetCaseGetcasescontextQuery()
    return (
        <Container>
            {!isSuccess && (<div> Loading... </div>)}
            {isSuccess && (children)}
        </Container>
    )
}