'use client'

import { ILoginRequest } from "../../../../mercichatgpt/ProcedureMakerServer/Authentication/AuthModels/ILoginRequest";
import { RegisterRequest } from "../../../../mercichatgpt/ProcedureMakerServer/Authentication/AuthModels/RegisterRequest";
import { LoginResult } from "../../../../mercichatgpt/ProcedureMakerServer/Authentication/ReturnModels/LoginResult";
import { UserEndpoints } from "../../../../mercichatgpt/ProcedureMakerServer/Constants/UserEndpoints";
import { axiosInstance } from "../AxiosSlice/AxiosFun2";
import HttpStatusCode from "../../../../LogicFiles/Utils/HttpStatusCodes";

// if not error, worked
// actually works when you wrap that inside a try{} catch(axiosError).
export async function registerRequest(registerRequest: RegisterRequest) {
  await axiosInstance.post(`${UserEndpoints.register}`, registerRequest);
}

export async function credentialsLoginRequest(
  loginRequest: ILoginRequest
): Promise<LoginResult> {
  const loginResult = await axiosInstance.put(
    `${UserEndpoints.credentialsLogin}`,
    loginRequest
  );
  return loginResult.data as LoginResult;
}

export async function myAuthorizedRequest() {
  await axiosInstance.get(`user/authorizedrequest`);
}
