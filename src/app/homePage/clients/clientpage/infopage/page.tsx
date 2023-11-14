'use client'
import { useSearchParams } from 'next/navigation'
import { CaseDto } from '../../../../../../mercichatgpt/ProcedureMakerServer/Dtos/CaseDto';
import { useAppSelector } from '@/app/Redux/hooks'
import { useGetCasesQuery, useSaveCaseMutation } from '@/app/Redux/Apis/caseApi';
import { useForm, SubmitHandler, Controller, useFieldArray } from 'react-hook-form'
import { CasesContext } from '../../../../../../mercichatgpt/ProcedureMakerServer/Dtos/CasesContext'
import floppy from './save-floppy.svg'
import { Client } from '../../../../../../mercichatgpt/ProcedureMakerServer/Entities/Client';
import { produce } from 'immer';
import { CourtRoles } from '../../../../../../mercichatgpt/ProcedureMakerServer/Enums/CourtRoles';
import caseSlice from '@/app/Redux/Slices/caseSlice';
import { useState } from 'react';


// https://www.svgrepo.com/svg/522262/save-floppy
function useCaseDto() {
    const searchParams = useSearchParams()
    const caseId: string = searchParams.get("search") as string
    //const cases: CaseDto[] = useAppSelector(s => s.caseSlice.cases)
    const userSelector = useAppSelector(s => s.userSlice)


    const { data } = useGetCasesQuery(userSelector.userDto.lawyerId)

    const caseDto: CaseDto = data?.cases.find(c => c.id === caseId) as CaseDto // break if not found, not supposed to happen

    console.log("this is the data retrieved from cases query ")
    console.log(caseDto)
    return caseDto
}

export default function InfoPage() {
    const caseDto = useCaseDto()
    const [triggerSaveCase, { isError, isSuccess, isLoading }] = useSaveCaseMutation()
    const { register, handleSubmit, watch, formState: { errors }, control } = useForm<CaseDto>({
        defaultValues: caseDto
    })

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: 'participants', // unique name for your Field Array
    });

    const onSubmit: SubmitHandler<CaseDto> = async (caseDtoFormData) => {
        const nextCaseState = produce(caseDto, caseDraft => { // me souviens pus pk mais faut jutilise immer icitte 
            caseDraft.client.firstName = caseDtoFormData.client.firstName
            caseDraft.courtAffairNumber = caseDtoFormData.courtAffairNumber
            caseDraft.participants = caseDtoFormData.participants
        })

        console.log(caseDtoFormData as CaseDto)
        triggerSaveCase(nextCaseState)
        
        console.log('this is the formdata object:')
        console.log(caseDtoFormData)

        console.log('this is the dto object:')
        console.log(caseDto)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col items-center justify-center'>
                <button className='btn'> Save </button>
                <div className='flex flex-row justify-center mt-12'>
                    <div className='p-5 card flex flex-col items-center items justify-start mr-64 bg-neutral'>
                        <a> Client information </a>
                        <input placeholder='email' className="input mb-5 input-bordered" defaultValue="" {...register("client.email", {})} />
                        <input placeholder='firstName' className="input mb-5 input-bordered" defaultValue="" {...register("client.firstName", {})} />

                        <Controller
                            name="client.courtRole"
                            control={control}
                            render={({ field }) => (
                                <select className='select w-full max-w-xs' {...field}>
                                    <option value={CourtRoles.Plaintiff}> Plaintiff </option>
                                    <option value={CourtRoles.Defender}> Defender </option>
                                    <option value={CourtRoles.Intimated}> Intimated </option>
                                </select>
                            )}
                        />
                    </div>

                    {/* https://react-hook-form.com/docs/usefieldarray va falloir que je dompte cette beast*/}

                    {/*  court info */}
                    <div className='p-5 card flex flex-col items-center items justify-start bg-neutral'>
                        <a> Court information </a>
                        <input placeholder='courtAffairNumber' className="input mb-5 input-bordered" defaultValue="" {...register("courtAffairNumber", {})} />

                    </div>


                </div>


                {/* participants */}
                <div className='item-center justify-center flex flex-col bg-neutral p-5 card w-3/5 mt-5'>
                    <a> Participants </a>
                    {
                        fields.map((field, index) => {
                            return (
                                <div key={field.id} className='flex flex-col bg-gray-600 card p-3 justify-center items-center m-3'>
                                    <input className='input input-bordered' placeholder='firstName' type='text' {...register(`participants.${index}.firstName`)} />
                                    <Controller
                                        name={`participants.${index}.courtRole`}
                                        control={control}
                                        render={({ field }) => (
                                            <select className='select w-full max-w-xs' {...field}>
                                                <option value={CourtRoles.Plaintiff}> Plaintiff </option>
                                                <option value={CourtRoles.Defender}> Defender </option>
                                                <option value={CourtRoles.Intimated}> Intimated </option>
                                            </select>
                                        )}
                                    />
                                    <button className='btn w-1/3' type='button' onClick={e => remove(index)}> Remove  </button>
                                </div>
                            )
                        })
                    }
                </div>
                <button className='btn' type='button' onClick={e => append({} as any)}> Add participant </button>

            </div>
        </form>
    );
}