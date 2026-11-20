"use client";
import React from "react";
import Link from "next/link";
import ROUTES from "@/Ui/router";
import type { RouteKey } from "@/Ui/router";

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: RouteKey | string;
  children: React.ReactNode;
  className?: string;
};

export default function RouterLink({ to, children, className, ...rest }: Props) {
  const href =
    typeof to === "string"
      ? (Object.prototype.hasOwnProperty.call(ROUTES, to) ? (ROUTES as any)[to as RouteKey] : to)
      : (ROUTES as any)[to as RouteKey];

  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  );
}
