// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginRequest } from "../../../../mercichatgpt/ProcedureMakerServer/Authentication/AuthModels/ILoginRequest";
import { url } from "inspector";
import { LoginResult } from "../../../../mercichatgpt/ProcedureMakerServer/Authentication/ReturnModels/LoginResult";
// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5099/user" }),
  endpoints: (builder) => ({
    getToken: builder.query<LoginResult, ILoginRequest>({
      query: (req) => ({
        url: "credentialslogin",
        method: "PUT",
        body: req
        // providesTags: ["USER"],
      }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetTokenQuery } = userApi;
