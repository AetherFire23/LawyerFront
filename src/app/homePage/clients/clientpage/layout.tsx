'use client'
import { useSearchParams } from 'next/navigation'
import useActiveSelection from "@/app/Hooks/useActiveSelection"
import { useState } from "react"
import Link from 'next/link'

export default function ClientPageLayout({ children }: { children: React.ReactNode }) {
    // could bring that into an HOC

    const [active, setActive] = useState(0)
    const searchParams = useSearchParams()
    const caseId: string = searchParams.get("search") as string

    function handleSetActive(index: number) {
        setActive(index)
    }

    function getActiveTab(index: number) {
        const activeText: string = active === index ? "tab-active" : ''
        return activeText
    }

    return (
        <div>
            <div className="tabs ml-2.5 flex outline-slate-800">
                <Link href={`/homePage/clients/clientpage/infopage?search=${caseId}`}>
                    <button className={`tab tab-bordered ${getActiveTab(0)}`} onClick={e => handleSetActive(0)}>Info</button>
                </Link>

                <Link href={`/homePage/clients/clientpage/procedure?search=${caseId}`}>
                    <button className={`tab tab-bordered ${getActiveTab(1)}`} onClick={e => handleSetActive(1)}>Procedures</button>
                </Link>
                <a className={`tab tab-bordered ${getActiveTab(2)}`} onClick={e => handleSetActive(2)}>Billing</a>
            </div>
            {children}
        </div>
    )
}