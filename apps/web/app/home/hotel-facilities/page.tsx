import { redirect } from 'next/navigation';

export default function HotelFacilitiesPage() {
  // Hotel↔Facility management is now part of the Hotels admin UI.
  redirect('/home/hotels');
}
