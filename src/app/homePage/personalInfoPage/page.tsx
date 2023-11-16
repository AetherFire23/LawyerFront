'use client'

import { SubmitHandler, useForm, Controller } from "react-hook-form"
import { Lawyer } from "../../../../mercichatgpt/ProcedureMakerServer/Entities/Lawyer"
import { CasesContext } from "../../../../mercichatgpt/ProcedureMakerServer/Dtos/CasesContext"
import { useAppSelector } from "@/app/Redux/hooks"
import caseSlice from '../../Redux/Slices/caseSlice';
import { produce } from "immer"
import { useGetCasesQuery } from "@/app/Redux/Apis/caseApi"
import { useSaveCaseMutation, useSaveLawyerMutation } from "@/app/Redux/Apis/caseApi"
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
export default function PersonalInfoPage() {
    const { register, handleSubmit, watch, formState: { errors }, control } = useForm<Lawyer>()

    const userSlice = useAppSelector(s => s.userSlice.userDto)
    const { isError: isErrorGetCases, isFetching, data: caseContext, isSuccess: isSuccessGetCases } = useGetCasesQuery()

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
        <Container>
            <Box>
                <Stack direction='column'>
                    <Typography> Lawyer information </Typography>
                    <Stack>
                        <form className='p-5 card flex flex-col items-center items justify-start bg-neutral' onSubmit={handleSubmit(onSubmit)}>
                            <TextField id="standard-basic" label="UserName" variant="standard" className="input mb-5 input-bordered" defaultValue={isSuccessGetCases ? caseContext?.lawyer.firstName : ""} {...register("address", {})} />
                            <TextField id="standard-basic" label="UserName" variant="standard" className="input mb-5 input-bordered" defaultValue={isSuccessGetCases ? caseContext.lawyer.lastName : ''} {...register("firstName", {})} />
                            <TextField id="standard-basic" label="UserName" variant="standard" className="input mb-5 input-bordered" defaultValue="" {...register("postalCase", {})} />
                            <TextField id="standard-basic" label="UserName" variant="standard" className="input mb-5 input-bordered" defaultValue="" {...register("address", {})} />
                            <TextField id="standard-basic" label="UserName" variant="standard" className="input mb-5 input-bordered" defaultValue="" {...register("mobilePhoneNumber", {})} />
                            <Button variant="outlined" type="submit"> Save </Button>
                        </form>
                    </Stack>
                </Stack>
            </Box>
        </Container>
    )
}