import * as React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { mapCaseFormDataToDto } from "@/app/homePage/clients/clientpage/infopage/casepage/casePage-hooks";
import { Container, Fab, Paper, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { CaseDto, ChamberNames } from "@/Redux/codegen/userApi2Gen";
import { enhancedApi } from "@/Redux/codegen/enhancedApi";
import logObject from "@/Utils/logObject";
import TitleDivider from "@/Components/TitleDivider";
import { EnsureUnion } from "@/Utils/StringExtensions";
import { FormBody, FormContainer, FormField, FormHeader } from "@/Components/GenericForms/FormBody";
import { SaveIconButton } from "@/Components/Icons/Icons";
import Button from "@mui/material/Button";

export default function CaseForm({ caseDto }: { caseDto: CaseDto }) {
    const {  handleSubmit, control } = useForm<CaseDto>({ defaultValues: caseDto });
    const [triggerCaseUpdate] = enhancedApi.usePutCaseSavecaseMutation();
    const onSubmitCaseUpdate: SubmitHandler<CaseDto> = async (caseDtoFormData) => {
        const updatedCase = mapCaseFormDataToDto(caseDto, caseDtoFormData);
        logObject("updated on submit case :", updatedCase);

        triggerCaseUpdate({ body: updatedCase}).unwrap().then(() => {
            console.log("updated!");
        });
    };

    return (
        <>
            <Container sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "1rem" }}>
                <FormContainer submitHandler={handleSubmit(onSubmitCaseUpdate)}>
                    <FormHeader title={"Activity Information"}>
                        <SaveIconButton type={"submit"}/>
                    </FormHeader>
                    <FormBody>
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
                        <Button type={"submit"}></Button>
                    </FormBody>
                </FormContainer>
            </Container>
        </>

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
