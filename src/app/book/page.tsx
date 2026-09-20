import { BookingForm } from "@/components/booking-form";
import { pageMetadata } from "@/lib/seo";
export const metadata = {
  ...pageMetadata(
    "Request an Appointment",
    "Tell us about your vehicle and request mobile detailing at your location.",
    "/book",
  ),
  robots: { index: false, follow: true },
};
export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; market?: string }>;
}) {
  const params = await searchParams;
  return (
    <BookingForm
      initialService={params.service}
      initialMarket={params.market}
    />
  );
}
