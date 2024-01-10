import { isValidArray } from "../TypeScriptExtensions/ArrayExtensions";

interface IKeyedObject {
    id: string;
}

interface IListRenderProps<T extends IKeyedObject> {
    list: Array<T>,
    renderer: (entity: T) => React.ReactNode
}

export default function KeyedList<T extends IKeyedObject>({ list, renderer }: IListRenderProps<T>) {
    const isValid = isValidArray(list);
    return (
        <ul>
            {isValid && (list?.map(c => (
                <li key={c.id}>
                    {renderer(c)}
                </li>
            )))}
        </ul>
    );
}


// interface IListRenderProps2<T extends IKeyedObject> {
//     list: Array<T>,
//     renderer: ({entity}:{entity: T}) => React.ReactNode
// }
// export function KeyedList2<T extends IKeyedObject>({ list, renderer }: IListRenderProps2<T>) {
//     const isValid = isValidArray(list);
//     return (
//         <ul>
//             {isValid && (list?.map(c => (
//                 <li key={c.id}>
//                     {}
//                 </li>
//             )))}
//         </ul>
//     );
// }


function dick({ t }: { t: string }) {
    return (<div>

    </div>);
}

// should make another component that just takes a component that takes T as parameter
// so to avoid to specify the renderer method for components that only possess T as a single parameter
