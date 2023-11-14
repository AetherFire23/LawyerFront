import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { UserDto } from "../../../../mercichatgpt/ProcedureMakerServer/Authentication/UserDto";
import { Lawyer } from "../../../../mercichatgpt/ProcedureMakerServer/Entities/Lawyer";
import { CasesContext } from "../../../../mercichatgpt/ProcedureMakerServer/Dtos/CasesContext";
import { CourtRoles } from "../../../../mercichatgpt/ProcedureMakerServer/Enums/CourtRoles";
// Define a type for the slice state
// Define the initial state using that type
import { caseApi } from "../Apis/caseApi";
const initialState: CasesContext = { } as any 

export const caseSlice = createSlice({
  name: "cases",
  initialState,

  reducers: {
    update: (state, action: PayloadAction<number>) => {},

  },
  extraReducers: (builder) => {
    builder.addMatcher( // update context when its received for getCases
      caseApi.endpoints.getCases?.matchFulfilled,
      (state, { payload: caseContext }) => {
        state.cases = caseContext.cases;
        state.lawyer = caseContext.lawyer;
        console.log("Store state of cases has been updated.");
      }
    );
  },
});

export const {} = caseSlice.actions;
export default caseSlice.reducer;
