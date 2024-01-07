import { useEffect } from "react";
import { setUser } from "../../src/app/Redux/Slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../src/app/Redux/hooks";
import { LoginResult, useGetCaseGetcasescontextQuery } from "../../src/app/Redux/codegen/userApi2Gen";
import { userApiGen2 } from "../../src/app/Redux/codegen/userApi2Gen";
import logObject from "../Utils/logObject";
// This will allow the automatic re-fetch of getcases in case the page gets loaded.
// uses the token stored inside the window

export default function useStoreUserFromLocalStorage() {
    const dispatch = useAppDispatch()
    // useEffect to ensure the window exists
    useEffect(() => {
        const storedValue: string = window.localStorage.getItem("jwtToken") ?? ""
        const storedValues = JSON.parse(storedValue) as LoginResult
        dispatch(setUser(storedValues))

        logObject('The user was set to user found in localStorage:', storedValues)
        console.log(`expecting rtk query to prepare headers`)
    }, []);
    // seems like empty dependency is necessary
}