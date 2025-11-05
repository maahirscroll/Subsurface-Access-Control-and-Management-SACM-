
import React from 'react';

interface SensorCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  status: 'normal' | 'warning' | 'danger';
}

const statusStyles = {
  normal: {
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    icon: 'text-green-400',
  },
  warning: {
    bg: 'bg-yellow-500/10',
    text: 'text-yellow-400',
    icon: 'text-yellow-400',
  },
  danger: {
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    icon: 'text-red-400',
  },
};

const SensorCard: React.FC<SensorCardProps> = ({ title, value, unit, icon, status }) => {
  const styles = statusStyles[status];

  return (
    <div className={`p-6 rounded-2xl border border-gray-700 bg-gray-800 shadow-lg ${styles.bg}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 font-medium">{title}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className={`text-4xl font-bold ${styles.text}`}>
              {value.toFixed(0)}
            </span>
            <span className="text-lg text-gray-500">{unit}</span>
          </div>
        </div>
        <div className={`p-3 rounded-full bg-gray-900/50 ${styles.icon}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default SensorCard;
