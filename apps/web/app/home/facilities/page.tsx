import { redirect } from 'next/navigation';

export default function FacilitiesPage() {
  // Facilities are merged into the Hotels admin view — redirect there.
  redirect('/home/hotels');
}
