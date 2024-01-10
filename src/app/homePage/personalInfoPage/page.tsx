"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { produce } from "immer";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { LawyerDto, usePutCaseUpdatelawyerMutation } from "../../../../LogicFiles/Redux/codegen/userApi2Gen";
import { useAppSelector } from "../../../../LogicFiles/Redux/hooks";
import { mapFormDataToLawyerDto } from "@/app/homePage/personalInfoPage/personal-info-hooks";

export default function PersonalInfoPage() {

    return (
        <Container>
            <Box>
                <Stack direction="column">
                    <Typography> Lawyer information </Typography>
                    <PersonalInfoForm/>
                </Stack>
            </Box>
        </Container>
    );
}

function PersonalInfoForm() {
    const { register, handleSubmit, watch, formState: { errors }, control } = useForm<LawyerDto>();
    const lawyer = useAppSelector(c => c.caseSlice.lawyer);
    const [triggerSave, data] = usePutCaseUpdatelawyerMutation();
    const onSubmit: SubmitHandler<LawyerDto> = async (lawyerForm) => {
        const updatedLawyer = mapFormDataToLawyerDto(lawyer!, lawyerForm);

    };

    return (
        <Stack>
            <form className="p-5 card flex flex-col items-center items justify-start bg-neutral"
                  onSubmit={handleSubmit(onSubmit)}>
                <TextField id="standard-basic" label="UserName" variant="standard"
                           className="input mb-5 input-bordered"
                           defaultValue={isSuccessGetCases ? caseContext?.lawyer.firstName : ""} {...register("address", {})} />
                <TextField id="standard-basic" label="UserName" variant="standard"
                           className="input mb-5 input-bordered"
                           defaultValue={isSuccessGetCases ? caseContext.lawyer.lastName : ""} {...register("firstName", {})} />
                <TextField id="standard-basic" label="UserName" variant="standard"
                           className="input mb-5 input-bordered"
                           defaultValue="" {...register("postalCase", {})} />
                <TextField id="standard-basic" label="UserName" variant="standard"
                           className="input mb-5 input-bordered"
                           defaultValue="" {...register("address", {})} />
                <TextField id="standard-basic" label="UserName" variant="standard"
                           className="input mb-5 input-bordered"
                           defaultValue="" {...register("mobilePhoneNumber", {})} />
                <Button variant="outlined" type="submit"> Save </Button>
            </form>
        </Stack>
    );
}
