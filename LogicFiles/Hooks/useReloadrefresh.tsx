import { useGetCasesQuery } from '../Redux/Apis/caseApi';
import { useGetTokenQuery } from '../Redux/Apis/userApi';
import { useLoginStorage } from './LocalStorage';


export default function useReloadRefresh() {
    const { setLoginResult, token } = useLoginStorage()
    const { } = useGetCasesQuery()
}