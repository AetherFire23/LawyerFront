'use client'
import { ReactComponentElement, ReactNode, createContext, useContext, Dispatch, Context } from "react";
import { useImmerReducer } from "use-immer";
// use client hehhiih

enum ConfigActionTypes {
    changeTheme,
}

export class ConfigActionData {
    public actionType: ConfigActionTypes
    public payload: any
}

export class ConfigData {
    theme: string
}

const configData: ConfigData | null = null;
const ConfigContext: Context<ConfigData | null> = createContext<ConfigData | null>(configData);
export function useConfigContext(): ConfigData | null {
    return useContext(ConfigContext);
}

const ConfigDispatchContext = createContext<Dispatch<ConfigActionData> | null>(null);
export function useConfigDispatch() {
    return useContext(ConfigDispatchContext)
}

interface IProps {
    children: ReactNode
}

export function ConfigProvider({ children }: IProps) {
    const [context, dispatch] = useImmerReducer(configReducer, configData)

    return (
        <div>
            <ConfigContext.Provider value={context}>
                <ConfigDispatchContext.Provider value={dispatch}>
                    {children}
                </ConfigDispatchContext.Provider>
            </ConfigContext.Provider>
        </div>
    )
}

const actionDispatcher: Record<ConfigActionTypes, (data: ConfigData | null) => void> = {
    [ConfigActionTypes.changeTheme]: myAction1,
}

export function configReducer(userDto: ConfigData | null, payload: ConfigActionData) {
    const action: (data: ConfigData | null) => void = actionDispatcher[payload.actionType]
    action(userDto)
    return;
}

function myAction1(user: ConfigData | null) {
    console.log("myaction1")
    return;
}



// const toggleDarkmode = () => {
//     if (darkmode == 'light') {
//       document.documentElement.classList.add('dark');
//       document.documentElement.setAttribute('data-theme', 'dark');
//       localStorage.setItem('color-mode', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       document.documentElement.setAttribute('data-theme', 'light');
//       localStorage.setItem('color-mode', 'light');
//     }
//   };