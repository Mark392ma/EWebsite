import { formartCurreny, formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, Plus } from "lucide-react";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const breadcrumbs: BreadcrumbItem[] = [
  {
      title: 'Fee setup',
      href: '/fee-setup',
  },
];


type Invoices = {
  id: number;
  invoiceNumber: number;
  admissionNumber: number;
  studentName?: string;
  description?: string;
  frequency: string;
  feeSetupName?: string;
  amountDue: number;
  dueDate?: string;
  balance: number;
  status?: string;
};

export default function Invoices({ invoices = [] }: { invoices: Invoices[] }) {

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <div className="flex gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Manual Invoice
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Generate Bulk
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Invoices</CardTitle>
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
                  {invoices.length > 0 ? (
                    invoices.map((invoice) => (
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
                        <Badge variant={invoice.status === "paid" ? "default" : invoice.status === "overdue" ? "destructive" : invoice.status === "partial" ? "outline" : "secondary"}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/invoices/${invoice.id}`}>View</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell col-span={8} className="text-center py-4 text-muted-foreground">
                        No invoices found.
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
