import Link from "next/link";
import { PageIntro } from "@/components/editorial";
export default function NotFound() {
  return (
    <div className="not-found">
      <PageIntro
        eyebrow="404 / WRONG TURN"
        title={
          <>
            LET’S GET YOU
            <br />
            <em>BACK ON THE ROAD.</em>
          </>
        }
      >
        <p>That page isn’t here.</p>
        <Link href="/" className="button">
          Back to Landry’s ↗
        </Link>
      </PageIntro>
    </div>
  );
}
