
export default function ReportFilters({ filters, setFilters, fetch}: any){
    return (
        <div className="flex gap-3 mb-4 items-center shadow-lg bg-gray-100 p-4 rounded">
            <input type="date" onChange={(e) => setFilters({ ...filters, from:e.target.value })} className="bg-white-200 shadow-sm p-1 rounded-sm border"/>
            <input type="date" onChange={(e) => setFilters({ ...filters, to:e.target.value })} className="border p-1 bg-white-200"/>
            <select onChange={(e) => setFilters({ ...filters, class:e.target.value})} className="bg-white-200 shadow-sm p-1 rounded-sm border">
                <option value="">
                    All classes
                </option>
                <option value="10">10</option>
            </select>
             <select onChange={(e) => setFilters({ ...filters, status:e.target.value})} className="bg-white-200 shadow-sm p-1 rounded-sm border">
                <option value="">
                    All status
                </option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
            </select>

            <button onClick={fetch} className="bg-blue-600 text-white px-3">Generate</button>
        </div>
    )
}