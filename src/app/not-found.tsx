import Link from "next/link";
import { PageIntro } from "@/components/editorial";
export default function NotFound() {
  return (
    <div className="not-found">
      <PageIntro title="Page not found">
        <p>That page isn’t here.</p>
        <Link href="/" className="button">
          Back to Landry’s
        </Link>
      </PageIntro>
    </div>
  );
}
