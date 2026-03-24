'use client';

import { useState } from 'react';
import { Card } from '@kit/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@kit/ui/table';

export function BookingsClient({ bookings }: { bookings: any[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Hotel</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Payments</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">No bookings</TableCell>
                </TableRow>
              ) : (
                bookings.map((b: any) => {
                  const payments = b.payment ?? [];
                  const details = b.booking_detail ?? [];
                  const totalPaid = payments.reduce((s: number, p: any) => s + (p.amount ?? 0), 0);
                  return (
                    <>
                      <TableRow key={b.id} onClick={() => toggle(b.id)} className="cursor-pointer">
                        <TableCell className="font-medium">{b.id}</TableCell>
                        <TableCell className="text-muted-foreground">{b.account_id ?? '—'}</TableCell>
                        <TableCell className="text-muted-foreground">{b.hotel_slug ?? '—'}</TableCell>
                        <TableCell className="text-muted-foreground">{details.length}</TableCell>
                        <TableCell className="text-muted-foreground">{totalPaid}</TableCell>
                        <TableCell className="text-muted-foreground">{b.created_at ? new Date(b.created_at).toLocaleString() : '—'}</TableCell>
                      </TableRow>
                      {expandedId === b.id && (
                        <TableRow>
                          <TableCell colSpan={6} className="bg-muted p-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium">Booking Items</h4>
                                {details.length === 0 ? (
                                  <p className="text-sm text-muted-foreground">No items</p>
                                ) : (
                                  <ul className="text-sm list-disc pl-5">
                                    {details.map((d: any) => (
                                      <li key={d.id}>{`Room ${d.room_id} — amount: ${d.gross_amount ?? '—'}`}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                              <div>
                                <h4 className="font-medium">Payments</h4>
                                {payments.length === 0 ? (
                                  <p className="text-sm text-muted-foreground">No payments</p>
                                ) : (
                                  <ul className="text-sm list-disc pl-5">
                                    {payments.map((p: any) => (
                                      <li key={p.id}>{`#${p.id} — ${p.amount} (${p.created_at ? new Date(p.created_at).toLocaleString() : '—'})`}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}
