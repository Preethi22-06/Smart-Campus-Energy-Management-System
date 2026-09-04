import { useEffect, useState } from "react";
import {
  Cpu,
  Zap,
  Activity,
  BatteryCharging,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import StatCard from "./components/StatCard";


function Dashboard() {
  const [summary, setSummary] = useState(null);
  const deviceStatusData = summary
  ? [
      {
        name: "Active",
        value: summary.onDevices,
      },
      {
        name: "Inactive",
        value: summary.offDevices,
      },
    ]
  : [];

  useEffect(() => {
    fetch("http://localhost:8080/devices/summary?hours=5&rate=8")
      .then((response) => response.json())
      .then((data) => {
        setSummary(data);
      })
      .catch((error) => {
        console.error("Error fetching campus summary:", error);
      });
  }, []);

  if (!summary) {
    return (
      <div className="min-h-screen bg-[#0b1120] text-white p-8">
        Loading campus data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b1120] text-white p-8">

    {/* Page Header */}
<div className="mb-8">
  <h2 className="text-3xl font-semibold">
    Campus Overview
  </h2>

  <p className="text-slate-400 mt-2">
    Monitor your campus energy usage and devices in real time.
  </p>
</div>

    {/* Statistics */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

  <StatCard
    title="Total Devices"
    value={summary.totalDevices}
    icon={Cpu}
    iconColor="text-blue-400"
    iconBackground="bg-blue-500/10"
  />

  <StatCard
    title="Active Devices"
    value={summary.onDevices}
    icon={Activity}
    iconColor="text-emerald-400"
    iconBackground="bg-emerald-500/10"
  />

  <StatCard
    title="Active Power"
    value={`${summary.activePower} ${summary.powerUnit}`}
    icon={Zap}
    iconColor="text-yellow-400"
    iconBackground="bg-yellow-500/10"
  />

  <StatCard
    title="Energy Consumption"
    value={`${summary.activeEnergy} ${summary.energyUnit}`}
    icon={BatteryCharging}
    iconColor="text-purple-400"
    iconBackground="bg-purple-500/10"
  />

</div>
{/* Energy Overview */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-6">

  {/* Energy Consumption */}
  <div className="xl:col-span-2 bg-[#111827] border border-slate-800 rounded-2xl p-6">

    <div className="flex items-center justify-between mb-6">
      <div>
        <p className="text-sm text-slate-400">
          Energy Overview
        </p>

        <h3 className="text-xl font-semibold mt-1">
          Consumption & Cost
        </h3>
      </div>

      <div className="text-right">
        <p className="text-2xl font-semibold">
          {summary.activeEnergy} {summary.energyUnit}
        </p>

        <p className="text-sm text-slate-400">
          Current consumption
        </p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">

      <div className="bg-[#0b1120] rounded-xl p-4">
        <p className="text-sm text-slate-400">
          Estimated Cost
        </p>

        <p className="text-xl font-semibold mt-2">
          ₹{summary.estimatedCost}
        </p>
      </div>

      <div className="bg-[#0b1120] rounded-xl p-4">
        <p className="text-sm text-slate-400">
          Monitoring Period
        </p>

        <p className="text-xl font-semibold mt-2">
          {summary.hours} hours
        </p>
      </div>

    </div>
    <div className="h-64 mt-6">
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={deviceStatusData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={90}
        innerRadius={55}
        paddingAngle={4}
      
      >
        <Cell fill="#34d399" />
        <Cell fill="#475569" />
      </Pie>

      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
</div>
<div className="flex justify-center gap-6 mt-2">

  <div className="flex items-center gap-2">
    <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
    <span className="text-sm text-slate-400">
      Active ({summary.onDevices})
    </span>
  </div>

  <div className="flex items-center gap-2">
    <span className="w-3 h-3 rounded-full bg-slate-600"></span>
    <span className="text-sm text-slate-400">
      Inactive ({summary.offDevices})
    </span>
  </div>

</div>
  </div>

  {/* Energy Status */}
  <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">

    <p className="text-sm text-slate-400">
      Energy Status
    </p>

    <div className="flex items-center gap-3 mt-4">

      <span className="w-3 h-3 rounded-full bg-emerald-400"></span>

      <span className="text-lg font-semibold">
        {summary.energyStatus}
      </span>

    </div>

    <div className="mt-8 space-y-4">

      <div className="flex justify-between">
        <span className="text-slate-400">
          Active Devices
        </span>

        <span className="font-medium">
          {summary.onDevices}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-slate-400">
          Inactive Devices
        </span>

        <span className="font-medium">
          {summary.offDevices}
        </span>
      </div>

    </div>

  </div>

</div>

       

      </div>
    
  );
}

export default Dashboard;