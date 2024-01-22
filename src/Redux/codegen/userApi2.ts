// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

type prepareHeadersz = (
  headers: Headers,
  api: {
    getState: () => unknown
    extra: unknown
    endpoint: string
    type: 'query' | 'mutation'
    forced: boolean | undefined
  }
) => Headers | void

// initialize an empty api service that we'll inject endpoints into later as needed
export const userApi2 = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5099',
    prepareHeaders: (headers, { getState }) => {
      const rooState = getState() as RootState // Seems like I need to cast to RootState to access my store

      // Idea is that user must be initialized before doing any kind of stupid request
      const token = rooState.userSlice.token

      // since this is injected all the time, there might be a point where a request is made
      // without a token existing already
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
        console.log(`an authorization header was set to :${token}`)
      }
      return headers
    }
  }),
  endpoints: () => ({}),
})

// manually adding the tags isnt that bad.
// at least, I would not want to specify the tag server-side
// the reason is that its not the apis business to decide when to cache data
// also, it does not make a difference. I would still have to put an attribute server-side
// which is not that much different to doing it here also.


// it keeps saying to take the codegenApi
// and then to enhance it, but I need to reference the userApi2, the one that
// is not code-gen
// SO i DO have to deal with the fact that i have no intellisense
// to reference the correct query when adding the tags, what a bummer
const caseTag = ['Case']
// const enhancedApi = userApi2.enhanceEndpoints({
//   addTagTypes: caseTag,
//   endpoints: {
//     getCaseGetcasescontext: {
//       providesTags: caseTag,
//     },
//     putCaseAddclient: {
//       invalidatesTags: caseTag
//     }
//   }
// })
