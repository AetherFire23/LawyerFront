import { CasesContext } from '../../../mercichatgpt/ProcedureMakerServer/Dtos/CasesContext';
import { setLocalStorageValue, getLocalStorageValue, StorageTypes } from '../Hooks/useLocalStorage';



export default function LoginPage() {
    const sampleToken = "2242424";
    setLocalStorageValue(StorageTypes.jwtToken, sampleToken)


    const result = getLocalStorageValue(StorageTypes.jwtToken)

    console.log(result);
    return(
        <div>
            <a> I am a page </a>
        </div>
    )
}