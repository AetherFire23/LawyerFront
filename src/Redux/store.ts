import { configureStore } from "@reduxjs/toolkit";
import { userApi2 } from "./codegen/userApi2";
import userSlice from "./Slices/userSlice";
import caseSlice from "./Slices/caseSlice";
// ...

export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    caseSlice: caseSlice,
    [userApi2.reducerPath]: userApi2.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi2.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
