"use client";

export function Year() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
