import { useEffect, useState } from "react";
import {
  Cpu,
  Zap,
  Activity,
  BatteryCharging,
  AlertTriangle,
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
  const [floors, setFloors] = useState([]);

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
    const fetchDashboardData = () => {
      // Fetch campus summary
      fetch("http://localhost:8080/devices/summary?hours=5&rate=8")
        .then((response) => response.json())
        .then((data) => {
          setSummary(data);
        })
        .catch((error) => {
          console.error("Error fetching campus summary:", error);
        });

      // Fetch floors
      fetch("http://localhost:8080/floors")
        .then((response) => response.json())
        .then((data) => {
          setFloors(data);
        })
        .catch((error) => {
          console.error("Error fetching floors:", error);
        });
    };

    fetchDashboardData();

    const interval = setInterval(fetchDashboardData, 5000);

    return () => clearInterval(interval);
  }, []);

  // Rooms requiring attention
  const roomsRequiringAttention = [];

  floors.forEach((floor) => {
    (floor.rooms || []).forEach((room) => {
      const roomDevices = room.devices || [];

      const activeDevices = roomDevices.filter(
        (device) => device.status === "ON"
      );

      const activePower = activeDevices.reduce(
        (total, device) => total + device.powerRating,
        0
      );

      if (activeDevices.length > 0) {
        roomsRequiringAttention.push({
          roomId: room.id,
          roomNumber: room.roomNumber,
          floorId: floor.id,
          floorNumber: floor.floorNumber,
          activeDevices: activeDevices.length,
          activePower: activePower,
          status: activePower > 100 ? "High Usage" : "Active",
        });
      }
    });
  });

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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 min-w-0">

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
          title="Inactive Devices"
          value={summary.offDevices}
          icon={Activity}
          iconColor="text-slate-400"
          iconBackground="bg-slate-500/10"
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
          value={`${Number(summary.activeEnergy).toFixed(2)} ${summary.energyUnit}`}
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

          {/* Cost and Monitoring */}
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

          {/* Pie Chart */}
          <div className="h-64 mt-6">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

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

          {/* Pie Chart Legend */}
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

            <span
              className={`w-3 h-3 rounded-full ${
                summary.energyStatus === "Normal"
                  ? "bg-emerald-400"
                  : "bg-red-400"
              }`}
            ></span>

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

      {/* Rooms Requiring Attention */}
      <div
        id="rooms-attention"
        className="mt-6"
      >

        <div className="flex items-center gap-3 mb-5">

          <AlertTriangle
            size={22}
            className="text-yellow-400"
          />

          <div>

            <h2 className="text-xl font-semibold">
              Rooms Requiring Attention
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Rooms with devices currently switched ON
            </p>

          </div>

        </div>

        {roomsRequiringAttention.length === 0 ? (

          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8 text-center">

            <p className="text-emerald-400 font-semibold text-lg">
              Everything is OK
            </p>

            <p className="text-sm text-slate-400 mt-2">
              No rooms currently require attention.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

            {roomsRequiringAttention.map((room) => (

              <div
                key={room.roomId}
                onClick={() => {
                  window.location.href =
                    `/rooms/${room.roomId}?floor=${room.floorId}`;
                }}
                className="bg-[#111827] border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition cursor-pointer"
              >

                {/* Room Header */}
                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-400">
                      Room
                    </p>

                    <h3 className="text-2xl font-semibold mt-1">
                      {room.roomNumber}
                    </h3>

                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      room.status === "High Usage"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-emerald-500/10 text-emerald-400"
                    }`}
                  >
                    {room.status}
                  </span>

                </div>

                {/* Floor */}
                <p className="text-sm text-slate-400 mt-4">
                  Floor {room.floorNumber}
                </p>

                {/* Room Statistics */}
                <div className="grid grid-cols-2 gap-3 mt-5">

                  <div className="bg-[#0b1120] rounded-xl p-3">

                    <p className="text-xs text-slate-400">
                      Active Devices
                    </p>

                    <p className="text-lg font-semibold mt-1 text-emerald-400">
                      {room.activeDevices}
                    </p>

                  </div>

                  <div className="bg-[#0b1120] rounded-xl p-3">

                    <p className="text-xs text-slate-400">
                      Active Power
                    </p>

                    <p className="text-lg font-semibold mt-1 text-yellow-400">
                      {room.activePower} W
                    </p>

                  </div>

                </div>

                <p className="text-xs text-slate-500 mt-4">
                  Click to view room details
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* Quick Navigation */}
      <div className="mt-6">

        <h2 className="text-xl font-semibold mb-5">
          Quick Navigation
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Buildings */}
          <div
            onClick={() => {
              window.location.href = "/buildings";
            }}
            className="bg-[#111827] border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition cursor-pointer"
          >

            <h3 className="text-lg font-semibold">
              Buildings
            </h3>

            <p className="text-sm text-slate-400 mt-2">
              View all campus buildings and their floors.
            </p>

            <p className="text-blue-400 text-sm mt-4">
              View Buildings →
            </p>

          </div>

          {/* Devices */}
          <div
            onClick={() => {
              window.location.href = "/devices";
            }}
            className="bg-[#111827] border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition cursor-pointer"
          >

            <h3 className="text-lg font-semibold">
              Devices
            </h3>

            <p className="text-sm text-slate-400 mt-2">
              View and manage campus devices.
            </p>

            <p className="text-blue-400 text-sm mt-4">
              View Devices →
            </p>

          </div>

          {/* Rooms */}
          <div
            onClick={() => {
              const section = document.getElementById(
                "rooms-attention"
              );

              if (section) {
                section.scrollIntoView({
                  behavior: "smooth",
                });
              }
            }}
            className="bg-[#111827] border border-slate-800 rounded-2xl p-6 hover:border-yellow-500/50 transition cursor-pointer"
          >

            <h3 className="text-lg font-semibold">
              Rooms Requiring Attention
            </h3>

            <p className="text-sm text-slate-400 mt-2">
              Check rooms with devices currently ON.
            </p>

            <p className="text-yellow-400 text-sm mt-4">
              Check Rooms →
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;