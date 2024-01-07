'use client'
import { ReactNode } from "react";
import { AuthenticationProvider } from "../../src/app/Contexts/AuthenticationSlice/AuthenticationContext";
import { AxiosProvider } from "../../src/app/Contexts/AxiosSlice/AxiosContext";
import { CasesProvider } from "../../src/app/Contexts/CaseSlice/CaseContext";

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