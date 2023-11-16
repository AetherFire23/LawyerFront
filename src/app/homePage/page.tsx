'use client'

import { CasesContext } from '../../../mercichatgpt/ProcedureMakerServer/Dtos/CasesContext';
import useAuthenticationActions from '../Contexts/AuthenticationSlice/AuthenticationActions';
import { useAuthenticationContext } from '../Contexts/AuthenticationSlice/AuthenticationContext';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { useGetCasesQuery } from '../Redux/Apis/caseApi';
import { useLoginStorage } from '../Hooks/LocalStorage';
import { setUser } from '../Redux/Slices/userSlice';
import { LoginResult } from '../../../mercichatgpt/ProcedureMakerServer/Authentication/ReturnModels/LoginResult';
import { useEffect, useState } from 'react';

export default function HomePage() {
    // const authContext = useAuthenticationContext()
    // const { loginResult } = useLoginStorage()
    const dispatch = useAppDispatch()
    useEffect(() => {
        console.log("this is loginResult inside of homePageLayout")
        const storedValue: string = window.localStorage.getItem("jwtToken") ?? ""
        const storedvalues = JSON.parse(storedValue) as LoginResult
        dispatch(setUser(storedvalues as LoginResult))
       
    }, []);

    const {data} = useGetCasesQuery()




    return (
        <div>
            <div>
                <label className="flex flex-col items-center mt-5 "> Welcome to the lawyer app </label>
            </div>
        </div>
    )
}
