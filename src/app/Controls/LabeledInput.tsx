import { ChangeEvent } from "react"


interface IProps {
    className?: string | null,
    label?: string | null,
    placeHolder?: string | null,
    value?: string | null,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function LabeledInput({ className, label, placeHolder, value, onChange }: IProps) {
    return (
        <div className={`form-control ${className}`}>
            <label className="label">
            </label>
            <label className="input-group">
                <span>{label}</span>
                <input type="text" placeholder={placeHolder ?? ""} className={`input input-bordered`} value={value ?? ""} onChange={onChange}/>
            </label>
        </div>
    )
}