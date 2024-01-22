"use client";

/* Core */
import { Provider } from "react-redux";

/* Instruments */
//import { reduxStore } from '@/lib/redux'
import { store } from "./store";

export default function Providers(props: React.PropsWithChildren) {
    return <Provider store={store}>{props.children}</Provider>
}
