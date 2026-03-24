'use client';

import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@kit/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@kit/ui/table';
import { deletePromotionAction } from '../actions';
import { CreatePromotionDialog } from './create-promotion-dialog';
import { EditPromotionDialog } from './edit-promotion-dialog';
import { Card } from '@kit/ui/card';

export function PromotionsClient({ promotions }: { promotions: any[] }) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editPromotion, setEditPromotion] = useState<any | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteCode, setDeleteCode] = useState<string | null>(null);
  const [deletePending, setDeletePending] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!deleteCode) return;
    setDeletePending(true);
    try {
      const form = new FormData();
      form.set('code', deleteCode);
      await deletePromotionAction(form);
      toast.success('Promotion deleted');
      setDeleteCode(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete');
    } finally {
      setDeletePending(false);
    }
  };

  const openEdit = (p: any) => {
    setEditPromotion(p);
    setEditOpen(true);
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create promotion
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Hotel</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Valid</TableHead>
                <TableHead className="w-[120px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promotions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">No promotions</TableCell>
                </TableRow>
              ) : (
                promotions.map((p) => (
                  <TableRow key={p.code}>
                    <TableCell className="font-medium">{p.code}</TableCell>
                    <TableCell className="text-muted-foreground">{p.hotel_id ?? 'All'}</TableCell>
                    <TableCell className="text-muted-foreground">{p.discount_percent ?? '—'}</TableCell>
                    <TableCell className="text-muted-foreground">{p.valid_from ? `${p.valid_from} → ${p.valid_to ?? '—'}` : '—'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(p)} aria-label="Edit"><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleteCode(p.code)} aria-label="Delete" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <CreatePromotionDialog open={createOpen} onOpenChange={setCreateOpen} />
        <EditPromotionDialog promotion={editPromotion} open={editOpen} onOpenChange={(open) => { setEditOpen(open); if (!open) setEditPromotion(null); }} />
        {deleteCode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow">
              <p>Delete promotion <strong>{deleteCode}</strong>?</p>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDeleteCode(null)} disabled={deletePending}>Cancel</Button>
                <Button className="bg-destructive text-destructive-foreground" onClick={handleDeleteConfirm} disabled={deletePending}>Delete</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
