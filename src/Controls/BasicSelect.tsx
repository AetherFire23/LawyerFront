import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { EnsureUnion } from "@/Utils/StringExtensions";
import { CourtRoles } from "@/Redux/codegen/userApi2Gen";

export default function BasicSelect() {
    const [age, setAge] = React.useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="CourtRoles"
                    onChange={handleChange}
                >
                    <MenuItem value={EnsureUnion<CourtRoles>("Plaintiff")}> Defender </MenuItem>
                    <MenuItem value={EnsureUnion<CourtRoles>("Defender")}> Plaintiff </MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
