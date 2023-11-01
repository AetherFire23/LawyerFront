'use client'

import { UserDto } from "../../../../mercichatgpt/ProcedureMakerServer/Authentication/UserDto";
import { AuthenticationActionTypes, AuthenticationPayload } from "./AuthenticationContext";

// export default function authenticationReducer(state: UserDto | null, payload: AuthenticationPayload) {
//     switch (payload.actionType) {

//         case AuthenticationActionTypes.OverwriteDto: {
//             console.log(`state is ${state} when beginning action`)
//             console.log(`state is paylaod${payload}`)

           
//             state = {
//                 ...payload.info
//             }

//             console.log(`state is ${state} when ending action`)
//         }
//     }
// }

export default function authenticationReducer(draft:UserDto | null, action:any) {
    const { actionType, info } = action;
    switch (actionType) {
      case AuthenticationActionTypes.OverwriteDto:
        // Mutate the draft state directly
        return draft = info;

      default:
        break;
    }
  };