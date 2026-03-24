"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@kit/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@kit/ui/dialog';
import { ImageUploader } from '@kit/ui/image-uploader';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';

import { createLocationAction } from '../actions';

export function CreateLocationDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [pending, setPending] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setFile(null);
      setPreview(null);
    }
  }, [open]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const formData = new FormData(form);
      if (file) formData.set('thumbnailFile', file);
      setPending(true);
      try {
        await createLocationAction(formData);
        toast.success('Location created');
        onOpenChange(false);
        form.reset();
        setFile(null);
        setPreview(null);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to create');
      } finally {
        setPending(false);
      }
    },
    [file, onOpenChange],
  );

  const onFileChange = useCallback((f: File | null) => {
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
    else setPreview(null);
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create location</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="create-name">Name</Label>
              <Input id="create-name" name="name" required className="w-full" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="create-slug">Slug</Label>
              <Input id="create-slug" name="slug" className="w-full" />
            </div>
            <div className="grid gap-2">
              <Label>Thumbnail</Label>
              <ImageUploader value={preview ?? undefined} onValueChange={(f) => onFileChange(f as File | null)} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={pending}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateLocationDialog;
