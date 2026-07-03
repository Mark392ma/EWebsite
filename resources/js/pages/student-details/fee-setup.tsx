import { Calendar, Eye, Filter, MoreVertical, Printer } from "lucide-react";

export default function FeeManagementPage() {
    const payments = [
        {
            id: 1, 
            feeType: "Admission Fee",
            date: "28-06-2024",
            amount: 1000,
            status: "Paid",
            receipt: "RCPT-000128",
            mode: "Cash"
        },
        {
            id: 2, 
            feeType: "Old Fee Due",
            date: "19-07-2024",
            amount: 10000,
            status: "Paid",
            receipt: "RCPT-000127",
            mode: "Mpesa"
        },
        {
            id: 3, 
            feeType: "School Fees",
            date: "01-07-2024",
            amount: 13500,
            status: "Paid",
            receipt: "RCPT-000130",
            mode: "Bank"
        },
        {
            id: 4, 
            feeType: "School Fees",
            date: "06-08-2024",
            amount: 8000,
            status: "Paid",
            receipt: "RCPT-000131",
            mode: "Mpesa"
        },
        {
            id: 5, 
            feeType: "Tution Fee",
            date: "28-06-2024",
            amount: 1000,
            status: "Paid",
            receipt: "RCPT-000132",
            mode: "Cash"
        },
        {
            id: 6, 
            feeType: "Exam Fee",
            date: "28-06-2024",
            amount: 500,
            status: "Paid",
            receipt: "RCPT-000133",
            mode: "Cash"
        },
    ]

    const badge = (status) => {
        switch (status) {
            case "Paid":
                return "bg-green-100 text-green-700";
            case "Pending":
                return "bg-yellow-100 text-yellow-700";
            default:
                return ""
        }
    }

    return (
        <div className="bg-slate-100 min-h-screen">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50">
                        <tr className="text-left text-sm text-slate-600">
                            <th className="px-4 py-3">#</th>
                            <th>Fee Type</th>
                            <th>Date of Paying</th>
                            <th>Amount(Ksh)</th>
                            <th>Status</th>
                            <th>Receipt No.</th>
                            <th>Payment Mode</th>
                            <th>Deatils</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((item) => (
                            <tr 
                            key={item.id} 
                            className="border-t text-sm"
                        >
                            <td className="px-4 py-3">{item.id}</td>
                            <td>{item.feeType}</td>
                            <td>{item.date}</td>
                            <td>{item.amount}</td>
                            <td>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge(item.status)}`}>{item.status}</span>
                            </td>
                            <td>{item.receipt}</td>
                            <td>{item.mode}</td>
                            <td>Zynex Academy Section: 1st A Sec</td>
                            <td>
                                <div className="flex items-center gap-2">
                                    <button><Eye size={18} className="text-blue-600" /></button>
                                    <button><MoreVertical size={18} className="text-blue-600" /></button>
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>

                <div className="p-4 border-t flex justify-between text-sm">
                    <span>Showing 1 to 7 entries</span>
                    <div className="flex gap-2">
                        <button className="w-8 h-8 border rounded">1</button>
                        <button className="w-8 h-8 border rounded">2</button>
                        <button className="w-8 h-8 border rounded">3</button>
                        <button className="w-8 h-8 border rounded">4</button>
                        <button className="w-8 h-8 border rounded">5</button>
                    </div>
                </div>
            </div>

            <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden">
                {/*Header Tab*/}
                <div className="bg-blue-600 text-white px-6 py-3 font-semibold flex justify-between">
                    <span>Recieve Fee - New Reciept</span>

                    <span className="text-sm">
                        Reciept No.
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded ml-2">Auto Generated</span>
                    </span>
                </div>

                {/*Body*/}
                <div className="grid grid-cols-3 gap-6">
                    {/*Left side */}
                    <div className="col-span-2 p-6">
                        <div className="flex items-center gap-2">
                            
                            <div>
                                <label className="label">Fee Type</label>
                                <select className="input">
                                    <option>
                                        Select Fee Type
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="label">Date</label>
                                <div className="flex items-center relative justify-between">
                                    <input 
                                        className="input"
                                        value="06-07-2026"
                                        readOnly
                                    />
                                    <Calendar 
                                        size={18}
                                        className="absolute right-3 top-2 text-slate-400"
                                    />                             
                                </div>
                            </div>

                            <div>
                                <label className="label">
                                    Amount(Ksh)
                                </label>
                                <input
                                    placeholder="Enter Amount"
                                    className="input" 
                                />
                            </div>
                        </div>

                        <div className="flex gap-6">
                            <label>
                                <input
                                    type="radio"
                                    name="pay"
                                    defaultChecked
                                />{" "}
                                Cash
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="pay"
                                />{" "}
                                Bank
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="pay"
                                />{" "}
                                Mpesa
                            </label>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4">
                            <div>
                                <label className="label">Bank Details</label>
                                <select className="input">
                                    <option>Select Bank</option>
                                </select>
                            </div>
                            <div>
                                <label className="label">Cheque/Ref No</label>
                                <input
                                    placeholder="Enter Cheque / Ref"
                                    className="input"
                                />
                            </div>
                            
                            <div>
                                <label className="label">Change Date</label>
                                <input
                                    placeholder="04-06-2026"
                                    className="input"
                                />
                            </div>
                            <div>
                                <label className="label">Voucher No</label>
                                <input
                                    placeholder="5548823"
                                    className="input"
                                />
                            </div>
                            
                        </div>

                        <div className="grid grid-cols-3 gap-2 items-center">
                            <div className="col-span-2">
                                <label className="label">Remarks</label>
                                <textarea
                                    rows={2}
                                    placeholder="Add a remark (optional)"
                                    className="input"
                                />
                            </div>
                            <div className="flex mt-6 pt-4 border-t">
                                <button className="p-2 mr-2 text-[12px] bg-gray-100 font-semibold border rounded-lg">
                                    Reset
                                </button>

                                <button className="p-2 text-[12px] font-semibold bg-blue-600 text-white rounded-lg flex items-center gap-[2px]">
                                    <Printer size={18} />
                                    Save & Print Receipt
                                </button>
                            </div>
                        </div>
                        
                    </div>

                    {/*Right side */}
                    <div className="border rounded-xl p-2">
                        <h3 className="font-semibold text-lg mb-4">
                            Fee Breakup
                        </h3>

                        <table className="w-full rounded text-sm border p-2">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-2">
                                        Fee Type
                                    </th>
                                    <th>Amount</th>
                                    <th>Paid</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td className="pl-2">School Fees</td>
                                    <td>5000</td>
                                    <td>1400</td>
                                    <td>3600</td>
                                </tr>

                                <tr>
                                    <td className="pl-2">Transport Fees</td>
                                    <td>6000</td>
                                    <td>1600</td>
                                    <td>4400</td>
                                </tr>

                                <tr>
                                    <td className="pl-2">Admission Fee</td>
                                    <td>500</td>
                                    <td>200</td>
                                    <td>300</td>
                                </tr>

                                <tr>
                                    <td className="pl-2">Old Fee Due</td>
                                    <td>3000</td>
                                    <td>200</td>
                                    <td>2800</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="mt-6 pt-4 border-t flex justify-between font-bold text-lg">
                            <span>Total Payable</span>
                            <span className="text-blue-600">
                                KES 10,500
                            </span>
                        </div>
                    </div>
                </div>
                

               
            </div>
        </div>
    )

}


