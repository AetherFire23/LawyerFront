'use client'
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Link from "next/link"
import AppBarMenu from '../Controls/AppBarMenu'
import { setUser } from '../Redux/Slices/userSlice'
import { useAppDispatch, useAppSelector } from '../Redux/hooks'
import { useEffect } from 'react';

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // const userSlice = useAppSelector(state => state.userSlice)
    // const dispatch = useAppDispatch()
    // useEffect(() => {
    //     if(!window) return;
    //     const storedValue: string = window.localStorage.getItem("jwtToken") ?? ""
    //     //onst storedvalues = JSON.parse(storedValue) as LoginResult
    //     //dispatch(setUser(storedvalues as LoginResult))

    // }, []);

    // //const { data } = useGetCasesQuery()



    return (
        // dunno why, if I put a container here , this will make the appbar within the pages content 
        <div>
            <AppBar position='relative' >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Link href={"/homePage"}>
                            <Typography variant="h6" component="div" sx={{ marginRight: '2rem' }}>
                                LawyerApp
                            </Typography>
                        </Link>
                        <Link href='/homePage/personalInfoPage'>
                            <Button variant="outlined" sx={{ width: '6rem', marginRight: '1rem' }}>
                                Personal
                            </Button>
                        </Link>
                        <AppBarMenu buttonText='clients'>
                            <Link href='/homePage/clients/findclient'>
                                <MenuItem sx={{ width: '6rem' }}> Find </MenuItem>
                            </Link>
                            <Link href='/homePage/clients/addclient'>
                                <MenuItem> Add </MenuItem>
                            </Link>
                        </AppBarMenu>
                    </Toolbar>
                </Container>
            </AppBar >
            {children}
        </div>
    )
}
