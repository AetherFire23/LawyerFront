import { Container } from "@mui/material";
import useStoreUserFromLocalStorage from "../Hooks/useGetCasesLocal";
import { useGetCaseGetcasescontextQuery } from "../Redux/codegen/userApi2Gen";

/** Display a dumb suspense if get cases query is not successful yet */
export function DumbGetCasesSuspense({ children }: { children: React.ReactNode }) {
    useStoreUserFromLocalStorage(); // PEDRO QUESTION:
    // I am absolutely uncertain why this would break if I did not put usetoreUserFromLocalStorage here.
    // Since I Was expecting this to be called from elsewhere even before this component was rendered.

    const { isSuccess } = useGetCaseGetcasescontextQuery();
    return (
        <Container>
            {!isSuccess && (<div> Loading... </div>)}
            {isSuccess && (children)}
        </Container>
    );
}

export function DumbGetCasesSuspense2({ children, condition }: { children: React.ReactNode, condition: boolean }) {
    useStoreUserFromLocalStorage();
    // PEDRO QUESTION:
    // I am absolutely uncertain why this would break if I did not put usetoreUserFromLocalStorage here.
    // Since I Was expecting this to be called from elsewhere even before this component was rendered.

    const { isSuccess } = useGetCaseGetcasescontextQuery();
    return (
        <Container>
            {(!isSuccess && !condition) && (<div> Loading... </div>)}
            {(isSuccess && condition) && (children)}
        </Container>
    );
}
