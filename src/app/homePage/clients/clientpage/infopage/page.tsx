"use client";
import { Container, Paper, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import useStoreUserFromLocalStorage from "../../../../../../LogicFiles/Hooks/useGetCasesLocal";
import { mapFormDataToCaseDto, useFormReset, } from "./infpoage-hooks";
import { useRouter, useSearchParams } from "next/navigation";
import {
    CaseDto,
    ClientDto,
    CourtRoles,
    usePostCaseCreatenewcaseMutation
} from "../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { useAppSelector } from "../../../../../../LogicFiles/Redux/hooks";
import { enhancedApi } from "../../../../../../LogicFiles/Redux/codegen/enhancedApi";

// https://www.svgrepo.com/svg/522262/save-floppy

// workaround to oazapfts implementation in rtk query codegen
// not generating typescript enums and using sting union types instead.
// More precisely, the string argument is ensured to be included inside the code-generated union type
// function ensureCase<TUnion extends string>(op: TUnion) {
//     return op
// }

function logObject(message: string, obj: any) {
    console.log(message);
    console.log(obj);
}

function ensureCourtRole(op: CourtRoles) {
    return op;
}

function useClientDtoSearchParam() {
    useStoreUserFromLocalStorage();
    const searchParams = useSearchParams();
    const caseId = searchParams.get("clientId");
    const clients = useAppSelector((s) => s.caseSlice.clients);

    // need this cast as clientDto to avoid
    // feeding undefined to the react hook form library and therefore
    // I avoid a null exception
    const clientDto = clients
        ? (clients.find((c) => c.id === caseId) as ClientDto)
        : ({} as ClientDto);

    return clientDto;
}

export default function InfoPage() {
    const clientDto = useClientDtoSearchParam();
    const { isFetching: isFetchingCases } = enhancedApi.useGetCaseGetcasescontextQuery();

    return (
        <div>
            {isFetchingCases && <div> fetching cases... </div>}
            {!isFetchingCases && (
                <div>
                    <h1> infopage </h1>
                    <ClientForm clientDto={clientDto}/>
                    <ClientCasesList clientDto={clientDto}/>
                </div>
            )}
        </div>
    );
}

function ClientForm({ clientDto }: { clientDto: ClientDto }) {
    const { isFetching: isFetchingCases, isSuccess: isSuccessCases } = enhancedApi.useGetCaseGetcasescontextQuery();
    const [triggerUpdateClient,] = enhancedApi.usePutCaseUpdateclientMutation();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
        reset,
    } = useForm<ClientDto>({ defaultValues: clientDto, });
    useFormReset(isSuccessCases, clientDto, reset);

    const onSubmitClientUpdate: SubmitHandler<ClientDto> = async (caseDtoFormData) => {
        console.log("submitting client");
        const nextClientDto = mapFormDataToCaseDto(clientDto, caseDtoFormData);
        triggerUpdateClient({ body: nextClientDto });
    };

    return (
        <form onSubmit={handleSubmit(onSubmitClientUpdate)}>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "25vw",
                }}
            >
                <Button type="submit"> Save </Button>
                {/* <FormTextField additionalProps={register("address", {})} /> */}
                <TextField
                    {...register("address", {})}
                    id="standard-basic"
                    label="adresse"
                    variant="outlined"
                    className="input mb-5 input-bordered"
                    defaultValue=""
                />
                <TextField
                    {...register("firstName", {})}
                    id="standard-basic"
                    label="firstName"
                    variant="outlined"
                    className="input mb-5 input-bordered"
                    defaultValue=""
                />
                <TextField
                    {...register("lastName", {})}
                    id="standard-basic"
                    label="lastName"
                    variant="outlined"
                    className="input mb-5 input-bordered"
                    defaultValue=""
                />
                <TextField {...register("email", {})} id="standard-basic" label="email" variant="outlined"
                           className="input mb-5 input-bordered" defaultValue=""
                />
            </Container>
        </form>
    );
}

