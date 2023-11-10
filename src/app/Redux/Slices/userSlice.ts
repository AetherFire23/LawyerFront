import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { LoginResult } from "../../../../mercichatgpt/ProcedureMakerServer/Authentication/ReturnModels/LoginResult";
import { UserDto } from "../../../../mercichatgpt/ProcedureMakerServer/Authentication/UserDto";
import { Lawyer } from "../../../../mercichatgpt/ProcedureMakerServer/Entities/Lawyer";
import { caseApi } from "../Apis/caseApi";
// Define a type for the slice state
// Define the initial state using that type
const initialState: LoginResult = {
  token: "",
  userDto: {
    id: "",
    lawyerId: "",
    name: "",
    roles: [],
  },
};

export const userSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (
      userState,
      { payload: loginResult }: PayloadAction<LoginResult>
    ) => {
      userState.userDto.id = loginResult.userDto.id;
      userState.userDto.lawyerId = loginResult.userDto.lawyerId;
      userState.userDto.name = loginResult.userDto.name;
      userState.userDto.roles = loginResult.userDto.roles;
      userState.token = loginResult.token;
    },
  },


});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
