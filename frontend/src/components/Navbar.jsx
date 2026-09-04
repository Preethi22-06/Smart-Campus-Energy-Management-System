import { Bell, UserCircle } from "lucide-react";

function Navbar() {
  return (
    <header className="h-20 border-b border-slate-800 bg-[#0b1120] px-8 flex items-center justify-between">

      <div>
        <p className="text-sm text-slate-400">
          Smart Campus
        </p>

        <h1 className="text-xl font-semibold text-white">
          Energy Management
        </h1>
      </div>

      <div className="flex items-center gap-5">

        <button className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition">
          <Bell size={21} />

          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3 border-l border-slate-800 pl-5">
          <UserCircle
            size={34}
            className="text-slate-400"
          />

          <div>
            <p className="text-sm font-medium text-white">
              Admin
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Navbar;