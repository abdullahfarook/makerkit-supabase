'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@kit/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@kit/ui/dialog';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';

import { updateRoomAction } from '../actions';

import type { Tables } from '~/lib/database.types';
type Room = Tables<'hotel_rooms'>;

export function EditRoomDialog({ room, open, onOpenChange }: { room: Room | null; open: boolean; onOpenChange: (open: boolean) => void; }) {
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPending(false);
  }, [room?.id]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!room) return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set('id', String(room.id));
    setPending(true);
    try {
      await updateRoomAction(formData);
      toast.success('Room updated');
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update');
    } finally {
      setPending(false);
    }
  }, [room, onOpenChange]);

  if (!room) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit room</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input id="edit-name" name="name" required defaultValue={room.name ?? ''} className="w-full" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-price">Price per night</Label>
              <Input id="edit-price" name="price_per_night" type="number" defaultValue={(room.price_per_night ?? '') as any} className="w-full" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={pending}>Cancel</Button>
            <Button type="submit" disabled={pending}>Continue</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
