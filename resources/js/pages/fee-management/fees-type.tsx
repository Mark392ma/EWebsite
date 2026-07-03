import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { router, useForm } from '@inertiajs/react';
import { useState } from "react";

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Fee type', href: '/fee-management/fees-type' },
];

type FeeType = {
  id: number;
  name: string;
  description?: string;
  frequency: string;
};

export default function FeeTypes({ feeTypes = [] }: { feeTypes: FeeType[] }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<FeeType | null>(null);

  const form = useForm({
    name: '',
    description: '',
    frequency: 'termly',
  });

  const openCreate = () => {
    setEditing(null);
    form.reset('name', 'description', 'frequency');
    form.setData('frequency', 'termly');
    setOpen(true);
  };

  const openEdit = (type: FeeType) => {
    setEditing(type);
    form.setData({
      name: type.name,
      description: type.description || '',
      frequency: type.frequency,
    });
    setOpen(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      form.put(`/fee-management/fees-type/${editing.id}`, {
        onSuccess: () => setOpen(false)
      });
    } else {
      form.post('/fee-management/fees-type', {
        onSuccess: () => setOpen(false)
      });
    }
  };

  const deleteType = (id: number) => {
    if (!confirm('Delete this fee type?')) return;
      router.delete(`/fee-management/fees-type/${id}`, {
        preserveScroll: true,
        onError: (errors) => {
          alert('Delete failed' + JSON.stringify(errors))
        } 
      });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Fee Types</h1>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreate}>
                <Plus className="mr-2 h-4 w-4" />
                Add Fee Type
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={submit}>
                <DialogHeader>
                  <DialogTitle>{editing? 'Edit' : 'Add'} Fee Type</DialogTitle>
                  <DialogDescription>
                    {editing? 'Update' : 'Create'} a fee category used in fee setups.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={form.data.name}
                      onChange={e => form.setData('name', e.target.value)}
                      className="mt-1"
                    />
                    {form.errors.name && <p className="text-sm text-red-500 mt-1">{form.errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      value={form.data.description}
                      onChange={e => form.setData('description', e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select
                      value={form.data.frequency}
                      onValueChange={v => form.setData('frequency', v)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one-time">One Time</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="termly">Termly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.errors.frequency && <p className="text-sm text-red-500 mt-1">{form.errors.frequency}</p>}
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={form.processing}>
                    {form.processing? 'Saving...' : 'Save'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Manage Fee Categories</CardTitle>
          </CardHeader>
          <CardContent>
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
                {feeTypes.length > 0? (
                  feeTypes.map((type) => (
                    <TableRow key={type.id}>
                      <TableCell className="font-medium">{type.name}</TableCell>
                      <TableCell className="text-muted-foreground">{type.description || "-"}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">{type.frequency}</Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(type)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteType(type.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No fee type configured. Click "Add Fee Type" to create one.
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