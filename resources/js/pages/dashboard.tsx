import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Skeleton } from '@/components/ui/skeleton';
import AppLayout from '@/layouts/app-layout';
import { formartCurreny } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { AlertTriangle, ArrowUpRight, CreditCard, DollarSign, User, Wallet } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Welcome back, Mark',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    //const { data: summary, isLoading: loadingSummary } = useDashboardSummary();
    //const { data: trend, isLoading: loadingSummary } = useDashboardSummary();
    //const { data: breakdown, isLoading: loadingBreakdown } = useGetPaymentMethodBreakdown;

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']
    // if (loadingSummary || !summary){
    //     return (
    //         <div className='space-y-6'>
    //             <h1 className='yest-3xl font-bld tracking-tight'>Dashboard</h1>
    //             <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
    //                 {[ ...Array(4)].map((_, i) => (
    //                     <Card key={i}>
    //                         <CardContent className='p-6'>
    //                             <Skeleton className='h-20 w-full'></Skeleton>
    //                         </CardContent>
    //                     </Card>
    //                 ))}
    //             </div>
    //         </div>
    //     )
    // }
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
                                    //ReportSummary.totalFeesCollected
                                    180000
                                    )
                                }
                            </div>
                            <p className='text-xs text-muted-foreground mt-1'>
                                of {
                                //summary.overdueInvoices
                                80
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
                                    //ReportSummary.totalFeesCollected
                                    150000
                                    )}
                            </div>
                            <p className='text-xs text-muted-foreground flex items-center gap-1 mt-1'>
                                <span className='text-emerald-500 flex items-center'>
                                    <ArrowUpRight className='h-3 w-3' /> +{formartCurreny(
                                        //ReportSummary.paidThisMonth
                                        53000
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
                                    //summary.OutstandingFees
                                    85000
                                    )}
                            </div>
                            <p className='text-xs text-muted-foreground mt-1'>
                                Across {
                                //summary.overdueInvoices
                                50
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
                                    //summary.pendingPayments
                                    25000
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
                            {/* {loadindTrend ? <Skeleton className='h-[300px] w-full' /> : (
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={trend}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis datakey="month" tickline={false} axisLine={false} />
                                        <YAxis
                                            tickFormatter={(value) => `Ksh ${value/1000}k`}
                                            ticklLine={false}
                                            axisLine={false}
                                            />
                                        <Tooltip
                                            formtter={(value: number) => formatCurrency(value)}
                                            cursor={{fill: 'transparent'}}
                                        />
                                        <Legend />
                                        <Bar datakey='collected' name="collected" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                        <Bar datakey='outstanding' name="outstanding" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            )} */}
                        </CardContent>
                    </Card>

                    <Card className='col-span-3'>
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* {loadingBreakdown ? <Skeleton className='h-[300px] w-full' /> : (
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie 
                                            data={breakdown}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="amount"
                                            nameKey="method"
                                        >
                                            {breakdowwn?.mao((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(Value: number) => formartCurreny(value)} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            )} */}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
