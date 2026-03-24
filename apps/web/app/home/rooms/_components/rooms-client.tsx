'use client';

import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@kit/ui/alert-dialog';
import { Button } from '@kit/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@kit/ui/table';
import { deleteRoomAction } from '../actions';

import type { Tables } from '~/lib/database.types';
import { CreateHotelDialog as CreateHotelDialogPlaceholder } from '../../hotels/_components/create-hotel-dialog';
import { CreateHotelDialog } from '../../hotels/_components/create-hotel-dialog';
import { CreateHotelDialog as _unused } from '../../hotels/_components/create-hotel-dialog';

import { CreateRoomDialog } from './create-room-dialog';
import { EditRoomDialog } from './edit-room-dialog';
import { Card } from '@kit/ui/card';

type Room = Tables<'hotel_rooms'>;

export function RoomsClient({ rooms }: { rooms: Room[] }) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editRoom, setEditRoom] = useState<Room | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deletePending, setDeletePending] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setDeletePending(true);
    try {
      const formData = new FormData();
      formData.set('id', String(deleteId));
      await deleteRoomAction(formData);
      toast.success('Room deleted');
      setDeleteId(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete');
    } finally {
      setDeletePending(false);
    }
  };

  const openEdit = (room: Room) => {
    setEditRoom(room);
    setEditOpen(true);
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex justify-end">
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create room
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hotel</TableHead>
                <TableHead>Room #</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="w-[120px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">No data available</TableCell>
                </TableRow>
              ) : (
                rooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">{room.hotel_slug}</TableCell>
                    <TableCell className="text-muted-foreground">{room.room_number}</TableCell>
                    <TableCell className="text-muted-foreground">{room.name}</TableCell>
                    <TableCell className="text-muted-foreground">{(room as any).room_category_name ?? '—'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(room)} aria-label="Edit">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleteId(room.id)} aria-label="Delete" className="text-destructive hover:text-destructive">
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
        <CreateRoomDialog open={createOpen} onOpenChange={setCreateOpen} />
        <EditRoomDialog
          room={editRoom}
          open={editOpen}
          onOpenChange={(open) => {
            setEditOpen(open);
            if (!open) setEditRoom(null);
          }}
        />
        <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to continue?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deletePending}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={(e) => { e.preventDefault(); handleDeleteConfirm(); }} disabled={deletePending} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  );
}
