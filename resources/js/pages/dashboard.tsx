import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Skeleton } from '@/components/ui/skeleton';
import AppLayout from '@/layouts/app-layout';
import { formartCurreny } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, ArrowUpRight, CreditCard, DollarSign, User, Wallet } from 'lucide-react';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Welcome back, Mark',
        href: '/dashboard',
    },
];
type DashboardSummary = {
  totalStudents: number;
  totalFees: number;
  totalCollected: number;
  outstandingFees: number;
  overdueInvoices: number;
  collectedThisMonth: number;
  pendingPayments: number;
};

type TrendItem = {
  month: string;
  collected: number;
  outstanding: number;
};

type BreakdownItem = {
  method: string;
  amount: number;
};

export default function Dashboard({
    summary,
    trend,
    breakdown,
    }: {
    summary: DashboardSummary;
    trend: TrendItem[];
    breakdown: BreakdownItem[];
    }) {
        console.log('Trend:', trend)
        console.log('Summary:', summary)
        console.log('Breakdown:', breakdown)

        const safeSummary: DashboardSummary = summary ?? {
            totalStudents: 0,
            totalFees: 0,
            totalCollected: 0,
            outstandingFees: 0,
            overdueInvoices: 0,
            collectedThisMonth: 0,
            pendingPayments: 0,
        };

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']
    const data = [
        { name: 'Jan', uv: 1250, pv: 2500, amt: 3500},
        { name: 'Feb', uv: 1380, pv: 2700, amt: 6000},
        { name: 'Mar', uv: 1450, pv: 1000, amt: 4000},
        { name: 'Apr', uv: 1750, pv: 1255, amt: 3890},
        { name: 'May', uv: 1050, pv: 1500, amt: 4130},
        { name: 'Jun', uv: 1950, pv: 3000, amt: 8970},
        { name: 'Jul', uv: 2700, pv: 5000, amt: 5430},

    ];
    const pie_data = [
        { method: 'Bank', amount: 70000},
        { method: 'Mpesa', amount: 55000},

    ]
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Fee Management" />
            <div className='space-y-6 p-4'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
                    <div className='flex items-center gap-2'>
                        <Button asChild variant="outline">
                            <Link href="/invoices/new">New Invoice</Link>
                        </Button>
                        <Button asChild>
                            <Link href='/payments/new'>Record Payment</Link>
                        </Button>
                    </div>
                </div>

                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                    <Card>
                        <CardHeader className='hlex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>Total Fees</CardTitle>
                            <DollarSign className='h-4 w-4 text-muted-foreground'/>
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>
                                {
                                  formartCurreny(
                                        safeSummary.totalFees
                                    )
                                }
                            </div>
                            <p className='text-xs text-muted-foreground mt-1'>
                                of {
                                    safeSummary.overdueInvoices
                                
                                } total enrolled
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className='hlex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>Total Collected</CardTitle>
                            <Wallet className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>
                                { formartCurreny(
                                    safeSummary.totalCollected
                                    )}
                            </div>
                            <p className='text-xs text-muted-foreground flex items-center gap-1 mt-1'>
                                <span className='text-emerald-500 flex items-center'>
                                    <ArrowUpRight className='h-3 w-3' /> +{formartCurreny(
                                        safeSummary.collectedThisMonth
                                        )}
                                </span>
                                this month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className='hlex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>Outstanding Fees</CardTitle>
                            <AlertTriangle className='h-4 w-4 text-destructive'/>
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold text-destructive'>
                                { formartCurreny(
                                    safeSummary.outstandingFees
                                    )}
                            </div>
                            <p className='text-xs text-muted-foreground mt-1'>
                                Across {
                                safeSummary.overdueInvoices
                                } overdue invoices
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className='hlex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>Pending Payments</CardTitle>
                            <CreditCard className='h-4 w-4 muted-foreground'/>
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>
                                { formartCurreny(
                                    safeSummary.pendingPayments
                                    )}
                            </div>
                            <p className='text-xs text-muted-foreground mt-1'>
                               Awaiting processing
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
                    <Card className='col-span-4'>
                        <CardHeader>
                            <CardTitle>Collection Trend</CardTitle>
                        </CardHeader>
                        <CardContent className='pl-2'>
                            <ResponsiveContainer width="100%" height={300}>
                                 <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" />

                                    <XAxis
                                        dataKey="name"
                                        />

                                    <YAxis
                                        tickFormatter={(value) => `Ksh ${value / 1000}k`}
                                        />

                                    <Tooltip/>

                                    <Legend />

                                    <Bar
                                        dataKey="uv"
                                        name="Collected"
                                        fill='#2563EB'
                                        radius={[4, 4, 0, 0]}
                                        />

                                    <Bar
                                        dataKey="pv"
                                        fill='#1E40AF'
                                        name="Outstanding"
                                        radius={[4, 4, 0, 0]}
                                        />
                                </BarChart>
                            </ResponsiveContainer> 
                       
                        </CardContent>
                    </Card>

                    <Card className='col-span-3'>
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                        data={pie_data}
                                        dataKey="amount"
                                        nameKey="method"
                                        label
                                        >
                                        {pie_data.map((entry, index) => (
                                            <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                        </Pie>

                                        <Tooltip/>

                                        <Legend />
                                    </PieChart>
                                    </ResponsiveContainer>
                       
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
