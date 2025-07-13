"use client";

import { AlertCircle } from "lucide-react";

export default function SystemLogsCard() {
  return (
    <div className="min-w-[280px] max-w-sm bg-neutral-900/70 border border-neutral-800 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <AlertCircle className="text-yellow-500" size={20} />
        <h2 className="text-sm font-semibold text-white">System Logs</h2>
      </div>
      <p className="text-neutral-400 text-xs">No recent warnings.</p>
    </div>
  );
}
