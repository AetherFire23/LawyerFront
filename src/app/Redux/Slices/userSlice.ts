import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { LoginResult } from "../../../../mercichatgpt/ProcedureMakerServer/Authentication/ReturnModels/LoginResult";
import { UserDto } from "../../../../mercichatgpt/ProcedureMakerServer/Authentication/UserDto";
import { userApi } from "../Apis/userApi";
import { Role } from "../../../../mercichatgpt/ProcedureMakerServer/Authentication/Role";
// Define a type for the slice state
// Define the initial state using that type
const userDto: UserDto = {
  id: "2",
  lawyerId: "2",
  name: "",
  roles: [0],

} as UserDto;

const initialState: LoginResult = {
  token: "",
  userDto: userDto
};

export const userSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (
      userState,
      { payload: { token, userDto } }: PayloadAction<LoginResult>
    ) => {
      console.log("this is the loginResult in set user");
      console.log(userState);

      console.log("this is the current state in set user");
      console.log(userDto);
      userState.userDto.id = userDto.id;
      userState.userDto.lawyerId = userDto.lawyerId;
      userState.userDto.name = userDto.name;
      userState.userDto.roles = userDto.roles;
      userState.token = token;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      // update context when its received for getCases
      userApi.endpoints.getToken.matchFulfilled,
      (state, { payload: caseContext }) => {
        state.token = caseContext.token;
        state.userDto = caseContext.userDto;
        console.log("Store state of user slice has been updated.");
      }
    );
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
