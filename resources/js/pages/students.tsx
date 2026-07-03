import { Card, CardContent, CardHeader, CardTitle } from '@/components/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogHeader, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { formartCurreny } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@radix-ui/react-dropdown-menu';
import { AlertTriangle, ArrowUpRight, CalendarRange, CreditCard, DownloadIcon, Eye, Filter, MoreVertical, MoreVerticalIcon, Plus, Search, User, Wallet } from 'lucide-react';
import React, { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Student Fee Records 2',
        href: '/students',
    },
];


interface StudentProps {
    students: any[];
}

type Stream = {
    Green: string;
    Yellow: string
}

export default function Students({ students = [] }: StudentProps) {

    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false)
    const { data, setData, post, processing, reset, errors } = useForm({
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

const studentList = students ?? [];

  const filterStudents = studentList.filter(s => 
    s.first_name?.toLowerCase().includes(search.toLowerCase()) || 
    s.adm_no?.toLowerCase().includes(search.toLowerCase())
  );


    const openCreate = () =>{
        reset()
        setShowModal(true)
  }

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
                    <h1 className='text-3xl font-bold tracking-tight'>Student Accounts</h1>
                    <div className="flex items-center gap-2">
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="All Students" />
                            </SelectTrigger>
                            <SelectContent>
                                {/* <SelectItem>All Classes</SelectItem> */}
                            </SelectContent>
                        </Select>
                        <Button variant="outline" onClick={() => setShowModal(true)}>
                            <Filter size={16} />
                            Filter
                        </Button>
                        <Button variant="outline">
                            <MoreVerticalIcon size={16}/>
                        </Button>
                    </div>
                    
                </div>

                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
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
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
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
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
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
                                    
                                } total enrolled
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-sm font-medium'>Pending Payments</CardTitle>
                            <CreditCard className='h-4 w-4 text-muted-foreground' />
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

                <Card>
                    <CardHeader>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <div className='relative w-64'>
                                    <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                                    <Input
                                        placeholder='Search students or admission no...'
                                        className='pl-8 border rounded-lg'
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                                <div className='flex iems-center gap-2'>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="All Classes" />
                                        </SelectTrigger>
                                        <SelectContent>
                                                {/* <SelectItem>All Classes</SelectItem> */}
                                        </SelectContent>
                                    </Select>
                                    <Select>
                                        <SelectTrigger>
                                        <SelectValue placeholder="All Status" className='font-bold text-slate-900'/></SelectTrigger>
                                        <SelectContent>
                                                {/* <SelectItem>All Classes</SelectItem> */}
                                        </SelectContent>
                                    </Select>
                                    <Button  className='bg-transparent text-[#2563EB] border'><Filter size={16}/> More filters</Button>

                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Button className='bg-transparent text-[#2563EB] font-bold border rounded-xl'><DownloadIcon size={16}/> Import</Button>
                                <Button className='bg-transparent text-green-800 font-bold border rounded-xl'><img src='/excel.png' alt='export' className='h-6 w-6'/>Export</Button>
                                <Button className='bg-[#0B1D3A] border rounded-xl'  onClick={openCreate}><Plus size={16}/>Add Student</Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='bg-white rounded-xl shadow-sm overflow-hidden'>
                            <Table className='w-full'>
                                <TableHeader className='bg-slate-50'>
                                    <TableRow>
                                        <TableHead className='font-bold text-[#000] w-2 text-center'><input type='checkbox' /></TableHead>
                                        <TableHead className='font-bold text-[#000] p-2 text-center'>Adm No</TableHead>
                                        <TableHead className='font-bold text-[#000] p-2 text-center'>Name</TableHead>
                                        <TableHead className='font-bold text-[#000] text-center'>Class</TableHead>
                                        <TableHead className='font-bold text-[#000] text-center'>Total Fees</TableHead>
                                        <TableHead className='font-bold text-[#000] text-center'>Paid Fees</TableHead>
                                        <TableHead className='font-bold text-[#000] text-center'>Balance</TableHead>
                                        <TableHead className='font-bold text-[#000] text-center'>Due Date</TableHead>
                                        <TableHead className='font-bold text-[#000] text-center'>Status</TableHead>
                                        <TableHead className='font-bold text-[#000] text-center'>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filterStudents.map(student => (
                                        <>
                                            {console.log(student)}
                                            <TableRow key={student.id}>
                                                <TableCell className='p-4'><input type="checkbox" /> </TableCell>
                                                <TableCell className='font-medium'>{student.adm_no}</TableCell>
                                                <TableCell>
                                                    <div className='flex items-center gap-2'>
                                                        <img src="excel.png" className='w-8 h-8 rounded-full' alt="profile-image" />
                                                        <span className='flex flex-col text-slate-700'>
                                                            <p className='font-semibold'>{student.first_name} {student.last_name}</p>
                                                            <p className='text-[12px]'>{student.phone_number}</p>
                                                            
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <span className='px-3 py-1 rounded-full text-xs bg-green-100 text-green-700 font-medium'>{student.class} {student.stream}</span>
                                                </TableCell>
                                                <TableCell className='font-semibold text-slate-700'>{student.totalFees} KES 13543</TableCell>
                                                <TableCell className='font-semibold text-green-700'>{student.paidFees} KES 7000</TableCell>
                                                <TableCell className='font-semibold text-slate-700'>{student.balance} KES 5457</TableCell>
                                                <TableCell>
                                                    <span className='flex items-center flex-col'>
                                                        <span className='flex items-center gap-2 text-slate-700 font-semibold'>
                                                            <CalendarRange size={18} />
                                                            {student.dueDate}04-07-2026
                                                        </span>
                                                        <span className='text-sm text-red-400 font-semibold'>In 24days</span>
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={student.status === "active" ? "default" : "secondary"}>
                                                        {student.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className='text-right'>
                                                    <div className='flex items-center gap-2'>
                                                        <Button asChild variant="ghost" className='w-8 h-8 bg-slate-50 border'>
                                                            <Link href={`/students/${student.id}`}><Eye size={18} className='text-blue-600' /></Link>
                                                        </Button>
                                                        <Button asChild variant="ghost" className='w-8 h-8 bg-slate-50 border'>
                                                            <Link href={`/students/${student.id}`}><MoreVertical size={18} className='text-blue-600' /></Link>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        </>
                                    ))}

                                </TableBody>
                            </Table>

                            <div className="p-4 border-t flex justify-between text-sm">
                                <span>
                                    Showing {studentList.length} of {studentList.length} students
                                </span>
                                <div className="flex gap-2">
                                    <button className="w-8 h-8 border rounded">1</button>
                                    <button className="w-8 h-8 border rounded">2</button>
                                    <button className="w-8 h-8 border rounded">3</button>
                                    <button className="w-8 h-8 border rounded">4</button>
                                    <button className="w-8 h-8 border rounded">5</button>
                                </div>
                            </div>
                        </div>

                        

                        <Dialog open={showModal} onOpenChange={setShowModal}>
                            <DialogContent className='max-w-2xl'>
                                <DialogHeader>
                                    <DialogTitle>Add a new student</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className='space-y-4'>
                                    <div className='grid grid-cols-4 gap-4 items-center'>
                                        <div className="grid gap-2">
                                            <Label className='text-black bolder font-'>Adm No</Label>
                                            <input className="mt-1 block w-full border p-1 rounded" type="text" value={data.adm_no} onChange={(e) => setData('adm_no', e.target.value)} placeholder='Adm No' />
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
                                            <input className="mt-1 block w-full border p-1 rounded" type="text" value={data.phone_number} onChange={(e) => setData('phone_number', e.target.value)} placeholder='Parent Phone Number' />
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
                                    <Button variant={'default'} type='submit' disabled={processing}>Submit Student</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                            
                    </CardContent>
                </Card>
            </div>
        <div>
    </div>
</AppLayout>
    );
}
