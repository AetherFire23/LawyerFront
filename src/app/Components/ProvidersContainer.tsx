'use client'
import { ReactNode } from "react";
import { AuthenticationProvider } from "../Contexts/AuthenticationContext";
import { AxiosProvider } from "../Contexts/Slices/AxiosContext";

interface IProps {
    children: ReactNode
}

export default function ProvidersContainer({ children }: IProps) {
    return (
        <div>
            <AuthenticationProvider>
                <AxiosProvider>
                    <AuthenticationProvider>
                        {children}

                    </AuthenticationProvider>
                </AxiosProvider>
            </AuthenticationProvider>
        </div>
    )
}