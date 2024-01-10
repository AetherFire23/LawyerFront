import { LawyerDto } from "../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { produce } from "immer";

export function mapFormDataToLawyerDto(lawyer: LawyerDto, formLawyer: LawyerDto) {
    const nextLawyer = produce(lawyer, lawyerDraft => {
        lawyerDraft.firstName = formLawyer.firstName;
        lawyerDraft.lastName = formLawyer.lastName;
        lawyerDraft.address = formLawyer.address;
        lawyerDraft.email = formLawyer.email;
    });

    return nextLawyer;
}
