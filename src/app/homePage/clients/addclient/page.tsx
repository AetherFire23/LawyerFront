'use client'
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/app/Redux/hooks';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'

export default function AddClientPage() {
    const userState = useAppSelector(s => s.userSlice)
    // const {} = useGetCasesQuery(userState.userDto.lawyerId)
    const router = useRouter()
    const [triggerCreateCase, { isLoading, isError, isSuccess }] = useCreateCaseMutation()

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
            lawyerId: userState.userDto.lawyerId as string
        }
        triggerCreateCase(caseInfo)

    };

    return (
        <Stack>
            <form className="flex flex-col items-center justify-center mt-32" onSubmit={handleSubmit(onSubmit)}>
                <TextField id="standard-basic" label="UserName" variant="standard" defaultValue="" className="input mb-5 input-bordered"  {...register("clientFirstName", { required: true })} />
                <TextField id="standard-basic" label="UserName" variant="standard" defaultValue="" className="input mb-5 input-bordered"  {...register("clientLastName", { required: true })} />
                <TextField id="standard-basic" label="UserName" variant="standard" defaultValue="" className="input mb-5 input-bordered"  {...register("caseNumber", { required: true })} />
                <Button className='btn' type="submit"> Confirm </Button>
            </form>
            <Link href={"/"}>
            </Link>
        </Stack>
    )
}