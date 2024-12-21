import { cn } from "@/lib/utils";
import Link from "next/link";

const Logo = ({
  fontSize = "2xl",
  iconSize = 20,
}: {
  fontSize?: string;
  iconSize?: number;
}) => {
  return (
    <Link
      href={"/"}
      className={cn("text-2xl font-bold flex items-center gap-2", fontSize)}
    >
      <div className=" p-2">Scryptix</div>
    </Link>
  );
};

export default Logo;
