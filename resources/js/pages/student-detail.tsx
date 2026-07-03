import { Head } from '@inertiajs/react';
import {
  Mail,
  Calendar,
  User,
  Download,
  Pencil,
  CalendarRangeIcon,
  BuildingIcon,
  Cake,
  Book,
  ChevronsLeftRightEllipsis,
  PhoneIncomingIcon,
  InfoIcon,
  File,
  MapPinIcon,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Info, MenuItem } from '../components/student-detail-helpers';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeeManagementPage from './student-details/fee-setup';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Student Details',
        href: '/students/',
    },
];

interface StudentDetailProps {
  student: any;
  payments: any[];
}

export default function StudentProfile({ student, payments = [] }: StudentDetailProps) {
  const defaultPayments = [
    {
      date: '05 May 2026',
      receipt: 'RCPT-2026-00045',
      description: 'Term 2 School Fees',
      amount: 'KES 10,000',
      method: 'M-Pesa',
    },
    {
      date: '12 Feb 2026',
      receipt: 'RCPT-2026-00012',
      description: 'Term 1 School Fees',
      amount: 'KES 5,000',
      method: 'Cash',
    },
    {
      date: '18 Nov 2025',
      receipt: 'RCPT-2025-00987',
      description: 'Activity Fees',
      amount: 'KES 3,000',
      method: 'M-Pesa',
    },
  ];

  const paymentList = payments.length ? payments : defaultPayments;

  return (
    <>
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={student?.full_name ? `${student.full_name} | Student Detail` : 'Student Detail'} />
      <main className="flex-1 p-6">
        <a className='flex items-center gap-2 mb-4'><ChevronsLeftRightEllipsis size={16}/> Bact to students</a>
          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center gap-6">
              <img src="https://i.pravatar.cc/120" alt="" className="w-24 h-24 rounded-full" />

              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <h3 className="text-[17px] font-bold">{student?.full_name ?? 'Student Profile'}</h3>
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                    {student?.status?.replace('-', ' ') ?? 'Active Student'}
                  </span>
                </div>

                <div className="flex gap-10 mt-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className='bg-blue-100/40 p-[4px] rounded-full text-center'><User size={16} fontWeight={500} color='blue'/></span>
                    <p className='font-[500] text-[#256798] text-sm'>{student?.adm_no ?? 'N/A'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className='bg-blue-100/40 p-[4px] rounded-full text-center'><PhoneIncomingIcon size={16} fontWeight={500} color='blue' /></span>
                    <p className='font-[500] text-[#256798] text-sm'>{student?.phone_number ?? 'N/A'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className='bg-blue-100/40 p-[4px] rounded-full text-center'><Mail size={16} fontWeight={500} color='blue' /></span>
                    <p className='font-[500] text-[#256798] text-sm'>{student?.email ?? 'N/A'}</p>
                  </div>
                </div>

                <div className="flex justify-between mt-2 text-gray-600">
                  <div className="flex items-center gap-4">
                    <BuildingIcon size={24} fontWeight={500} color='blue'/>
                    <div>
                      <span className='text-[#256798] text-sm'>Class</span>
                      <p className='font-bold text-[#000] text-sm'>{student?.['class'] ?? 'N/A'} {student?.['stream']}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <CalendarRangeIcon size={24} fontWeight={500} color='blue'/>
                    <div>
                      <span className='text-[#256798] text-sm'>Admission Date</span>
                      <p className='font-bold text-[#000] text-sm'>{student?.adm_date ?? 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Cake size={24} fontWeight={500} color='blue'/>
                    <div>
                      <span className='text-[#256798] text-sm'>Date of Birth</span>
                      <p className='font-bold text-[#000] text-sm'>{formatDate(student?.['date_of_birth'] ?? 'N/A')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Book size={24} fontWeight={500} color='blue'/>
                    <div>
                      <span className='text-[#256798] text-sm'>Roll No</span>
                      <p className='font-bold text-[#000] text-sm text-center'>{student.id}</p>
                    </div>
                  </div>

                  <button className="flex items-center gap-2 border p-2 text-sm font-bold text-[#02091d] rounded-xl">
                  <Pencil size={16} color='#081d58'/>
                    Edit Profile
                  </button>
                </div>
              </div>

            </div>
          </div>

          <Tabs defaultValue='overview'>
            <TabsList className='bg-transparent my-4 gap-6 justify-start outline-none font-semibold rounded-none border-b w-full '>
              <TabsTrigger value='overview' className='text-left text-[#ccc]'>
                Overview
              </TabsTrigger>
              <TabsTrigger value="fees-payment" className='flex items-center gap-2'>
                Fees & Payments
              </TabsTrigger>
              <TabsTrigger value="statements" className='flex items-center gap-2'>
                Statements
              </TabsTrigger>
              <TabsTrigger value="reciept-review" className='flex items-center gap-2'>
                Receipt Review
              </TabsTrigger>
              <TabsTrigger value="documents" className='flex items-center gap-2'>
                Documents
              </TabsTrigger>
              <TabsTrigger value="guardian-info" className='flex items-center gap-2'>
                Guardian Info
              </TabsTrigger>
              <TabsTrigger value="activity" className='flex items-center gap-2'>
                Activity Log
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value='overview'>
              <>
              
              {/* Information Section */}
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 bg-white rounded-2xl border p-6">
                  <h3 className="font-semibold text-lg pb-1 border-b mb-6 text-[#2e2c2c] flex items-center gap-2"><InfoIcon size={16} />Student Information</h3>
                  <div className="grid grid-rows-2 gap-2">
                    <div className="grid grid-cols-4 gap-2 border-b">
                      <Info label="Admission No" value={student?.adm_no ?? 'N/A'} />
                      <Info label="Class" value={student?.['class'] ?? 'N/A'} />
                      <Info label="Gender" value={student?.gender ?? 'N/A'} />
                      <Info label="Blood Group" value={student?.blood_group ?? 'N/A'} />
                    </div>
                    <div className="grid grid-cols-4 gap-2 pb-1">
                      <Info label="Nationality" value={student?.nationality ?? 'N/A'} />
                      <Info label="Religion" value={student?.religion ?? 'N/A'} />
                      <Info label="Boarding Status" value={student?.nationality ?? 'N/A'} />
                      <Info label="Transport" value={student?.religion ?? 'N/A'} />
                    </div>
                    
                  </div>
                </div>
                <div className="bg-white rounded-2xl border p-6">
                  <h3 className="font-semibold mb-4">Due Date</h3>
                  <div className="flex items-center gap-3">
                    <Calendar />
                    <span className="font-medium">30 May 2026</span>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-3 gap-6'>
                {/* Payments Table */}
                <div className="bg-white rounded-2xl col-span-2 border p-6 mt-6">
                  <div className='flex items-center justify-between mb-2'>
                    <h3 className="font-semibold text-lg">Recent Payments</h3>
                    <span className='text-blue-600 text-sm font-semibold'>View All Payments</span>                
                  </div>
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500 border-b">
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Receipt</th>
                        <th className="pb-3">Description</th>
                        <th className="pb-3">Amount</th>
                        <th className="pb-3">Method</th>
                        <th className="pb-3">Recorded By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentList.map((payment) => (
                        <tr key={payment.receipt} className="border-b text-sm text-gray-500 font-bold">
                          <td className="py-4">{payment.date}</td>
                          <td>{payment.receipt}</td>
                          <td>{payment.description}</td>
                          <td>{payment.amount}</td>
                          <td>{payment.method}</td>
                          <td>Md.Mercy</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Receipts */}
                <div className="bg-white rounded-2xl border p-4 mt-6">
                  <div className='flex items-center justify-between'>
                    <h3 className="font-semibold text-lg">Receipt Review</h3>
                    <span className='text-blue-600 text-sm font-semibold'>View All Reciept</span>                
                  </div>
                  <div className="space-y-3">
                    {paymentList.map((receipt) => (
                      <div key={receipt.receipt} className="flex justify-between items-center border-b py-3">
                          <p className="font-medium text-[12px] flex gap-1 items-center"><File color='green' size={16} /> {receipt.receipt}</p>
                          <p className="text-[9px] text-gray-500">{receipt.date}</p>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[9px] text-green-600">{receipt.amount}</span>
                          <button>
                            <Download size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button className='border bg-transparent p-2 text-sm rounded-3xl text-center ml-30px'>Open Receipt Review</button>
                  </div>
                </div>
              </div>
              

              

              {/* Stats */}
              <div className='bg-white rounded-2xl border mt-6 p-6'>
                <h3 className="font-semibold text-lg pb-1 border-b mb-6 text-[#2e2c2c] flex items-center gap-2"><InfoIcon size={16} />Guardian Information</h3>
                <div className="grid grid-cols-3 gap-6 mt-6">
                  <div className="">
                    <h3 className="text-gray-500">Father/Guardian</h3>
                    <p className="text-sm font-bold text-gray-600">
                       {student?.name ?? 'None'}
                    </p>
                    <p className="text-sm font-semibold flex items-center gap-2 text-gray-600">
                      <PhoneIncomingIcon size={16} />
                       {student?.phone_number ?? '0'}
                    </p>
                    <p className="text-sm font-semibold flex items-center gap-2 text-gray-600">
                      <Mail size={16} />
                       {student?.email ?? '0'}
                    </p>
                  </div>
                  <div className="">
                    <h3 className="text-gray-500">Mother/Guardian</h3>
                    <p className="text-sm font-bold text-gray-600">
                       {student?.name ?? 'None'}
                    </p>
                    <p className="text-sm font-semibold flex items-center gap-2 text-gray-600">
                      <PhoneIncomingIcon size={16} />
                       {student?.phone_number ?? '0'}
                    </p>
                    <p className="text-sm font-semibold flex items-center gap-2 text-gray-600">
                      <Mail size={16} />
                       {student?.email ?? '0'}
                    </p>
                  </div>
                  <div className="">
                    <h3 className="text-gray-500 flex items-center gap-2">
                      <MapPinIcon size={16} />
                      Address
                    </h3>
                    <p className="text-sm font-bold text-gray-600">
                       {student?.address ?? 'None'}
                    </p>
                    <p className="text-sm font-semibold flex items-center gap-2 text-gray-600">
                      <PhoneIncomingIcon size={16} />
                       {student?.phone_number ?? '0'}
                    </p>
                    <p className="text-sm font-semibold flex items-center gap-2 text-gray-600">
                      <Mail size={16} />
                       {student?.email ?? '0'}
                    </p>
                  </div>
                </div>
              </div>
              </>
            </TabsContent>

            <TabsContent value='fees-payment'>
              <>
              <FeeManagementPage />
              </>
            </TabsContent>
          </Tabs>
        </main>
    </AppLayout>

        {/* Main Content */}

        
    </>
  );
}
