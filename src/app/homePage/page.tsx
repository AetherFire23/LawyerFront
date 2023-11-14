'use client'

import { CasesContext } from '../../../mercichatgpt/ProcedureMakerServer/Dtos/CasesContext';
import useAuthenticationActions from '../Contexts/AuthenticationSlice/AuthenticationActions';
import { useAuthenticationContext } from '../Contexts/AuthenticationSlice/AuthenticationContext';
import { useAppSelector} from '../Redux/hooks';
import { useGetCasesQuery } from '../Redux/Apis/caseApi';

export default function HomePage() {
    const authContext = useAuthenticationContext()

    
    // how do layouts work?
    // can I send my layout in SSR then place my buttons?
    // 
    console.log(`is auth null in homepage: ${authContext === null} ${authContext}`)
    console.log(authContext)
    const caseSlice = useAppSelector(s => s.userSlice.userDto)
    const { isError, isFetching, data: caseContext } = useGetCasesQuery(caseSlice.lawyerId)
    return (
        <div>
            <div>
                <label className="flex flex-col items-center mt-5 "> Welcome to the lawyer app </label>
            </div>
        </div>
    )
}
