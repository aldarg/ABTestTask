import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Tooltip,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';
import { LifetimeDistributionDto } from '../types';

type LifetimeDistributionProps = {
  data: LifetimeDistributionDto;
};

const getDataForChart = (data: LifetimeDistributionDto) => {
  const periodCount = 1 + Math.floor(Math.log2(data.sampleSize));
  const lifetimeSample = Object.keys(data.distribution);
  const maxLifetime = Number(lifetimeSample[lifetimeSample.length - 1]);
  const periodLength = Math.ceil(maxLifetime / periodCount);
  const result = [] as {
    name: string;
    'Users count': number;
  }[];

  for (let i = 1; i <= periodCount; i++) {
    const lastPeriod = periodLength * (i - 1);
    const period = periodLength * i;
    const value = lifetimeSample
      .map(Number)
      .filter((x) => x > lastPeriod && x <= period)
      .reduce((acc, curr) => acc + data.distribution[curr], 0);
    result.push({ name: `${lastPeriod} - ${period}`, 'Users count': value });
  }

  return result;
};

const LifetimeDistribution: React.FC<LifetimeDistributionProps> = ({
  data,
}: LifetimeDistributionProps) => {
  const dataForChart = getDataForChart(data);
  console.log(dataForChart);

  return (
    <div className="calculated-data__lifetime_histogram">
      <ResponsiveContainer>
        <BarChart
          data={dataForChart}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <XAxis
            dataKey="name"
            label={{
              value: 'Lifetime, days',
              position: 'bottom',
            }}
          />
          <YAxis
            label={{ value: 'Users count', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Bar dataKey="Users count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LifetimeDistribution;
