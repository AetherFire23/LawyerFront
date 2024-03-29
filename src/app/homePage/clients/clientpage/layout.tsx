"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";


// i think this is completely deletable.
// those are the TABS of the client page (invoice, cases and shit)
export default function ClientPageLayout({ children }: { children: React.ReactNode }) {
    // could bring that into an HOC
    const router = useRouter()
    const [active, setActive] = useState(0)
    const searchParams = useSearchParams()
    const caseId: string = searchParams.get("search") as string
    const [value, setValue] = React.useState(0);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function handleNavigation(path: string) {
        router.push(path)
    }
    function handleSetActive(index: number) {
        setActive(index)
    }

    function getActiveTab(index: number) {
        const activeText: string = active === index ? "tab-active" : ''
        return activeText
    }

    // layout is just tabs :)
    return (
        // <Stack>
        //     <Box sx={{ width: '100%' }}>
        //         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        //             <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        //                 <Tab label="Info" {...a11yProps(0)} onClick={e => handleNavigation(`/homePage/clients//clientpage/infopage?search=${caseId}`)} />
        //                 <Tab label="Procedure" {...a11yProps(1)} onClick={e => handleNavigation(`/homePage/clients/clientpage/procedure?search=${caseId}`)} />
        //                 <Tab label="Billing" {...a11yProps(2)} onClick={e => handleNavigation(`/homePage/clients?search=${caseId}`)} />
        //             </Tabs>
        //         </Box>
        //         {children}
        //     </Box>
        // </Stack>
        <div>
            {children}

        </div>
    )
}


function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
