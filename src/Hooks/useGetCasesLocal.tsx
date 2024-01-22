import { useEffect } from "react";
import { setUser } from "@/Redux/Slices/userSlice";
import { useAppDispatch } from "@/Redux/hooks";
import { LoginResult } from "@/Redux/codegen/userApi2Gen";

/** This loads the user from the browser local storage in case the page gets loaded.
 * This will later allow the getCases query to be authorized when needed. */
export default function useStoreUserFromLocalStorage() {
    const dispatch = useAppDispatch()

    // useEffect to ensure the window exists
    useEffect(() => {
        const storedValue: string = window.localStorage.getItem("jwtToken") ?? ""
        const storedValues = JSON.parse(storedValue) as LoginResult
        dispatch(setUser(storedValues))
        // console.log(`expecting rtk query to prepare headers on next query`)
    }, []);
    // seems like empty dependency is necessary
}
