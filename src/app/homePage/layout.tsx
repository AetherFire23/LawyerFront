'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import type { Metadata } from 'next'
import Link from "next/link"
import BasicMenu from '../Controls/BasicMenu';
import AppBarMenu from '../Controls/AppBarMenu';

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Container>
            <AppBar position='absolute'>
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
        </Container >
    )
}
