
interface ITitleCardProps {
    title: string,
    subText: string
}

export default function TitleCard({ title, subText }: ITitleCardProps) {
    return (
        <div className="card w-96 bg-neutral shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{subText}</p>
            </div>
        </div>
    )
}