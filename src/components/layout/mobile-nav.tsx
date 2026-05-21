"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { primaryNav } from "@/config/nav";
import { brand } from "@/lib/brand";
import { WhatsAppCTA } from "./whatsapp-cta";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open menu"
        className="inline-flex h-10 w-10 items-center justify-center text-ink md:hidden"
      >
        <Menu className="h-5 w-5" strokeWidth={1.5} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=open]:fade-in",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out",
          )}
        />
        <Dialog.Content
          className={cn(
            "fixed top-0 right-0 bottom-0 z-50 flex w-[88%] max-w-sm flex-col bg-bone",
            "data-[state=open]:animate-in data-[state=open]:slide-in-from-right",
            "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right",
          )}
        >
          <div className="hairline-b flex items-center justify-between px-6 py-5">
            <Dialog.Title className="eyebrow">{brand.name}</Dialog.Title>
            <Dialog.Close aria-label="Close menu" className="text-ink">
              <X className="h-5 w-5" strokeWidth={1.5} />
            </Dialog.Close>
          </div>
          <nav className="flex flex-1 flex-col px-6 py-8">
            <ul className="flex flex-col gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-3xl font-light text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3 pt-8">
              <Link
                href="/inquire"
                onClick={() => setOpen(false)}
                className="inline-flex h-12 items-center justify-center rounded-full bg-clay px-6 text-[0.9375rem] font-medium text-bone"
              >
                Plan your trip
              </Link>
              <WhatsAppCTA variant="pill" className="justify-center" />
            </div>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
