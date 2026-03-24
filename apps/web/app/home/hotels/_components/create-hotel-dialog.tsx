'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@kit/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@kit/ui/dialog';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';

import { createHotelAction } from '../actions';

export function CreateHotelDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void; }) {
  const [pending, setPending] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setPending(true);
    try {
      await createHotelAction(formData);
      toast.success('Hotel created');
      onOpenChange(false);
      form.reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create');
    } finally {
      setPending(false);
    }
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create hotel</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="create-name">Name</Label>
              <Input id="create-name" name="name" required placeholder="Hotel name" className="w-full" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-class">Class</Label>
              <Input id="create-class" name="class" type="number" placeholder="e.g. 5" className="w-full" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-address">Address</Label>
              <Input id="create-address" name="address" placeholder="Address" className="w-full" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-location">Location slug</Label>
              <Input id="create-location" name="location_slug" placeholder="city-slug" className="w-full" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-active">Active</Label>
              <input id="create-active" name="is_active" type="checkbox" defaultChecked />
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
