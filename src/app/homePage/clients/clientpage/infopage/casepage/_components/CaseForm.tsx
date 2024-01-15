import {
    CaseDto, ChamberNames,
    ClientDto,
} from "../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { EnsureUnion } from "../../../../../../../../LogicFiles/Utils/StringExtensions";
import { enhancedApi } from "../../../../../../../../LogicFiles/Redux/codegen/enhancedApi";
import logObject from "../../../../../../../../LogicFiles/Utils/logObject";
import { mapCaseFormDataToDto } from "@/app/homePage/clients/clientpage/infopage/casepage/casePage-hooks";

export default function CaseForm({ caseDto }: { caseDto: CaseDto }) {
    const { register, reset, handleSubmit, control } = useForm<CaseDto>({ defaultValues: caseDto });
    const [triggerCaseUpdate, data] = enhancedApi.usePutCaseSavecaseMutation();
    const onSubmitCaseUpdate: SubmitHandler<CaseDto> = async (caseDtoFormData) => {
        const updatedCase = mapCaseFormDataToDto(caseDto, caseDtoFormData);
        logObject("updated on submit case :", updatedCase);
        triggerCaseUpdate({ body: updatedCase }).unwrap().then(() => {
            console.log("updated!")
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitCaseUpdate)}>
                <div>
                    {/* <section> */}
                    {/*     <label>MUI Select</label> */}
                    {/*     <Select {...register("chamberName")}> */}
                    {/*         <MenuItem value={EnsureUnion<ChamberNames>("Family")}>Family</MenuItem> */}
                    {/*         <MenuItem value={EnsureUnion<ChamberNames>("Youth")}>Youth</MenuItem> */}
                    {/*     </Select> */}
                    {/* </section> */}

                    <Controller
                        render={({ field }) => (
                            <Select {...field}>
                                <MenuItem value={EnsureUnion<ChamberNames>("Family")}>Family</MenuItem>
                                <MenuItem value={EnsureUnion<ChamberNames>("Youth")}>Youth</MenuItem>
                            </Select>
                        )}
                        name={"chamberName"}
                        control={control}
                        defaultValue={caseDto.chamberName}
                    />
                </div>
                <Button type="submit"> Save </Button>
            </form>
        </div>
    );
}


// function CourtTypes({ control }: { control: any }) {
//     return (
//         <div>
//             <Controller
//                 name="client.courtRole"
//                 control={control}
//                 render={({ field }) => (
//                     <select className="select w-full max-w-xs" {...field}>
//                         <option value={ensureCourtRole("Plaintiff")}> Plaintiff</option>
//                         <option value={ensureCourtRole("Defender")}> Defender</option>
//                         <option value={ensureCourtRole("Intimated")}> Intimated</option>
//                     </select>
//                 )}
//             />
//         </div>
//     );
// }
