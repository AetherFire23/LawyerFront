import { CasesEndpoints } from "../../../../mercichatgpt/ProcedureMakerServer/Constants/CasesEndpoints";
import { CasesContext } from "../../../../mercichatgpt/ProcedureMakerServer/Dtos/CasesContext";
import { CaseCreationInfo } from "../../../../mercichatgpt/ProcedureMakerServer/Models/CaseCreationInfo";
import { GetCaseResponse } from "../../../../mercichatgpt/ProcedureMakerServer/Models/GetCaseResponse";
import {axiosInstance} from "../AxiosSlice/AxiosFun2";
import { UriBuilder } from "../../ControllerRequests/UriBuilder";


export async function createNewCase(caseCreationInfo: CaseCreationInfo) {
  const response = await axiosInstance.post(`${CasesEndpoints.createNewCase}`, caseCreationInfo);
  return response.data as GetCaseResponse
}

export async function saveCases(caseContext: CasesContext) {
    await axiosInstance.put(`${CasesEndpoints.saveContextDto}`, caseContext);
  }
  
  export async function getCases(lawyerId: string) { 
    const builder = new UriBuilder() 
    builder.prefix = CasesEndpoints.getCasesContext 
    builder.addParameter("lawyerId", lawyerId) 
    const builtUri = builder.buildUriString()
    console.log(builtUri)
    const response = await axiosInstance.get(builder.buildUriString())
    return response.data as CasesContext
  }
