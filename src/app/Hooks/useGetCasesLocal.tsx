import { useEffect } from "react";
import { setUser } from "../Redux/Slices/userSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { LoginResult } from "../../../mercichatgpt/ProcedureMakerServer/Authentication/ReturnModels/LoginResult";
import { useGetCasesQuery } from "../Redux/Apis/caseApi";
export default function useGetCasesLocal() {
    const us = useAppSelector(state => state.userSlice)
    const dispatch = useAppDispatch()
    useEffect(() => {
        console.log("this is loginResult inside of homePageLayout")
        const storedValue: string = window.localStorage.getItem("jwtToken") ?? ""
        const storedvalues = JSON.parse(storedValue) as LoginResult
        dispatch(setUser(storedvalues as LoginResult))

    }, []);

    const { data } = useGetCasesQuery()
}