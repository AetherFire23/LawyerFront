'use client'
import { ReactNode } from "react";
import { AuthenticationProvider } from "../Contexts/AuthenticationSlice/AuthenticationContext";
import { AxiosProvider } from "../Contexts/AxiosSlice/AxiosContext";
import { CasesProvider } from "../Contexts/CaseSlice/CaseContext";

interface IProps {
    children: ReactNode
}

export default function ProvidersContainer({ children }: IProps) {
    return (
        <div>
            <AuthenticationProvider>
                <CasesProvider>
                    <AxiosProvider>
                        {children}
                    </AxiosProvider>
                </CasesProvider>
            </AuthenticationProvider>
        </div>
    )
}