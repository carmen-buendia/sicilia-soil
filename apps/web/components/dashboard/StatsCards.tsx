interface StatsCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  subtext?: string;
}

export const StatsCard = ({ value, label, icon, subtext }: StatsCardProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {subtext && <p className="text-xs text-gray-400 mt-2">{subtext}</p>}
        </div>
        <div className="p-3 bg-gray-100 rounded-xl text-gray-600">{icon}</div>
      </div>
    </div>
  );
};