import { produce } from "immer";
import { LawyerDto } from "@/Redux/codegen/userApi2Gen";

export function mapFormDataToLawyerDto(lawyer: LawyerDto, formLawyer: LawyerDto) {
    const nextLawyer = produce(lawyer, lawyerDraft => {
        lawyerDraft.firstName = formLawyer.firstName;
        lawyerDraft.lastName = formLawyer.lastName;
        lawyerDraft.address = formLawyer.address;
        lawyerDraft.email = formLawyer.email;
        lawyerDraft.mobilePhoneNumber = formLawyer.mobilePhoneNumber;
    });

    return nextLawyer;
}
