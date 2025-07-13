"use client";

import { Users, ClipboardList, MessageSquareMore } from "lucide-react";

export default function StatsOverviewCard() {
  return (
    <div className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-white">📊 Overview</h2>
      <div className="grid grid-cols-3 gap-4">
        <StatBox title="Candidates" value="452" icon={<Users size={20} />} />
        <StatBox
          title="Questions"
          value="1,200"
          icon={<ClipboardList size={20} />}
        />
        <StatBox
          title="Feedbacks"
          value="38"
          icon={<MessageSquareMore size={20} />}
        />
      </div>
    </div>
  );
}

function StatBox({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-neutral-800/70 p-4 rounded-lg flex justify-between items-center">
      <div>
        <p className="text-sm text-neutral-400">{title}</p>
        <p className="text-xl font-bold text-white">{value}</p>
      </div>
      <div className="text-blue-400">{icon}</div>
    </div>
  );
}