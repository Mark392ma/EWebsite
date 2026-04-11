

export default function ReportSummary({ summary }: any){
    if(!summary) return null

    return (
        <div className="grid grid-cols-5 gap-4 mb-4">
            <Card title="Students" value={summary.total_fee} />
            <Card title="Collected" value={summary.collected} />
            <Card title="Pending" value={summary.pending} /> 
            <Card title="Overdue" value={summary.overdue} />

        </div>
    )
}

function Card({ title, value }: any){
    return (
        <div className="bg-white p-4 shadow rounded">
            <p>{title}</p>
            <h2 className="font-bold">{value}</h2>
        </div>
    )
}