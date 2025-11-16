import React from 'react';
import type { QiskitResult, ChartData } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

interface OutputDisplayProps {
  result: QiskitResult;
}

const colors = ['#0ea5e9', '#6366f1', '#ec4899', '#f97316', '#10b981', '#facc15'];

const ProbabilityChart: React.FC<{ counts: { [key: string]: number } }> = ({ counts }) => {
    // FIX: Rely on TypeScript's inference for reduce, which correctly calculates totalShots as a number.
    // The second parameter `val` avoids shadowing the `count` variable used in the `.map()` call below.
    const totalShots = Object.values(counts).reduce((sum, val) => sum + val, 0);
    if (totalShots === 0) return null;

    const data: ChartData[] = Object.entries(counts).map(([state, count]) => ({
        name: `|${state}⟩`,
        // FIX: The arithmetic operation is now valid as `count` and `totalShots` are correctly typed as numbers.
        probability: count / totalShots,
    })).sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="mt-4">
            <h3 className="font-semibold text-slate-300 mb-2">Measurement Probabilities</h3>
            <div style={{ width: '100%', height: 200 }}>
                <ResponsiveContainer>
                    <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" domain={[0, 1]} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                            labelStyle={{ color: '#cbd5e1' }}
                            formatter={(value: number) => [value.toFixed(3), 'Probability']}
                        />
                        <Bar dataKey="probability">
                            {data.map((entry, index) => (
                                <Cell key={entry.name} fill={colors[index % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};


export const OutputDisplay: React.FC<OutputDisplayProps> = ({ result }) => {
  if (result.error) {
    return <p className="text-red-400">Error: {result.error}</p>;
  }

  return (
    <div className="space-y-4">
      {result.counts && (
        <div>
          <h3 className="font-semibold text-slate-300 mb-2">Counts:</h3>
          <pre className="bg-slate-900/50 p-3 rounded-md text-cyan-300 overflow-x-auto">
            {JSON.stringify(result.counts, null, 2)}
          </pre>
        </div>
      )}
      {result.statevector && (
        <div>
          <h3 className="font-semibold text-slate-300 mb-2">Statevector:</h3>
          <pre className="bg-slate-900/50 p-3 rounded-md text-purple-300 overflow-x-auto text-xs">
            {JSON.stringify(result.statevector, null, 2)}
          </pre>
        </div>
      )}
      {result.counts && <ProbabilityChart counts={result.counts} />}
    </div>
  );
};
