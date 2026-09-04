import {
  LayoutDashboard,
  Building2,
  Layers3,
  DoorOpen,
  Lightbulb,
  BarChart3,
  Bell,
  Settings,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#111827] text-white p-5">

      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-emerald-500/15">
          <Lightbulb size={22} className="text-emerald-400" />
        </div>

        <div>
          <h1 className="font-semibold">Smart Campus</h1>
          <p className="text-xs text-gray-400">Energy Management</p>
        </div>
      </div>

      <nav className="space-y-2">

        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-emerald-500/10 text-emerald-400">
          <LayoutDashboard size={19} />
          Dashboard
        </button>

        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white">
          <Building2 size={19} />
          Buildings
        </button>

        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white">
          <Layers3 size={19} />
          Floors
        </button>

        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white">
          <DoorOpen size={19} />
          Rooms
        </button>

        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white">
          <Lightbulb size={19} />
          Devices
        </button>

        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white">
          <BarChart3 size={19} />
          Analytics
        </button>

        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white">
          <Bell size={19} />
          Alerts
        </button>

        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white">
          <Settings size={19} />
          Settings
        </button>

      </nav>
    </aside>
  );
}

export default Sidebar;