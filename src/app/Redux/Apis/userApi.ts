// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginRequest } from "../../../../mercichatgpt/ProcedureMakerServer/Authentication/AuthModels/ILoginRequest";
import { url } from "inspector";
import { LoginResult } from "../../../../mercichatgpt/ProcedureMakerServer/Authentication/ReturnModels/LoginResult";
import { RegisterRequest } from "../../../../mercichatgpt/ProcedureMakerServer/Authentication/AuthModels/RegisterRequest";
// Define a service using a base URL and expected endpoints

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5099/user" }),
  endpoints: (builder) => ({
    getToken: builder.query<LoginResult, ILoginRequest>({
      // query because it does not delete anything in db- simply generates token for user
      query: (req) => ({
        url: "credentialslogin",
        method: "PUT",
        body: req,
        // providesTags: ["USER"],
      }),
    }),

    register: builder.mutation<void, RegisterRequest>({
      query: (registerRequest) => ({
        url: "register",
        method: "POST",
        body: registerRequest,
      }),
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetTokenQuery, useRegisterMutation } = userApi;
