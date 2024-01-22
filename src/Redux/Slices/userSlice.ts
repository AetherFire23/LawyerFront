import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginResult, UserDto } from "../codegen/userApi2Gen";

// Define the initial state using that type
const userDto: UserDto = {
    id: "2",
    lawyerId: "2",
    name: "",
    roles: ["Normal"],
};

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
            userState!.userDto!.id = userDto?.id!;
            userState!.userDto!.lawyerId = userDto?.lawyerId;
            userState!.userDto!.name = userDto?.name;
            userState!.userDto!.roles = userDto?.roles;
            userState.token = token;
        },
    },
    extraReducers: (builder) => {
        // builder.addMatcher(
        //   // updatze context when its received for getCases
        //   userApiGen2.endpoints.putUserCredentialslogin.matchFulfilled,
        //   (state, { payload: caseContext }) => {
        //     state.token = caseContext.token;
        //     state.userDto = caseContext.userDto;
        //     console.log("Store state of user slice has been updated.");
        //   }
        // );
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
