'use client'
import { useAppDispatch } from '../Redux/hooks';
import useStoreUserFromLocalStorage from '../../../LogicFiles/Hooks/useGetCasesLocal'; 
export default function HomePage() {
    const dispatch = useAppDispatch()
    
    
    // used as refernce to get the token stored inside the window
    // useEffect(() => {
    //     console.log("this is loginResult inside of homePageLayout")
    //     const storedValue: string = window.localStorage.getItem("jwtToken") ?? ""
    //     const storedvalues = JSON.parse(storedValue) as LoginResult
    //     dispatch(setUser(storedvalues as LoginResult))
       
    // }, []);

    // const {data} = useGetCasesQuery()




    return (
        <div>
            <div>
                <label className="flex flex-col items-center mt-5 "> Welcome to the lawyer app </label>
            </div>
        </div>
    )
}
