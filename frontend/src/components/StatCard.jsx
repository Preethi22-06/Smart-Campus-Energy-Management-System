function StatCard({ title, value, icon: Icon, iconColor, iconBackground }) {
  return (
    <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-xl hover:shadow-black/20">
      <div className="flex items-center justify-between">

        <div>
          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h3 className="text-3xl font-semibold mt-3">
            {value}
          </h3>
        </div>

        <div className={`p-3 rounded-xl ${iconBackground}`}>
          <Icon className={iconColor} size={24} />
        </div>

      </div>
    </div>
  );
}

export default StatCard;