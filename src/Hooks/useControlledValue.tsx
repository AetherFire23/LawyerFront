"use client";
import { ChangeEvent, useState } from "react";

// could make default values map but too lazy rn
 export default  function useControlledInput(initialValue: string): [string, (event: ChangeEvent<HTMLInputElement>) => void] {
    const [state, setState] = useState(initialValue);

    const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    }

    const s: [string, (event: ChangeEvent<HTMLInputElement>) => void] = [state, handleValueChange]
    return s;
  }
