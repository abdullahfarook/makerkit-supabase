'use client';

import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@kit/ui/alert-dialog';
import { Button } from '@kit/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@kit/ui/table';
import { deleteHotelAction } from '../actions';

import type { Tables } from '~/lib/database.types';

import { CreateHotelDialog } from './create-hotel-dialog';
import { EditHotelDialog } from './edit-hotel-dialog';
import { Card } from '@kit/ui/card';

type Hotel = Tables<'hotel'>;

type Facility = Tables<'facility'>;

export function HotelsClient({ hotels, facilities }: { hotels: Hotel[]; facilities: Facility[] }) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editHotel, setEditHotel] = useState<Hotel | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deletePending, setDeletePending] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setDeletePending(true);
    try {
      const formData = new FormData();
      formData.set('id', String(deleteId));
      await deleteHotelAction(formData);
      toast.success('Hotel deleted');
      setDeleteId(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete');
    } finally {
      setDeletePending(false);
    }
  };

  const openEdit = (hotel: Hotel) => {
    setEditHotel(hotel);
    setEditOpen(true);
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Facilities: {facilities.length}</div>
          <div>
            <Button onClick={() => setCreateOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create hotel
            </Button>
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="w-[120px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hotels.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                hotels.map((hotel) => (
                  <TableRow key={hotel.id}>
                    <TableCell className="font-medium">{hotel.name}</TableCell>
                    <TableCell className="text-muted-foreground">{hotel.class ?? '—'}</TableCell>
                    <TableCell className="text-muted-foreground">{hotel.address ?? '—'}</TableCell>
                    <TableCell className="text-muted-foreground">{hotel.is_active ? 'Yes' : 'No'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(hotel)} aria-label="Edit">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleteId(hotel.id)} aria-label="Delete" className="text-destructive hover:text-destructive">
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
        <CreateHotelDialog open={createOpen} onOpenChange={setCreateOpen} facilities={facilities} />
        <EditHotelDialog
          hotel={editHotel}
          open={editOpen}
          facilities={facilities}
          onOpenChange={(open) => {
            setEditOpen(open);
            if (!open) setEditHotel(null);
          }}
        />
        <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to continue?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this hotel. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deletePending}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteConfirm();
                }}
                disabled={deletePending}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  );
}
