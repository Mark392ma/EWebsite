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
import { Badge } from "@/components/ui/badge";

export default function FeeTypes() {
  const { data: feeTypes, isLoading } = useListFeeTypes();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Fee Types</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Fee Type
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Fee Categories</CardTitle>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feeTypes?.map((ft) => (
                  <TableRow key={ft.id}>
                    <TableCell className="font-medium">{ft.name}</TableCell>
                    <TableCell className="text-muted-foreground">{ft.description || "-"}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">{ft.frequency}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
