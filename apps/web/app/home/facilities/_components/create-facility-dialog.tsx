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

import { createFacilityAction } from '../actions';

export function CreateFacilityDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [pending, setPending] = useState(false);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setIconFile(null);
      setIconPreview(null);
    }
  }, [open]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      if (iconFile) formData.set('icon', iconFile);
      setPending(true);
      try {
        await createFacilityAction(formData);
        toast.success('Facility created');
        onOpenChange(false);
        form.reset();
        setIconFile(null);
        setIconPreview(null);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to create');
      } finally {
        setPending(false);
      }
    },
    [iconFile, onOpenChange],
  );

  const onIconChange = useCallback((file: File | null) => {
    setIconFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setIconPreview(url);
    } else {
      setIconPreview(null);
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create facility</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="create-name">Name</Label>
              <Input
                id="create-name"
                name="name"
                required
                placeholder="e.g. Swimming Pool"
                className="w-full"
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
