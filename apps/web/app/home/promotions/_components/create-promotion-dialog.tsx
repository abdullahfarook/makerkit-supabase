'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@kit/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@kit/ui/dialog';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';

import { createPromotionAction } from '../actions';

export function CreatePromotionDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void; }) {
  const [pending, setPending] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setPending(true);
    try {
      await createPromotionAction(formData);
      toast.success('Promotion created');
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
            <DialogTitle>Create promotion</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Code</Label>
              <Input id="code" name="code" required className="w-full" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hotel_id">Hotel (optional)</Label>
              <Input id="hotel_id" name="hotel_id" className="w-full" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="discount_percent">Discount percent</Label>
              <Input id="discount_percent" name="discount_percent" type="number" className="w-full" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="valid_from">Valid from</Label>
              <Input id="valid_from" name="valid_from" type="date" className="w-full" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="valid_to">Valid to</Label>
              <Input id="valid_to" name="valid_to" type="date" className="w-full" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={pending}>Cancel</Button>
            <Button type="submit" disabled={pending}>Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
