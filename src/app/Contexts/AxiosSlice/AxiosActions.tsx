import { ILoginRequest } from '../../../../mercichatgpt/ProcedureMakerServer/Authentication/AuthModels/ILoginRequest';
import { useAxiosContext } from './AxiosContext';
import { useTokenStorage } from '../../Hooks/LocalStorage';
import { AxiosResponse } from 'axios';
import { UserEndpoints } from '../../../../mercichatgpt/ProcedureMakerServer/Constants/UserEndpoints';

interface UserRequests {
    loginWithCredentialsRequest: (request: ILoginRequest) => Promise<AxiosResponse<any, any>>
    tokenLoginRequest: () => Promise<AxiosResponse<any, any>>
}

export function useUserRequests() {
    const { token } = useTokenStorage() 
    const axios = useAxiosContext() 

    const loginWithCredentialsRequest = (request: ILoginRequest) => {
        const res: Promise<AxiosResponse<any, any>> = axios.put(UserEndpoints.credentialsLogin, request)
        return res;
    }

    const tokenLoginRequest = () => axios.post(UserEndpoints.tokenLogin, null, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }); // Added a closing parenthesis and a semicolon

    const reqs: UserRequests = {
        loginWithCredentialsRequest: loginWithCredentialsRequest,
        tokenLoginRequest: tokenLoginRequest
    }

    return reqs
}
