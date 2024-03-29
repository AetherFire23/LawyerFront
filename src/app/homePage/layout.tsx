"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // const cdt: CaseDto[] = [];
    // useStoreUserFromLocalStorage();
    // const userSlice = useAppSelector(state => state.userSlice)
    // const dispatch = useAppDispatch()
    // useEffect(() => {
    //     if(!window) return;
    //     const storedValue: string = window.localStorage.getItem("jwtToken") ?? ""
    //     //onst storedvalues = JSON.parse(storedValue) as LoginResult
    //     //dispatch(setUser(storedvalues as LoginResult))

    // }, []);

    // //const { data } = useGetCasesQuery()
    // add client query here
    // redirect to correct page after that

    return (
        <div>
            <AppBarContainer>
                <LawyerAppButton />
                <PersonalInfoButton />
                <ClientsSearchButton />
            </AppBarContainer>
            {children}
        </div>
    );
}

function AppBarContainer({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <AppBar position="relative">
                {/* // dunno why, if I put a container here , this will make the appbar within the pages content */}
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {children}
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

function LawyerAppButton() {
    return (
        <Link href={"/homePage"}>
            <Typography variant="h6" component="div" sx={{ marginRight: "2rem" }}>
                LawyerApp
            </Typography>
        </Link>
    );
}

function PersonalInfoButton() {
    return (
        <Link href="/homePage/personalInfoPage">
            <Button variant="outlined" sx={{ width: "6rem", marginRight: "1rem" }}>
                Personal
            </Button>
        </Link>);
}

function ClientsSearchButton() {
    return (
            <Link href="/homePage/clients/findclient">
                <Button variant="outlined" sx={{ width: "6rem", marginRight: "1rem" }}>
                    Clients
                </Button>
            </Link>
    );
}


// function ClientsMenuDropDown() {
//     const router = useRouter();
//     const [triggerAddClient, data] = enhancedApi.usePutCaseAddclientMutation();
//
//     function addClientThenRedirect() {
//         triggerAddClient().unwrap().then(r => {
//             router.push(`/homePage/clients/clientpage/infopage?clientId=${r}`);
//         });
//     }
//
//     return (<AppBarMenu buttonText="clients">
//         <Link href="/homePage/clients/findclient">
//             <MenuItem sx={{ width: "6rem" }}> Find </MenuItem>
//         </Link>
//         <MenuItem onClick={addClientThenRedirect}> Add </MenuItem>
//     </AppBarMenu>);
// }
