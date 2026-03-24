"use client";

import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@kit/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@kit/ui/dialog';
import { ImageUploader } from '@kit/ui/image-uploader';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';

import { updateLocationAction } from '../actions';

export function EditLocationDialog({ open, onOpenChange, location }: { open: boolean; onOpenChange: (open: boolean) => void; location: any }) {
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
        await updateLocationAction(formData);
        toast.success('Location updated');
        onOpenChange(false);
        form.reset();
        setFile(null);
        setPreview(null);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to update');
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
          <input type="hidden" name="id" value={location?.id} />
          <DialogHeader>
            <DialogTitle>Edit location</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input name="name" defaultValue={location?.name} className="w-full" />
            </div>
            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input name="slug" defaultValue={location?.slug ?? ''} className="w-full" />
            </div>
            <div className="grid gap-2">
              <Label>Thumbnail URL</Label>
              <Input name="thumbnail" defaultValue={location?.thumbnail ?? ''} className="w-full" />
            </div>
            {location?.thumbnail && (
              <div className="pt-2">
                <div className="text-sm font-medium">Current thumbnail</div>
                <img src={location.thumbnail} alt="thumbnail" className="mt-2 h-24 w-auto rounded object-cover" />
              </div>
            )}
            <div className="grid gap-2">
              <Label>Upload new thumbnail</Label>
              <ImageUploader value={preview ?? undefined} onValueChange={(f) => onFileChange(f as File | null)} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={pending}>
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditLocationDialog;
