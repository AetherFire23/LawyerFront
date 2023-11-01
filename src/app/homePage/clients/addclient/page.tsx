'use client'
import { CaseCreationInfo } from '../../../../../mercichatgpt/ProcedureMakerServer/Models/CaseCreationInfo';
import { useAuthenticationContext } from "@/app/Contexts/AuthenticationSlice/AuthenticationContext";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link"
import { createNewCase } from "@/app/Contexts/CaseSlice/CaseRequests";
import { useRouter } from 'next/navigation'
import { GetCaseResponse } from '../../../../../mercichatgpt/ProcedureMakerServer/Models/GetCaseResponse';
import { useSearchParams } from 'next/navigation'
export default function AddClientPage() {
    const userContext = useAuthenticationContext()
    const router = useRouter()
    interface IFormValues {
        caseNumber: string;
        clientFirstName: string;
        clientLastName: string;
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormValues>()

    const onSubmit: SubmitHandler<IFormValues> = async (data) => {
        console.log(data)
        const caseInfo: CaseCreationInfo = {
            caseNumber: data.caseNumber,
            clientFirstName: data.clientFirstName,
            clientLastName: data.clientLastName,
            lawyerId: userContext?.lawyerId as string
        }

        try {
            console.log(userContext)

            const {createdId}= await createNewCase(caseInfo)


            // navigate to findClient page
            router.push(`/homePage/clients/findclient?search=${createdId}`)

            console.log("successfully added case Info")
            console.log(data)
        } catch (err) {
            console.log(`error during case creation ${err}`);
        }
    };

    return (
        <div className="flex flex-col items-center mt-5">
            <form className="flex flex-col items-center justify-center mt-32" onSubmit={handleSubmit(onSubmit)}>
                <input placeholder='clientFirstName' className="input mb-5 input-bordered" defaultValue="" {...register("clientFirstName", { required: true })} />
                <input placeholder='clientLastName' className="input mb-5 input-bordered" defaultValue="" {...register("clientLastName", { required: true })} />
                <input placeholder='caseNumber' className="input mb-5 input-bordered" defaultValue="" {...register("caseNumber", { required: true })} />

                <button className='btn' type="submit"> Confirm  </button>
            </form>

            <Link href={"/"}>
            </Link>

        </div>
    )
}