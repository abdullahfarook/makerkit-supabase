"use client";

import React, { useState } from 'react';

import { Button } from '@kit/ui/button';

import CreateLocationDialog from './create-location-dialog';
import EditLocationDialog from './edit-location-dialog';

export function LocationsClient({ locations }: { locations: any[] }) {
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-medium">Locations</h3>
        <Button onClick={() => setCreateOpen(true)}>Create location</Button>
      </div>

      <div className="grid gap-2">
        {locations.map((loc) => (
          <div key={loc.id} className="flex items-center justify-between rounded border p-3">
            <div className="flex items-center gap-4">
              {loc.thumbnail ? (
                <img src={loc.thumbnail} alt="thumbnail" className="h-16 w-24 rounded object-cover" />
              ) : (
                <div className="h-16 w-24 rounded bg-muted" />
              )}
              <div>
                <div className="font-medium">{loc.name}</div>
                <div className="text-sm text-muted-foreground">{loc.slug}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setSelected(loc);
                  setEditOpen(true);
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      <CreateLocationDialog open={createOpen} onOpenChange={(v) => setCreateOpen(v)} />
      {selected && <EditLocationDialog open={editOpen} onOpenChange={(v) => setEditOpen(v)} location={selected} />}
    </div>
  );
}

export default LocationsClient;
