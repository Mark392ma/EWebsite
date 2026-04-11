import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import Modal from '@/components/Modal';
import StatCard from '@/components/statCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { formartCurreny } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@radix-ui/react-dropdown-menu';
import { AlertTriangle, ArrowUpRight, CreditCard, Plus, Search, User, Wallet } from 'lucide-react';
import React, { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Student Fee Records',
        href: '/students',
    },
];


interface StudentProps {
    students: any[];
}

export default function Students({ students }: StudentProps) {

    const [search, setSearch] = useState("");
    //const {data: students, isLoading } = useListStudents({ search });
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        adm_no: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        email: '',
        phone_number: '',
        address: '',
        class_id: '',
        stream_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('students.store'), {
            onSuccess: () => setShowModal(false),
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student Fee Records" />
            <div className='space-y-6 p-4'>
                <div className='flex items-center justify-between '>
                    <h1 className='text-3xl font-bold tracking-tight'>Students</h1>
                    <Button asChild>
                        <Link href='/students/new' onClick={() => setShowModal(true)}>
                            <Plus className='mr-2 h-4 w-4' />
                            Add Students
                        </Link>
                    </Button>
                </div>

                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                    <Card>
                        <CardHeader className='hlex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>Total Students</CardTitle>
                            <Wallet className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>
                                {formartCurreny(
                                    //Students.totalStudents
                                    586
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
                            <AlertTriangle className='h-4 w-4 text-destructive' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold text-destructive'>
                                {formartCurreny(
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
                            <CardTitle className='text-sm font-medium'>Active Students</CardTitle>
                            <User className='h-4 w-4 text-muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>
                                {formartCurreny(
                                    //summary.activeStudents
                                    250
                                )}
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
                            <CardTitle className='text-sm font-medium'>Pending Payments</CardTitle>
                            <CreditCard className='h-4 w-4 muted-foreground' />
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>
                                {formartCurreny(
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

                <Modal show={showModal} onClose={() => setShowModal(false)} >
                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-4 gap-4'>
                            <div className="grid gap-2">
                                <Label className='text-black bolder font-'>Admission Number</Label>
                                <input className="mt-1 block w-full border p-1 rounded" type="text" value={data.adm_no} onChange={(e) => setData('adm_no', e.target.value)} placeholder='Admission Number' />
                            </div>
                            <div>
                                <Label className='text-black bolder font-'>First Name</Label>
                                <input className="mt-1 block w-full border p-1 rounded" type="text" value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} placeholder='First Name' />
                            </div>
                            <div>
                                <Label className='text-black bolder font-'>Middle Name</Label>
                                <input className="mt-1 block w-full border p-1 rounded" type="text" value={data.middle_name} onChange={(e) => setData('middle_name', e.target.value)} placeholder='Middle Name' />
                            </div>
                            <div>
                                <Label className='text-black bolder font-'>Last Name</Label>
                                <input className="mt-1 block w-full border p-1 rounded" type="text" value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} placeholder='Last Name' />
                            </div>
                            <div>
                                <Label className='text-black bolder font-'>Date of Birth</Label>
                                <input className="mt-1 block w-full border p-1 rounded" type="date" value={data.date_of_birth} onChange={(e) => setData('date_of_birth', e.target.value)} placeholder='Date of Birth' />
                            </div>
                            <div>
                                <Label className='text-black bolder font-'>Gender </Label>
                                <select className="mt-1 block w-full border p-1 rounded" value={data.gender} onChange={(e) => setData('gender', e.target.value)}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <Label className='text-black bolder font-'>Parent Email</Label>
                                <input className="mt-1 block w-full border p-1 rounded" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder='Parent Email' />
                            </div>
                            <div>
                                <Label className='text-black bolder font-'>Parent Contact</Label>
                                <input type="text" value={data.phone_number} onChange={(e) => setData('phone_number', e.target.value)} placeholder='Parent Phone Number' />
                            </div>
                            <div>
                                <Label className='text-black bolder font-'>Address</Label>
                                <input className="mt-1 block w-full border p-1 rounded" type="text" value={data.address} onChange={(e) => setData('address', e.target.value)} placeholder='Address Number' />
                            </div>
                            <div>
                                <Label className='text-black bolder font-'>Class</Label>
                                <input className="mt-1 block w-full border p-1 rounded" type="text" value={data.class_id} onChange={(e) => setData('class_id', e.target.value)} placeholder='Class' />
                            </div>
                            <div>
                                <Label className='text-black bolder font-'>Stream</Label>
                                <input className="mt-1 block w-full border p-1 rounded" type="text" value={data.stream_id} onChange={(e) => setData('stream_id', e.target.value)} placeholder='Stream' />
                            </div>
                        </div>
                        <button type='submit' disabled={processing}>Submit Student</button>
                    </form>
                </Modal>

                <Card>
                    <CardHeader>
                        <CardTitle>Student Directory</CardTitle>
                        <div className='relative w-72'>
                            <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                            <Input
                                placeholder='Search students...'
                                className='pl-8'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Adm No</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Class</TableHead>
                                    <TableHead>Total Fees</TableHead>
                                    <TableHead>Paid Fees</TableHead>
                                    <TableHead>balance</TableHead>
                                    <TableHead>Due Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className='text-right'>Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.map(student => (
                                        <TableRow key={student.id}>
                                            <TableCell className='font-medium'>{student.adm_no}</TableCell>
                                            <TableCell>{student.first_name} {student.last_name}</TableCell>
                                            <TableCell>{student.class_id} {student.stream_id}</TableCell>
                                            <TableCell>{student.totalFees}</TableCell>
                                            <TableCell>{student.paidFees}</TableCell>
                                            <TableCell>{student.balance}</TableCell>
                                            <TableCell>{student.dueDate}</TableCell>
                                            <TableCell>
                                                <Badge variant={student.status === "active" ? "default" : "secondary"}>
                                                     {student.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className='text-right'>
                                                <Button asChild variant="ghost" size='sm'>
                                                    <Link href={`/students/${student.id}`}>View</Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                ))}
                                {/* <TableCell col-span={5} className='text-center py-4 text-muted-foreground'>No Students found</TableCell> */}

                            </TableBody>
                        </Table>
                        {/* {isLoading ? (
                            <div className='space-y-2'>
                                {[...Array(5)].map((_, i) => (
                                    <Skeleton key={i} className='h-12 w-full' />
                                ))}
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Adm No</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Class</TableHead>
                                        <TableHead>Total Fees</TableHead>
                                        <TableHead>Paid Fees</TableHead>
                                        <TableHead>balance</TableHead>
                                        <TableHead>Due Date</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className='text-right'>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {students?.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell className='font-medium'>{student.admissionNumber}</TableCell>
                                            <TableCell>{student.firstName} {student.lastName}</TableCell>
                                            <TableCell>{student.class} {student.stream}</TableCell>
                                            <TableCell>{student.totalFees}</TableCell>
                                            <TableCell>{student.paidFees}</TableCell>
                                            <TableCell>{student.balance}</TableCell>
                                            <TableCell>{student.dueDate}</TableCell>
                                            <TableCell>
                                                <Badge variant={student.status === "active" ? "default" : "secondary"}>
                                                     {student.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className='text-right'>
                                                <Button asChild variant="ghost" size='sm'>
                                                    <Link href={`/students/${student.id}`}>View</Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {students?.length === 0 && (
                                        <TableRow>
                                            <TableCell col-span={5} className='text-center py-4 text-muted-foreground'>No Students found</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        )} */}
                    </CardContent>
                </Card>
            </div>
            <div>
                {/* <div>
                    <button onClick={() => setShowModal(true)}>Add Student</button>
                </div>  */}
            </div>
        </AppLayout>
    );
}
