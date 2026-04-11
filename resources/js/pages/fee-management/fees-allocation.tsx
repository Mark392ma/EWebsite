import { useListFeeAllocations } from "@workspace/api-client-react";
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

export default function FeeAllocations() {
  const { data: allocations, isLoading } = useListFeeAllocations();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Fee Allocations</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Assign Fees
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assigned Fees to Students</CardTitle>
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
                  <TableHead>Student</TableHead>
                  <TableHead>Fee Setup</TableHead>
                  <TableHead>Custom Amount</TableHead>
                  <TableHead>Date Assigned</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allocations?.map((alloc) => (
                  <TableRow key={alloc.id}>
                    <TableCell className="font-medium">{alloc.studentName}</TableCell>
                    <TableCell>{alloc.feeSetupName}</TableCell>
                    <TableCell>{alloc.customAmount ? formartCurreny(alloc.customAmount) : "Default"}</TableCell>
                    <TableCell>{formatDate(alloc.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-destructive">Remove</Button>
                    </TableCell>
                  </TableRow>
                ))}
                {allocations?.length === 0 && (
                  <TableRow>
                    <TableCell col-span={5} className="text-center py-4 text-muted-foreground">No fee allocations found.</TableCell>
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
