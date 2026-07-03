import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formartCurreny, formatDate } from "@/lib/utils";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Fee Setups',
    href: '/fee-management/fees-setup',
  },
];

type FeeSetup = {
  id: number;
  feeTypeId?: number;
  feeTypeName?: string;
  feeGroupName?: string;
  academicYear: string;
  term?: string;
  amount: number;
  dueDate: string;
  latePenalty?: number;
};

export default function FeeSetups({ feeSetups = [] }: { feeSetups: FeeSetup[] }) {

  console.log(feeSetups)
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Fee Management" />

      <div className="space-y-6 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Fee Setups</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Setup
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fee Configurations per Term/Year</CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type/Group</TableHead>
                  <TableHead>Academic Period</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Penalty</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {feeSetups.length > 0 ? (
                  feeSetups.map((setup) => (
                    <TableRow key={setup.id}>
                      <TableCell className="font-medium">
                        {setup.feeTypeName || setup.feeGroupName}
                        <div className="text-xs text-muted-foreground">
                          {setup.feeGroupName}
                        </div>
                      </TableCell>

                      <TableCell>
                        {setup.academicYear} {setup.term ? `- ${setup.term}` : ""}
                      </TableCell>

                      <TableCell className="font-medium">
                        {formartCurreny(setup.amount)}
                      </TableCell>

                      <TableCell>{formatDate(setup.dueDate)}</TableCell>

                      <TableCell>
                        {setup.latePenalty ? formartCurreny(setup.latePenalty) : "-"}
                      </TableCell>

                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      No fee setups configured.
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