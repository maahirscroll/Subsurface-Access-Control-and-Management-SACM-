
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { SensorReading } from '../types';

interface HistoryChartProps {
  data: {
    gas: SensorReading[];
    blockage: SensorReading[];
  };
}

const HistoryChart: React.FC<HistoryChartProps> = ({ data }) => {
  const chartData = data.gas.map((gasReading, index) => ({
    timestamp: gasReading.timestamp,
    gas: gasReading.value,
    blockage: data.blockage[index]?.value,
  }));

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="p-4 rounded-2xl border border-gray-700 bg-gray-800 shadow-lg h-full min-h-[400px] flex flex-col">
      <h3 className="text-xl font-bold text-white mb-4 px-2">Sensor History</h3>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 20,
              left: -10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis 
                dataKey="timestamp" 
                tickFormatter={formatTimestamp} 
                stroke="#A0AEC0" 
                tick={{ fill: '#A0AEC0', fontSize: 12 }} 
            />
            <YAxis 
                yAxisId="left" 
                stroke="#A0AEC0" 
                tick={{ fill: '#A0AEC0', fontSize: 12 }} 
            />
            <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#A0AEC0" 
                tick={{ fill: '#A0AEC0', fontSize: 12 }} 
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A202C',
                border: '1px solid #4A5568',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: '#E2E8F0' }}
              formatter={(value, name) => [`${(value as number).toFixed(0)}`, name]}
              labelFormatter={(label) => formatTimestamp(label as number)}
            />
            <Legend wrapperStyle={{ fontSize: '14px', color: '#E2E8F0', paddingTop: '10px' }} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="gas"
              name="Gas (PPM)"
              stroke="#F56565"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="blockage"
              name="Blockage (cm)"
              stroke="#4299E1"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HistoryChart;
