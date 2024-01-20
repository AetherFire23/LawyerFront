import { CaseDto, ChamberNames, } from "../../../../../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { EnsureUnion } from "../../../../../../../../LogicFiles/Utils/StringExtensions";
import { enhancedApi } from "../../../../../../../../LogicFiles/Redux/codegen/enhancedApi";
import logObject from "../../../../../../../../LogicFiles/Utils/logObject";
import { mapCaseFormDataToDto } from "@/app/homePage/clients/clientpage/infopage/casepage/casePage-hooks";
import { Container, Fab, Paper, Typography } from "@mui/material";
import * as React from "react";
import TitleDivider from "../../../../../../../../LogicFiles/Components/TitleDivider";
import SaveIcon from '@mui/icons-material/Save';

export default function CaseForm({ caseDto }: { caseDto: CaseDto }) {
    const { register, reset, handleSubmit, control } = useForm<CaseDto>({ defaultValues: caseDto });
    const [triggerCaseUpdate, data] = enhancedApi.usePutCaseSavecaseMutation();
    const onSubmitCaseUpdate: SubmitHandler<CaseDto> = async (caseDtoFormData) => {
        const updatedCase = mapCaseFormDataToDto(caseDto, caseDtoFormData);
        logObject("updated on submit case :", updatedCase);
        triggerCaseUpdate({ body: updatedCase }).unwrap().then(() => {
            console.log("updated!");
        });
    };

    return (
        <FormBox formHandler={handleSubmit(onSubmitCaseUpdate)}>
            <TitleDivider title={"Case Information"}>
                <Fab size="medium" color="primary" type="submit" sx={{marginLeft: "1rem"}} >
                    <SaveIcon/>
                </Fab>
            </TitleDivider>
            <div className={"ml-5 mt-5"}>
                <Controller
                    render={({ field }) => (
                        <Select {...field}>
                            <MenuItem value={EnsureUnion<ChamberNames>("Family")}>Family</MenuItem>
                            <MenuItem value={EnsureUnion<ChamberNames>("Youth")}>Youth</MenuItem>
                        </Select>
                    )}
                    name={"chamberName"}
                    control={control}
                    defaultValue={caseDto.chamberName}/>
                <Typography fontSize={11}> Court Type </Typography>
            </div>
        </FormBox>
    );
}

function FormBox({ children, formHandler }: {
    children: React.ReactNode,
    formHandler: React.FormEventHandler<HTMLFormElement> | undefined
}) {
    return (
        <Container sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "50vw",
            marginTop: "1rem"
        }}>
            <Paper sx={{
                width: "50vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
            }}>
                <form onSubmit={formHandler}>
                    {children}
                </form>
            </Paper>
        </Container>
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
