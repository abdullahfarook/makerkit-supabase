'use client';

import { useState } from 'react';
import { Card } from '@kit/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@kit/ui/table';
import { Button } from '@kit/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { deleteReviewAction, updateReviewAction, updateRatingAction } from '../actions';

export function ReviewsClient({ reviews }: { reviews: any[] }) {
  const [editing, setEditing] = useState<any | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [pending, setPending] = useState(false);

  const handleDelete = async (id: number) => {
    setDeleteId(id);
    setPending(true);
    try {
      const form = new FormData();
      form.set('id', String(id));
      await deleteReviewAction(form);
      toast.success('Review deleted');
      setDeleteId(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed');
    } finally {
      setPending(false);
    }
  };

  const saveReview = async (id: number, comment: string) => {
    setPending(true);
    try {
      const form = new FormData();
      form.set('id', String(id));
      form.set('comment', comment);
      await updateReviewAction(form);
      toast.success('Review updated');
      setEditing(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed');
    } finally {
      setPending(false);
    }
  };

  const saveRating = async (review_id: number, rating_id: number | null, rating: number) => {
    setPending(true);
    try {
      const form = new FormData();
      form.set('review_id', String(review_id));
      if (rating_id) form.set('rating_id', String(rating_id));
      form.set('rating', String(rating));
      await updateRatingAction(form);
      toast.success('Rating saved');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed');
    } finally {
      setPending(false);
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Review ID</TableHead>
                <TableHead>Booking</TableHead>
                <TableHead>Hotel</TableHead>
                <TableHead>Ratings</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">No reviews</TableCell>
                </TableRow>
              ) : (
                reviews.map((r) => (
                  <>
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">{r.id}</TableCell>
                      <TableCell className="text-muted-foreground">{r.booking_id}</TableCell>
                      <TableCell className="text-muted-foreground">{r.hotel_id}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {r.review_detail_rating && r.review_detail_rating.length > 0 ? (
                          r.review_detail_rating.map((rr: any) => (
                            <div key={rr.id} className="flex items-center gap-2">
                              <span className="text-sm">Rating:</span>
                              <input defaultValue={rr.rating} type="number" min={1} max={5} className="w-16" onBlur={(e) => saveRating(r.id, rr.id, Number(e.currentTarget.value))} />
                            </div>
                          ))
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-sm">No ratings</span>
                            <input type="number" min={1} max={5} className="w-16" onBlur={(e) => saveRating(r.id, null, Number(e.currentTarget.value))} />
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" onClick={() => setEditing(r)}><Edit /></Button>
                          <Button variant="ghost" className="text-destructive" onClick={() => handleDelete(r.id)} disabled={pending}><Trash2 /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    {editing && editing.id === r.id && (
                      <TableRow>
                        <TableCell colSpan={5} className="bg-muted p-4">
                          <div className="grid gap-2">
                            <label>Comment</label>
                            <textarea defaultValue={r.comment ?? ''} className="w-full p-2" onBlur={(e) => saveReview(r.id, e.currentTarget.value)} />
                            <div className="flex justify-end">
                              <Button variant="outline" onClick={() => setEditing(null)}>Close</Button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}
