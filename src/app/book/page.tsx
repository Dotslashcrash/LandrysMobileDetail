import { InquiryForm } from "@/components/inquiry-form";
import { pageMetadata } from "@/lib/seo";
export const metadata = {
  ...pageMetadata(
    "Request a Detail",
    "Share your name, phone, email, vehicle type and details to prepare a detailing inquiry.",
    "/book",
  ),
  robots: { index: false, follow: true },
};
export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const params = await searchParams;
  return <InquiryForm initialService={params.service} />;
}
