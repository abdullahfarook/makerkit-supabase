'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@kit/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@kit/ui/dialog';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';

import { updateHotelAction } from '../actions';

import type { Tables } from '~/lib/database.types';
type Hotel = Tables<'hotel'>;

export function EditHotelDialog({ hotel, open, onOpenChange }: { hotel: Hotel | null; open: boolean; onOpenChange: (open: boolean) => void; }) {
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPending(false);
  }, [hotel?.id]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hotel) return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set('id', String(hotel.id));
    setPending(true);
    try {
      await updateHotelAction(formData);
      toast.success('Hotel updated');
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update');
    } finally {
      setPending(false);
    }
  }, [hotel, onOpenChange]);

  if (!hotel) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit hotel</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input id="edit-name" name="name" required defaultValue={hotel.name ?? ''} className="w-full" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-class">Class</Label>
              <Input id="edit-class" name="class" type="number" defaultValue={hotel.class ?? undefined} className="w-full" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-address">Address</Label>
              <Input id="edit-address" name="address" defaultValue={hotel.address ?? ''} className="w-full" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-location">Location slug</Label>
              <Input id="edit-location" name="location_slug" defaultValue={hotel.location_slug ?? ''} className="w-full" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-active">Active</Label>
              <input id="edit-active" name="is_active" type="checkbox" defaultChecked={!!hotel.is_active} />
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
