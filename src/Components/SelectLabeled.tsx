import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { UseFormRegisterReturn } from "react-hook-form";


export function useSelectLabel() {
    const [text, setText] = React.useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setText(event.target.value);
    };

    const returnValues = {
        text,
        setText,
        handleChange,
    };

    return returnValues;
}

//  rlly need to

interface ISelectLabeledProps {
    register?: UseFormRegisterReturn<any>,
    labelText: string,
    defaultValue: string,
}

// need defaultValue also
export default function SelectLabeled({ register, labelText, defaultValue }: ISelectLabeledProps) {
    const { text: age, setText, handleChange } = useSelectLabel();

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label"> {labelText} </InputLabel>

                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>

        </div>
    );
}
