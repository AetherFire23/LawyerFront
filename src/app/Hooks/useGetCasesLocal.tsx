import { useEffect } from "react";
import { setUser } from "../Redux/Slices/userSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { LoginResult, useGetCaseGetcasescontextQuery } from "../Redux/codegen/userApi2Gen";
// This will allow the automatic re-fetch of getcases in case the page gets loaded.
// uses the token stored inside the window
export default function useGetCasesLocal() {
    const us = useAppSelector(state => state.userSlice)
    const dispatch = useAppDispatch()
    useEffect(() => {
        console.log("this is loginResult inside of homePageLayout")
        const storedValue: string = window.localStorage.getItem("jwtToken") ?? ""
        const storedvalues = JSON.parse(storedValue) as LoginResult
        dispatch(setUser(storedvalues))

    }, []);

    const { data } = useGetCaseGetcasescontextQuery()
}