export default function ReportTable({ rows }: any){
    if(!rows) return null;

    return (
        <table className="w-full bg-white shadow rounded">
            <thead>
                <tr>
                    <th>Student</th>
                    <th>Class</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Balance</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
            </thead>

            <tbody>
                {rows.map((r:any) => (
                    <tr key={r.id}>
                        <td>{r.student_name}</td>
                        <td>{r.class}</td>
                        <td>{r.total_fee}</td>
                        <td>{r.paid}</td>
                        <td>{r.balance}</td>
                        <td>{r.status}</td>
                        <td>{r.due_date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}