function ClientCasesList({ clientDto }: { clientDto: ClientDto }) {

    logObject("those are the caseDtos of the client:", clientDto.cases);
    const canRenderCases = clientDto.cases && Object.keys(clientDto.cases).length !== 0;
    return (
        <Container
            sx={{
                width: "25vw",
            }}>
            <AddCaseButton clientId={clientDto.id}/>

            <ul>
                {canRenderCases && clientDto.cases?.map(c => (
                    <li key={c.id}>
                        <ClientCaseCard caseDto={c}/>
                    </li>
                ))}
            </ul>
        </Container>
    );
}

function ClientCaseCard({ caseDto }: { caseDto: CaseDto }) {
    logObject(`caseCard: `, caseDto);
    const navigate = useNavigateToCase();
    return (
        <Paper
            elevation={3}
            sx={{}}
            onClick={() => navigate(caseDto.id)}
        >
            <Typography> {caseDto.chamberName} </Typography>
        </Paper>
    );
}

function AddCaseButton({ clientId }: { clientId: string }) {
    const [triggerAddCase, queryData] = usePostCaseCreatenewcaseMutation();
    const navigate = useNavigateToCase();

    function addCaseAndNavigate() {
        triggerAddCase({ clientId: clientId }).unwrap().then(caseid => {
            navigate(caseid.createdId!);
        });
    }

    return (
        <Button onClick={addCaseAndNavigate}> Add Case </Button>
    );
}

function useNavigateToCase() {
    const router = useRouter();

    function navigate(caseId: string) {
        router.push(`/homePage/clients/clientpage/infopage/casepage?caseId=${caseId}`);
    }

    return navigate;
}




{
    /* <div>
              <a></a>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='flex flex-col items-center justify-center'>
                      <Button type='submit'> Save </Button>

                      {/* client */
}
// <div className='flex flex-row justify-center mt-12'>
//     <div className='p-5 card flex flex-col items-center items justify-start mr-64 bg-neutral'>
//         <a> Client information </a>
//         <TextField id="standard-basic" label="Standard" variant="outlined" className="input mb-5 input-bordered" defaultValue="" {...register("client.email", {})} />
//         <TextField id="standard-basic" label="Standard" variant="outlined" className="input mb-5 input-bordered" defaultValue="" {...register("client.firstName", {})} />
//         <Controller
//             name="client.courtRole"
//             control={control}
//             render={({ field }) => (
//                 <select className='select w-full max-w-xs' {...field}>
//                     <option value={ensureCourtRole("Plaintiff")}> Plaintiff </option>
//                     <option value={ensureCourtRole("Defender")}> Defender </option>
//                     <option value={ensureCourtRole("Intimated")}> Intimated </option>
//                 </select>
//             )}
//         />
//     </div>
//     {/* https://react-hook-form.com/docs/usefieldarray va falloir que je dompte cette beast*/}
//     {/*  court info */}
//     <div className='p-5 card flex flex-col items-center items justify-start bg-neutral'>
//         <a> Court information </a>
//         <input placeholder='courtAffairNumber' className="input mb-5 input-bordered" defaultValue="" {...register("courtAffairNumber", {})} />
//     </div>
// </div>

{
    /* participants
                  <div >
                      <a> Participants </a>
                      {
                          fields.map((field, index) => {
                              return (
                                  <Box key={field.id} sx={{ padding: '1rem' }}>
                                      <Card sx={{ padding: '1rem' }}>
                                          <Stack direction="row">
                                              <TextField id="outlined-basic" label="Outlined" variant="outlined" className='input input-bordered' placeholder='firstName' type='text' {...register(`participants.${index}.firstName`)} />
                                              <Controller
                                                  name={`participants.${index}.courtRole`}
                                                  control={control}
                                                  render={({ field }) => (
                                                      <Select {...field} defaultValue={field.value}>
                                                          <MenuItem value={ensureCourtRole("Defender")}>Defender</MenuItem>
                                                          <MenuItem value={ensureCourtRole("Plaintiff")}>Plaintiff</MenuItem>
                                                      </Select>
                                                  )}
                                              />
                                              <button className='btn w-1/3' type='button' onClick={e => remove(index)}> Remove  </button>
                                          </Stack>
                                      </Card>
                                  </Box>
                              )
                          })
                      }
                  </div>
   */
}

{
    /* <button className='btn' type='button' onClick={e => append({} as any)}> Add participant </button> */
}
//         </div>
//     </form>
// </div> */}
