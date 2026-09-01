"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type LeadTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function LeadTrigger({ children, onClick, ...props }: LeadTriggerProps) {
  return (
    <button
      type="button"
      onClick={(event) => {
        onClick?.(event);
        window.dispatchEvent(
          new CustomEvent("openLeadModal", { detail: { mode: "trial" } }),
        );
      }}
      {...props}
    >
      {children}
    </button>
  );
}
