// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginRequest } from "../../../../mercichatgpt/ProcedureMakerServer/Authentication/AuthModels/ILoginRequest";
import { LoginResult } from "../../../../mercichatgpt/ProcedureMakerServer/Authentication/ReturnModels/LoginResult";
import { CasesContext } from "../../../../mercichatgpt/ProcedureMakerServer/Dtos/CasesContext";
import { CasesEndpoints } from "../../../../mercichatgpt/ProcedureMakerServer/Constants/CasesEndpoints";
import HTTPMethods from "@/app/Utils/HttpMethods";
import { RootState } from "../store";
import userSlice from "../Slices/userSlice";
import { CaseCreationInfo } from "../../../../mercichatgpt/ProcedureMakerServer/Models/CaseCreationInfo";
import { CaseDto } from "../../../../mercichatgpt/ProcedureMakerServer/Dtos/CaseDto";
import { Lawyer } from '../../../../mercichatgpt/ProcedureMakerServer/Entities/Lawyer';

export const caseApi = createApi({
  reducerPath: "caseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5099/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userSlice.token;
      console.log(`curr token: ${token}`);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      } else {
        console.log("tokens cant be null man");
      }
    },
  }),
  tagTypes: ["Case"],

  endpoints: (builder) => ({
    getCases: builder.query<CasesContext, string>({
      query: (lawyerId) => ({
        url: `${CasesEndpoints.getCasesContext}?lawyerId=${lawyerId}`,
        method: HTTPMethods.GET,
      }),
      providesTags: ["Case"],
    }),
    createCase: builder.mutation<LoginResult, CaseCreationInfo>({
      query: (req) => ({
        url: CasesEndpoints.createNewCase,
        method: HTTPMethods.POST,
        body: req,
      }),
      invalidatesTags: ["Case"],
    }),
    saveCase: builder.mutation<void, CaseDto>({
      query: (caseDto) => ({
        url: CasesEndpoints.saveContextDto,
        body: caseDto,
        method: HTTPMethods.PUT,
      }),
      invalidatesTags: ["Case"],
    }),

    saveLawyer: builder.mutation<void, Lawyer>({
      query: (lawyer) => ({
        url: "case/modifyLawyer",
        body: lawyer,
        method: HTTPMethods.PUT,
      }),
      invalidatesTags: ["Case"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useCreateCaseMutation, useGetCasesQuery, useSaveCaseMutation, useSaveLawyerMutation } =
  caseApi;
