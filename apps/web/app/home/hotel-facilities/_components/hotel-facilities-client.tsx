'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@kit/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@kit/ui/table';
import { deleteHotelFacilityAction, createHotelFacilityAction } from '../actions';
import { CreateHotelFacilityDialog } from './create-hotel-facility-dialog';
import { Card } from '@kit/ui/card';

export function HotelFacilitiesClient({ links }: { links: Array<{ hotel_id: string; facility_id: number }>; }) {
  const [createOpen, setCreateOpen] = useState(false);
  const [deletePending, setDeletePending] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ hotel_id: string; facility_id: number } | null>(null);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeletePending(true);
    try {
      const form = new FormData();
      form.set('hotel_id', deleteTarget.hotel_id);
      form.set('facility_id', String(deleteTarget.facility_id));
      await deleteHotelFacilityAction(form);
      toast.success('Link removed');
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete');
    } finally {
      setDeletePending(false);
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Assign facility
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hotel</TableHead>
                <TableHead>Facility ID</TableHead>
                <TableHead className="w-[120px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">No links</TableCell>
                </TableRow>
              ) : (
                links.map((l, idx) => (
                  <TableRow key={`${l.hotel_id}:${l.facility_id}:${idx}`}>
                    <TableCell className="font-medium">{l.hotel_id}</TableCell>
                    <TableCell className="text-muted-foreground">{l.facility_id}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(l)} aria-label="Delete" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <CreateHotelFacilityDialog open={createOpen} onOpenChange={setCreateOpen} />
        {/* Delete confirmation */}
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded shadow">
              <p>Remove facility {deleteTarget.facility_id} from hotel {deleteTarget.hotel_id}?</p>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDeleteTarget(null)} disabled={deletePending}>Cancel</Button>
                <Button className="bg-destructive text-destructive-foreground" onClick={handleDeleteConfirm} disabled={deletePending}>Delete</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
