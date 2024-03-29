import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { UserDto } from "../../../../mercichatgpt/ProcedureMakerServer/Authentication/UserDto";
// import { Lawyer } from "../../../../mercichatgpt/ProcedureMakerServer/Entities/Lawyer";
// import { CasesContext } from "../../../../mercichatgpt/ProcedureMakerServer/Dtos/CasesContext";
// import { CourtRoles } from "../../../../mercichatgpt/ProcedureMakerServer/Enums/CourtRoles";
// Define a type for the slice state
// Define the initial state using that type
import { CaseContextDto, userApiGen2 } from "../codegen/userApi2Gen";
import logObject from "../../Utils/logObject";

const initialState: CaseContextDto = {} as any

export const caseSlice = createSlice({
  name: "cases",
  initialState,

  reducers: {
    update: (state, action: PayloadAction<number>) => { },

  },
  extraReducers: (builder) => {
    builder.addMatcher( // update context when its received for getCases
      userApiGen2.endpoints.getCaseGetcasescontext?.matchFulfilled,
      (state, { payload: caseContext }) => {


        state.user = caseContext.user
        state.lawyer = caseContext.lawyer
        state.clients = caseContext.clients
      }
    );
  },
});

export const {  } = caseSlice.actions;
export default caseSlice.reducer;
