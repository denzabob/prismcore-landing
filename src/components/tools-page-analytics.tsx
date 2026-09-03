"use client";

import { useEffect } from "react";
import { sendYandexMetrikaGoal } from "@/lib/analytics";

export function ToolsPageAnalytics() {
  useEffect(() => {
    sendYandexMetrikaGoal("tools_open", { tool: "tools" });
  }, []);

  return null;
}
