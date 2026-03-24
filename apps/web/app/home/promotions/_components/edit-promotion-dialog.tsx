'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@kit/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@kit/ui/dialog';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';

import { updatePromotionAction } from '../actions';

export function EditPromotionDialog({ promotion, open, onOpenChange }: { promotion: any | null; open: boolean; onOpenChange: (open: boolean) => void; }) {
  const [pending, setPending] = useState(false);

  useEffect(() => {
    setPending(false);
  }, [promotion?.code]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!promotion) return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set('code', promotion.code);
    setPending(true);
    try {
      await updatePromotionAction(formData);
      toast.success('Promotion updated');
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update');
    } finally {
      setPending(false);
    }
  }, [promotion, onOpenChange]);

  if (!promotion) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit promotion</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Code</Label>
              <Input value={promotion.code} readOnly className="w-full bg-muted" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hotel_id">Hotel (optional)</Label>
              <Input id="hotel_id" name="hotel_id" defaultValue={promotion.hotel_id ?? ''} className="w-full" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="discount_percent">Discount percent</Label>
              <Input id="discount_percent" name="discount_percent" type="number" defaultValue={promotion.discount_percent ?? ''} className="w-full" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="valid_from">Valid from</Label>
              <Input id="valid_from" name="valid_from" type="date" defaultValue={promotion.valid_from ?? ''} className="w-full" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="valid_to">Valid to</Label>
              <Input id="valid_to" name="valid_to" type="date" defaultValue={promotion.valid_to ?? ''} className="w-full" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={pending}>Cancel</Button>
            <Button type="submit" disabled={pending}>Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
