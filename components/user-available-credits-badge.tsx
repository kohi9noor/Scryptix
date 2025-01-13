"use client";

import Link from "next/link";
import { CoinsIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CONSTANT_VALUE = 100;

export default function UserAvailableCreditsBadge() {
  return (
    <>
      <CoinsIcon size={20} className="text-primary" />
      <span className="font-semibold capitalize">{CONSTANT_VALUE}</span>
    </>
  );
}
