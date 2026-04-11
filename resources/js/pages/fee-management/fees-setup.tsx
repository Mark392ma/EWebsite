import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formartCurreny, formatDate } from "@/lib/utils";

export default function FeeSetups() {
  //const { data: feeSetups, isLoading } = useListFeeSetups();

  return (
    <div className="space-y-6">
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
          {isLoading ? (
             <div className="space-y-2">
               <Skeleton className="h-10 w-full" />
               <Skeleton className="h-10 w-full" />
             </div>
          ) : (
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
                {feeSetups?.map((setup) => (
                  <TableRow key={setup.id}>
                    <TableCell className="font-medium">
                      {setup.feeTypeName || setup.feeGroupName}
                      <div className="text-xs text-muted-foreground">{setup.feeTypeId ? "Type" : "Group"}</div>
                    </TableCell>
                    <TableCell>{setup.academicYear} {setup.term ? `- ${setup.term}` : ""}</TableCell>
                    <TableCell className="font-medium">{formartCurreny(setup.amount)}</TableCell>
                    <TableCell>{formatDate(setup.dueDate)}</TableCell>
                    <TableCell>{setup.latePenalty ? formartCurrency(setup.latePenalty) : "-"}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
                {feeSetups?.length === 0 && (
                  <TableRow>
                    <TableCell col-span={6} className="text-center py-4 text-muted-foreground">No fee setups configured.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
