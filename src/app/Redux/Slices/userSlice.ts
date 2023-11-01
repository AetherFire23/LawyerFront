import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { UserDto } from "../../../../mercichatgpt/ProcedureMakerServer/Authentication/UserDto";
// Define a type for the slice state
// Define the initial state using that type
const initialState: UserDto = {
  id: "",
  lawyerId: "",
  name: "",
  roles: [],
};

export const userSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (userState, { payload: userDto }: PayloadAction<UserDto>) => {
      userState.id = userDto.id;
      userState.lawyerId = userDto.lawyerId;
      userState.name = userDto.name;
      userState.roles = userDto.roles;
    },
  },
});

export const {} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.pokemonApi

export default userSlice.reducer;
