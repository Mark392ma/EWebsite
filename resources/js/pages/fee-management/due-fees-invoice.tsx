import { formartCurreny, formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AppLayout from '@/layouts/app-layout';
import { Button } from "@/components/ui/button";
import { type BreadcrumbItem } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
  {
      title: 'Fee Due Invoice',
      href: '/fee-due-invoice',
  },
];

interface Invoice {
  id: number;
  invoiceNumber: string;
  studentName: string;
  admissionNumber: string;
  feeSetupName?: string;
  amountDue: number;
  balance: number;
  dueDate: string;
  status: string;
}

export default function DueInvoices({ invoices = [] }: { invoices: Invoice[] }) {

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Due Invoices</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Overdue Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices?.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                      <TableCell>
                        {invoice.studentName}
                        <div className="text-xs text-muted-foreground">{invoice.admissionNumber}</div>
                      </TableCell>
                      <TableCell>{invoice.feeSetupName || "Custom"}</TableCell>
                      <TableCell>{formartCurreny(invoice.amountDue)}</TableCell>
                      <TableCell className="font-medium text-destructive">{formartCurreny(invoice.balance)}</TableCell>
                      <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/invoices/${invoice.id}`}>View</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {invoices.length === 0 && (
                    <TableRow>
                      <TableCell col-span={8} className="text-center py-4 text-muted-foreground">
                        No overdue invoices found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
