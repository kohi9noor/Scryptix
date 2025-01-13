import Link from "next/link";
import { SquareDashedMousePointer } from "lucide-react";

import { cn } from "@/lib/utils";

export default function Logo({
  fontSize = "text-2xl",
  iconSize = 20,
}: {
  fontSize?: string;
  iconSize?: number;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "text-2xl font-extrabold flex items-center gap-2",
        fontSize
      )}
    >
      <p className="text-2xl font-bold font-mono">Scriptix</p>
    </Link>
  );
}
