import ReportFilters from '@/components/ReportFilters';
import ReportSummary from '@/components/ReportSummaryCards';
import ReportTable from '@/components/ReportTable';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Tabs, TabsList } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { TabsContent, TabsTrigger } from '@radix-ui/react-tabs';
import { AlertTriangle, CreditCard, TrendingUp } from 'lucide-react';
import { useState } from 'react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reports & Analytics',
        href: '/students',
    },
];

const COLORS = ['#0f766e', "0ea5e9", "#f58e0b", "#ef4444", "#8b5cf6"];

interface Props{
    filters: {
         from: string;
         to: string;
        status: string; 
        class: string;
    }
   setFilters: (filter: any) => void;
   fetch: () => void;
}

function forntKES(amount: number) {
    return `KES ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2})}`
}
export default function Reports() {
    const [from, setFrom] = useState()
    const [to, setTo] = useState()

    //const { data: collection } = useCollectionReport({ from: from || undefined, to: to || undefined })
    //const { data: outstanding } = useGetOutstandingReport();
    //const { data: summary } = useGetPaymentSummaryReport({ from: from || undefined, to: to || undefined })
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reports & Analytics" />
            <div className='space-y-6 p-4'>
                <div>
                    <h1 className='text-2xl font-bold text-slate-900'>Reports</h1>
                    <p className='text-slate-500 text-sm mt-1'>Financial summaries and analytics</p>
                </div>

                <div className="flex items-end gap-4 p-4 bg-slate-50 roundrd-lg border border-slate-200">
                    <div>
                        <Label htmlFor="from" className="text-xs text-slate-600">From Date</Label>
                        <Input id='from' type='date' value={from} onChange={e => setFrom(e.target.value)} className='w-40' />
                    </div>
                    <div>
                        <Label htmlFor="to" className="text-xs text-slate-600">To Date</Label>
                        <Input id='to' type='date' value={to} onChange={e => setTo(e.target.value)} className='w-40' />
                    </div>
                </div>

                <Tabs defaultValue='collection'>
                    <TabsList className='bg-slate-100 gap-2'>
                        <TabsTrigger value='collection' className='flex items-center gap-2'>
                            <TrendingUp className='h-4 w-4'/>
                            Collection Report
                        </TabsTrigger>
                        <TabsTrigger value="outstanding" className='flex items-center gap-2'>
                            <AlertTriangle className='h-4 w-4' />
                            Outstanding Fees
                        </TabsTrigger>
                         <TabsTrigger value="summary" className='flex items-center gap-2'>
                            <CreditCard className='h-4 w-4' />
                            Payment Summary
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="collection" className='spac-y-4 mt-4'>
                        {/* { collection && (
                                <>
                                <div className="grid grid-cols-3 gap-4">
                                    <Card className="border-l-4 border-l-teal-600">
                                    <CardContent className="p-4">
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Total Collected</p>
                                        <p className="text-xl font-bold text-teal-700 mt-1">{formatKES(collection.totalCollected)}</p>
                                    </CardContent>
                                    </Card>
                                    <Card className="border-l-4 border-l-blue-600">
                                    <CardContent className="p-4">
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Total Invoiced</p>
                                        <p className="text-xl font-bold text-blue-700 mt-1">{formatKES(collection.totalInvoiced)}</p>
                                    </CardContent>
                                    </Card>
                                    <Card className="border-l-4 border-l-emerald-600">
                                    <CardContent className="p-4">
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Collection Rate</p>
                                        <p className="text-xl font-bold text-emerald-700 mt-1">{collection.collectionRate.toFixed(1)}%</p>
                                    </CardContent>
                                    </Card>
                                </div>

                                {collection.byDate.length > 0 && (
                                    <Card>
                                    <CardHeader>
                                        <CardTitle className="text-sm font-semibold">Daily Collections</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={240}>
                                        <BarChart data={collection.byDate}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                                            <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                                            <Tooltip formatter={(v: number) => formatKES(v)} />
                                            <Bar dataKey="amount" fill="#0f766e" radius={[4,4,0,0]} name="Collected" />
                                        </BarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                    </Card>
                                )}

                                {collection.byCategory.length > 0 && (
                                    <Card>
                                    <CardHeader>
                                        <CardTitle className="text-sm font-semibold">By Payment Method</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                        {collection.byCategory.map((cat, i) => (
                                            <div key={cat.category} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                            <span className="font-medium text-slate-700 capitalize">{cat.category}</span>
                                            <span className="font-bold text-teal-700">{formatKES(cat.amount)}</span>
                                            </div>
                                        ))}
                                        </div>
                                    </CardContent>
                                    </Card>
                                )}
                                </>
                            )}
                            </TabsContent>

                            <TabsContent value="outstanding" className="mt-4">
                            <Card>
                                <CardHeader>
                                <CardTitle className="text-sm font-semibold">Students with Outstanding Fees ({outstanding.length})</CardTitle>
                                </CardHeader>
                                <CardContent>
                                {outstanding.length === 0 ? (
                                    <p className="text-center text-slate-400 py-8">No outstanding fees found</p>
                                ) : (
                                    <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                        <tr className="border-b border-slate-200">
                                            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Student</th>
                                            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Adm No.</th>
                                            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Class</th>
                                            <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Outstanding</th>
                                            <th className="text-center py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Overdue</th>
                                            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">Last Payment</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {outstanding.map(item => (
                                            <tr key={item.studentId} className="border-b border-slate-100 hover:bg-slate-50">
                                            <td className="py-3 px-4 font-medium text-slate-900">{item.studentName}</td>
                                            <td className="py-3 px-4 text-slate-600">{item.admissionNumber}</td>
                                            <td className="py-3 px-4 text-slate-600">{item.class}</td>
                                            <td className="py-3 px-4 text-right font-bold text-red-600">{formatKES(item.outstanding)}</td>
                                            <td className="py-3 px-4 text-center">
                                                {item.overdueInvoices > 0 ? (
                                                <Badge className="bg-red-100 text-red-700">{item.overdueInvoices}</Badge>
                                                ) : <span className="text-slate-400">0</span>}
                                            </td>
                                            <td className="py-3 px-4 text-slate-500">
                                                {item.lastPaymentDate ? new Date(item.lastPaymentDate).toLocaleDateString() : "Never"}
                                            </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    </div>
                                )}
                                </CardContent>
                            </Card>
                            </TabsContent>

                            <TabsContent value="summary" className="space-y-4 mt-4">
                            {summary && (
                                <>
                                <div className="grid grid-cols-2 gap-4">
                                    <Card className="border-l-4 border-l-teal-600">
                                    <CardContent className="p-4">
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Total Payments</p>
                                        <p className="text-2xl font-bold text-teal-700 mt-1">{summary.totalPayments}</p>
                                    </CardContent>
                                    </Card>
                                    <Card className="border-l-4 border-l-blue-600">
                                    <CardContent className="p-4">
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Total Amount</p>
                                        <p className="text-xl font-bold text-blue-700 mt-1">{formatKES(summary.totalAmount)}</p>
                                    </CardContent>
                                    </Card>
                                </div>

                                {summary.byMethod.length > 0 && (
                                    <div className="grid grid-cols-2 gap-4">
                                    <Card>
                                        <CardHeader>
                                        <CardTitle className="text-sm font-semibold">By Payment Method</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                        <ResponsiveContainer width="100%" height={200}>
                                            <PieChart>
                                            <Pie data={summary.byMethod} dataKey="amount" nameKey="method" cx="50%" cy="50%" outerRadius={80} label={({ method }) => method}>
                                                {summary.byMethod.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                            </Pie>
                                            <Tooltip formatter={(v: number) => formatKES(v)} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                        <CardTitle className="text-sm font-semibold">Method Breakdown</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                        <div className="space-y-2">
                                            {summary.byMethod.map((m, i) => (
                                            <div key={m.method} className="flex items-center justify-between p-2 rounded">
                                                <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                                <span className="capitalize text-sm font-medium text-slate-700">{m.method}</span>
                                                </div>
                                                <div className="text-right">
                                                <div className="font-bold text-sm text-slate-900">{formatKES(m.amount)}</div>
                                                <div className="text-xs text-slate-400">{m.count} payments</div>
                                                </div>
                                            </div>
                                            ))}
                                        </div>
                                        </CardContent>
                                    </Card>
                                    </div>
                                )}
                                </>
                            )} */}
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
