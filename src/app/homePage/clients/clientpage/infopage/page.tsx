"use client";
import { useClientDtoSearchParam, } from "./infpoage-hooks";
import { DumbSuspenseCondition } from "../../../../../../LogicFiles/Components/DumbGetCasesSusense";
import ClientForm from "@/app/homePage/clients/clientpage/infopage/_components/ClientForm";
import CasesNavList from "@/app/homePage/clients/clientpage/infopage/_components/CasesNavList";
import CreateCaseButton from "@/app/homePage/clients/clientpage/infopage/_components/CreateCaseButton";
import useStoreUserFromLocalStorage from "../../../../../../LogicFiles/Hooks/useGetCasesLocal";
import { enhancedApi } from "../../../../../../LogicFiles/Redux/codegen/enhancedApi";

// https://www.svgrepo.com/svg/522262/save-floppy

export default function InfoPage() {
    useStoreUserFromLocalStorage();
    const data = enhancedApi.useGetCaseGetcasescontextQuery();
    const clientDto = useClientDtoSearchParam();
    console.log(data)
    return (
        <DumbSuspenseCondition condition={data.isSuccess && !data.isFetching && !!clientDto}>
            <label> am i loaded?</label>
            {clientDto && (
                <div>
                    <h1> infopage </h1>
                    <ClientForm clientDto={clientDto!}/>
                    <CasesNavList clientDto={clientDto!}/>
                    <CreateCaseButton clientId={clientDto!.id}/>
                </div>
            )}

        </DumbSuspenseCondition>);
}


// function useNavigateToCase() {
//     const router = useRouter();

//     function navigate(caseId: string) {
//         router.push(`/homePage/clients/clientpage/infopage/casepage?caseId=${caseId}`);
//     }

//     return navigate;
// }


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
