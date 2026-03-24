'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@kit/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@kit/ui/dialog';
import { ImageUploader } from '@kit/ui/image-uploader';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';

import { updateFacilityAction } from '../actions';

import type { Tables } from '~/lib/database.types';

type Facility = Tables<'facilities'>;

export function EditFacilityDialog({
  facility,
  open,
  onOpenChange,
}: {
  facility: Facility | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [pending, setPending] = useState(false);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  useEffect(() => {
    if (facility?.icon) setIconPreview(facility.icon);
    else setIconPreview(null);
    setIconFile(null);
  }, [facility?.id, facility?.icon]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!facility) return;
      const form = e.currentTarget;
      const formData = new FormData(form);
      formData.set('id', facility.id);
      if (iconFile) formData.set('icon', iconFile);
      setPending(true);
      try {
        await updateFacilityAction(formData);
        toast.success('Facility updated');
        onOpenChange(false);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to update');
      } finally {
        setPending(false);
      }
    },
    [facility, iconFile, onOpenChange],
  );

  const onIconChange = useCallback((file: File | null) => {
    setIconFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setIconPreview(url);
    } else if (facility?.icon) {
      setIconPreview(facility.icon);
    } else {
      setIconPreview(null);
    }
  }, [facility?.icon]);

  if (!facility) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit facility</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                name="name"
                required
                defaultValue={facility.name}
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-slug">Slug</Label>
              <Input
                id="edit-slug"
                value={facility.slug}
                readOnly
                className="w-full bg-muted"
              />
            </div>
            <div className="grid gap-2">
              <Label>Icon image</Label>
              <ImageUploader
                value={iconPreview ?? undefined}
                onValueChange={onIconChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              Continue
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
