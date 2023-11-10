'use client'

import { SubmitHandler, useForm , Controller } from "react-hook-form"
import { Lawyer } from "../../../../mercichatgpt/ProcedureMakerServer/Entities/Lawyer"
import { CasesContext } from "../../../../mercichatgpt/ProcedureMakerServer/Dtos/CasesContext"
import { useAppSelector } from "@/app/Redux/hooks"
import caseSlice from '../../Redux/Slices/caseSlice';
import { produce } from "immer"
import { useGetCasesQuery } from "@/app/Redux/Apis/caseApi"
import { useSaveCaseMutation, useSaveLawyerMutation } from "@/app/Redux/Apis/caseApi"

export default function PersonalInfoPage() {
    const { register, handleSubmit, watch, formState: { errors }, control} = useForm<Lawyer>()

    const userSlice = useAppSelector(s => s.userSlice.userDto)
    const { isError: isErrorGetCases, isFetching, data: caseContext, isSuccess: isSuccessGetCases } = useGetCasesQuery(userSlice.lawyerId)

    const [triggerSaveLawyer, { isLoading, isError: isErrorGetLawyer, isSuccess }] = useSaveLawyerMutation()


    console.log("test")
    console.log(isSuccessGetCases ? caseContext?.lawyer.firstName : "")
    console.log(caseContext)
    console.log(caseContext?.lawyer.firstName)

    const onSubmit: SubmitHandler<Lawyer> = async (lawyerForm) => {
        console.log("submitting form....")
        // send lawyer req after
        const nextLawyerState = produce(caseContext?.lawyer, lawyerDraft => {
            console.log(`Am I undefined? ${lawyerDraft}`)

            if (lawyerDraft === undefined) return

            lawyerDraft.firstName = lawyerForm.firstName
            lawyerDraft.lastName = lawyerForm.lastName
            lawyerDraft.user = {} as any

        }) as Lawyer

        triggerSaveLawyer(nextLawyerState)


        console.log(' this is the result of the nextState draft production')
        console.log(nextLawyerState)
    }

    return (
        <div className="flex flex-col items-center justify-center pb-5">
            <a> Lawyer information </a>

            <div className='flex'>
                <form className='p-5 card flex flex-col items-center items justify-start bg-neutral' onSubmit={handleSubmit(onSubmit)}>
                    <input autoComplete="nope" placeholder='first name' className="input mb-5 input-bordered" defaultValue={isSuccessGetCases ? caseContext?.lawyer.firstName : ""} {...register("address", {})} />
                    <input autoComplete="nope" placeholder='last name' className="input mb-5 input-bordered" defaultValue={isSuccessGetCases ? caseContext.lawyer.lastName : ''} {...register("firstName", {})} />
                    <input autoComplete="nope" placeholder='post case' className="input mb-5 input-bordered" defaultValue="" {...register("postalCase", {})} />
                    <input autoComplete="nope" placeholder='address' className="input mb-5 input-bordered" defaultValue="" {...register("address", {})} />
                    <input autoComplete="nope" placeholder='mobile phone' className="input mb-5 input-bordered" defaultValue="" {...register("mobilePhoneNumber", {})} />


                    <select> sd</select>

                    <button className='btn' type="submit"> Save </button>
                </form>
            </div>
        </div>
    )
}