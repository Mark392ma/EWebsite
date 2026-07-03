import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Fee Groups', href: '/fee-groups' },
];

type FeeType = { id: number; name: string; description?:string; frequency: string }
type FeeGroup = {
  id: number;
  name: string;
  description?: string;
  fee_type: { includes: string[]; optional: boolean };
}

type PageProps = {
  feeGroups?: FeeGroup[];
  allFeeTypes?: FeeType[];
}

export default function FeeGroups({ feeGroups = [], allFeeTypes = [] }: PageProps) { // <-- added defaults
  const [open, setOpen] = useState(false)
  const [editingGroup, setEditingGroup] = useState<FeeGroup | null>(null)
  
  const { data, setData, post, put, processing, reset, errors } = useForm({
    name: '',
    description: '',
    fee_types_ids: [] as number[],
  })

  const openCreate = () => {
    reset()
    setEditingGroup(null)
    setOpen(true)
  }

  const openEdit = (group: FeeGroup) => {
    setEditingGroup(group)
    const selectedIds = allFeeTypes.filter(ft => group.fee_type?.includes?.includes(ft.name) ?? false).map(ft => ft.id);
    setData({
      name: group.name,
      description: group.description || '',
      fee_types_ids: selectedIds
    })
    setOpen(true)
  }

  const getFeeTypesByNames = (names:string[]) => {
    return allFeeTypes.filter(ft => names.includes(ft.name))
  }

  const toggleFeeType = (id: number) => {
    setData('fee_types_ids',
      data.fee_types_ids.includes(id)
        ? data.fee_types_ids.filter(i => i !== id)
        : [...data.fee_types_ids, id]
    )
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingGroup) {
      put(`/fee-management/fees-group/${editingGroup.id}`, {
        onSuccess: () => {
          setOpen(false)
          alert('Succefllly')
        },
      })
    } else {
      post('/fee-management/fees-group', {
        onSuccess: () => setOpen(false)
      })
    }
  }
  console.log(feeGroups)


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Fee Groups</h1>
          <Button onClick={openCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Manage Fee Bundles</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Group Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Included Fee Types</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(feeGroups ?? []).length > 0 ? ( // <-- safe check
                  (feeGroups ?? []).map((group) => ( // <-- removed fragment <>, key on TableRow
                    <TableRow key={group.id}>
                      <TableCell className="font-medium">{group.name}</TableCell>
                      <TableCell className="text-muted-foreground">{group.description || "-"}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {getFeeTypesByNames(group.fee_type.includes).map(ft => ( // <-- use fee_types not fee_type.includes
                            <Badge key={ft.id} variant="outline" className="text-xs">
                              {ft.name}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(group)}>Edit</Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive"
                          onClick={() => confirm('Delete this group?') && router.delete(route('fee-groups.destroy', group.id))}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                      No fee groups configured.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="max-w-2xl max-h- overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingGroup ? 'Edit' : 'Create'} Fee Group</DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Name *</Label>
                    <Input value={data.name} onChange={e => setData('name', e.target.value)} />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input value={data.description} onChange={e => setData('description', e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label>Select Fee Types *</Label>
                    <div className="border rounded-md p-3 space-y-2 max-h-60 overflow-y-auto">
                      {(allFeeTypes ?? []).map(ft => ( // <-- safe map
                        <div key={ft.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`ft-${ft.id}`} 
                            checked={data.fee_types_ids.includes(ft.id)} 
                            onCheckedChange={() => toggleFeeType(ft.id)}
                          />
                          <Label htmlFor={`ft-${ft.id}`} className="font-normal cursor-pointer">
                            {ft.name} <span className="text-muted-foreground">({ft.frequency})</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.fee_types_ids && <p className="text-sm text-red-500">{errors.fee_types_ids}</p>}
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit" disabled={processing}>
                      {processing ? 'Saving...' : editingGroup ? 'Update' : 'Create'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}