import React from 'react';

type RollingRetentionMetricProps = {
  value: number;
};

const RollingRetentionMetric: React.FC<RollingRetentionMetricProps> = ({
  value,
}: RollingRetentionMetricProps) => {
  const retention = (value * 100).toFixed(2);
  return (
    <>
      <span className="calculations__data__header">ROLLING RETENTION</span>
      <div className="retention-form">
        <span className="retention-form__value">
          Current rolling retention 7 day:
        </span>
        <span className="retention-form__value">{retention}%</span>
      </div>
    </>
  );
};

export default RollingRetentionMetric;
