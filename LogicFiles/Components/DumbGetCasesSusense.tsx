import { Container } from "@mui/material";
import useStoreUserFromLocalStorage from "../Hooks/useGetCasesLocal";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import { enhancedApi } from "../Redux/codegen/enhancedApi";

/** Display a dumb suspense if get cases query is not successful yet */
export function DumbGetCasesSuspense({ children }: { children: React.ReactNode }) {
    useStoreUserFromLocalStorage(); // PEDRO QUESTION:
    // I am absolutely uncertain why this would break if I did not put usetoreUserFromLocalStorage here.
    // Since I Was expecting this to be called from elsewhere even before this component was rendered.
    //
    const { isSuccess } = enhancedApi.useGetCaseGetcasescontextQuery();
    return (
        <Container>
            {!isSuccess && (<div> Loading... </div>)}
            {isSuccess && (children)}
        </Container>
    );
}

export function DumbSuspenseCondition({ children, condition }: { children: React.ReactNode, condition: boolean }) {
    useStoreUserFromLocalStorage();
    const { isSuccess, isFetching } = enhancedApi.useGetCaseGetcasescontextQuery();
    // show loading spinner if data is not fetched
    return (
        <>
            {(!condition && (!isSuccess || isFetching)) && (
                <Container sx={{
                    width: "100vw",
                    height: "80vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <LoadingSpinner/>
                </Container>
            )
            }
            {(condition && isSuccess && !isFetching) && (children)}
        </>
    );
}

export function DumbSuspense({ children, condition, suspenseContent }: {
    children: React.ReactNode,
    condition: boolean,
    suspenseContent: React.ReactNode
}) {
    useStoreUserFromLocalStorage();
    return (
        <div>
            {!condition && (suspenseContent)}
            {condition && (children)}
        </div>
    );
}
