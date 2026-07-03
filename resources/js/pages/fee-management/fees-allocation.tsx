import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formartCurreny, formatDate } from "@/lib/utils";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const breadcrumbs: BreadcrumbItem[] = [
  {
      title: 'Fee Allocations',
      href: '/fee-allocations',
  },
];

type FeeAllocation = {
  id: number;
  student_name: string;
  fee_setup_name: string;
  custom_amount?: number;
  date_assigned: string;
}
type Student = {
  id:number;
  full_name: string;
  adm_no: string;
  class: string;
  stream: string;
}

type FeeSetup ={
  id: number;
  fee_type_id: string;
  amount: number;
  term: string;
}

type Props = {
  allocations: FeeAllocation[];
  students: Student[];
  fee_setups: FeeSetup[];
}
export default function FeeAllocations({ allocations = [], students = [], fee_setups = []}: Props) {
  const [open, setOpen ] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    student_ids: [] as number[],
    fee_setup_id: '',
    custom_amount: '',
    apply_to_all: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/fee-management/fees-allocation', {
      onSuccess: () => {
        setOpen(false);
        reset();
      }
    });
  };

  const toggleStudent = (id:number) =>{
    setData('student_ids', data.student_ids.includes(id) ? data.student_ids.filter(sid => sid!==id):[...data.student_ids, id]);
  };

  console.log(fee_setups)
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Fee Allocations</h1>
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Assign Fees
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Assigned Fees to Students</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Fee Setup</TableHead>
                    <TableHead>Custom Amount</TableHead>
                    <TableHead>Date Assigned</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allocations.length > 0 ? (
                   allocations.map((alloc) => (
                    <TableRow key={alloc.id}>
                      <TableCell className="font-medium">{alloc.student_name}</TableCell>
                      <TableCell>{alloc.fee_setup_name}</TableCell>
                      <TableCell>{alloc.custom_amount ? formartCurreny(alloc.custom_amount) : "Default"}</TableCell>
                      <TableCell>{formatDate(alloc.date_assigned)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                      <TableCell col-span={5} className="text-center py-4 text-muted-foreground">No fee allocations found.</TableCell>
                    </TableRow>
                )}
                </TableBody>
              </Table>
          </CardContent>
        </Card>

        {/*Assign Fees Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-2xl max-w-hoverflow-y-auto">
            <DialogHeader>
              <DialogTitle>Assign Fees to Students</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Fee Setup Select */}
              <div className="space-y-2">
                <Label>Fee Setup</Label>
                <Select
                  value={data.fee_setup_id}
                  onValueChange={(val) => setData('fee_setup_id', val)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fee setup"/>
                    </SelectTrigger>
                    <SelectContent>{fee_setups.map((fee) => (
                      <SelectItem key={fee.id} value={String(fee.id)}>{fee.fee_type_id} - {formartCurreny(fee.amount)} - {fee.term}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                {errors.fee_setup_id && <p className="text-sm text-destructive">{errors.fee_setup_id}</p>}
              </div>

              <div className="space-y-2">
                <Label>Custom amount</Label>
                <Input 
                  type="number"
                  placeholder="Leave empty to use default"
                  value={data.custom_amount}
                  onChange={(e) => setData('custom_amount', e.target.value)}/>
                  <p className="text-xs text-muted-foreground">Override default fee amount for selected students</p>
               </div>

              {/* Student Selection */}
              <div className="space-y-2">
                <Label>Select Students *</Label>
                <div className="border rounded-md p-3 max-h-60 overflow-y-auto space-y-2">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`student-${student.id}`}
                        checked={data.student_ids.includes(student.id)}
                        onCheckedChange={() => toggleStudent(student.id)}
                      />
                      <Label htmlFor={`student-${student.id}`} className="cursor-pointer flex-1">
                        {student.full_name} - {student.adm_no} - {student.class} {student.stream}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.student_ids && <p className="text-sm text-destructive">{errors.student_ids}</p>}
              </div>
              <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={processing}>
                    {processing? 'Assigning...' : 'Assign Fees'}
                  </Button>
                </DialogFooter>
            </form>
          </DialogContent>

        </Dialog>
      </div>
    </AppLayout>
  );
}
