'use client';

import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@kit/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@kit/ui/dialog';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';

import { createHotelAction } from '../actions';

export function CreateHotelDialog({ open, onOpenChange, facilities }: { open: boolean; onOpenChange: (open: boolean) => void; facilities: { id: number; name: string }[] }) {
  const [selectedFacilityIds, setSelectedFacilityIds] = useState<number[]>([]);
  const [newFacilityName, setNewFacilityName] = useState('');
  const [newFacilities, setNewFacilities] = useState<string[]>([]);
  const [pending, setPending] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    // append selected existing facilities
    selectedFacilityIds.forEach((id) => formData.append('facility_ids', String(id)));
    // append new facilities as repeated fields
    newFacilities.forEach((name) => formData.append('new_facilities', name));
    setPending(true);
    try {
      await createHotelAction(formData);
      toast.success('Hotel created');
      onOpenChange(false);
      form.reset();
      setSelectedFacilityIds([]);
      setNewFacilities([]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to create');
    } finally {
      setPending(false);
    }
  }, [onOpenChange, selectedFacilityIds, newFacilities]);

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
              <Label>Facilities</Label>
              <div className="grid gap-2">
                {facilities.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No facilities created yet</div>
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
