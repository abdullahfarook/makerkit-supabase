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

export function EditHotelDialog({ hotel, open, onOpenChange, facilities }: { hotel: Hotel | null; open: boolean; onOpenChange: (open: boolean) => void; facilities: { id: number; name: string }[] }) {
  const [pending, setPending] = useState(false);
  const [selectedFacilityIds, setSelectedFacilityIds] = useState<number[]>([]);
  const [newFacilityName, setNewFacilityName] = useState('');
  const [newFacilities, setNewFacilities] = useState<string[]>([]);

  useEffect(() => {
    setPending(false);
    if (hotel && (hotel as any).hotel_facility) {
      const ids = (hotel as any).hotel_facility.map((hf: any) => Number(hf.facility_id));
      setSelectedFacilityIds(ids);
    } else {
      setSelectedFacilityIds([]);
    }
  }, [hotel?.id]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hotel) return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set('id', String(hotel.id));
    selectedFacilityIds.forEach((id) => formData.append('facility_ids', String(id)));
    newFacilities.forEach((name) => formData.append('new_facilities', name));
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
  }, [hotel, onOpenChange, selectedFacilityIds, newFacilities]);

  if (!hotel) return null;

  const toggleFacility = (id: number) => {
    setSelectedFacilityIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const addNewFacility = () => {
    if (!newFacilityName.trim()) return;
    setNewFacilities((prev) => [...prev, newFacilityName.trim()]);
    setNewFacilityName('');
  };

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
              <Label>Facilities</Label>
              <div className="grid gap-2">
                {facilities.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No facilities available</div>
                ) : (
                  facilities.map((f) => (
                    <label key={f.id} className="inline-flex items-center gap-2">
                      <input type="checkbox" checked={selectedFacilityIds.includes(f.id)} onChange={() => toggleFacility(f.id)} />
                      <span className="text-sm">{f.name}</span>
                    </label>
                  ))
                )}
              </div>
              <div className="pt-2">
                <div className="flex gap-2">
                  <Input value={newFacilityName} onChange={(e) => setNewFacilityName(e.target.value)} placeholder="Add new facility (e.g. WiFi)" />
                  <Button type="button" onClick={addNewFacility}>Add</Button>
                </div>
                {newFacilities.length > 0 && (
                  <div className="mt-2 text-sm text-muted-foreground">New: {newFacilities.join(', ')}</div>
                )}
              </div>
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
