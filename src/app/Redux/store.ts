import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./Apis/userApi";
import {caseApi} from "./Apis/caseApi"
import userSlice from "./Slices/userSlice";
import caseSlice from './Slices/caseSlice';
// ...

export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    caseSlice: caseSlice,
    [userApi.reducerPath]: userApi.reducer,
    [caseApi.reducerPath]: caseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware).concat(caseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;