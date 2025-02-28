import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4">
      <h2 className="text-4xl font-bold text-foreground">404: Not Found</h2>
      <p className="w-4/5 text-center text-lg text-foreground/80">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Button asChild size="lg" variant="secondary" className="uppercase">
        <Link href="/home">Return Home</Link>
      </Button>
    </div>
  );
}
