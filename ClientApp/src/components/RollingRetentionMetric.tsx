import React from 'react';

type RollingRetentionMetricProps = {
  value: number;
};

const RollingRetentionMetric: React.FC<RollingRetentionMetricProps> = ({
  value,
}: RollingRetentionMetricProps) => {
  return (
    <>
      <span className="calculations__data__header">ROLLING RETENTION</span>
      <div className="retention-form">
        <span className="retention-form__value">
          Current rolling retention 7 days
        </span>
        <span className="retention-form__value">{value * 100}%</span>
      </div>
    </>
  );
};

export default RollingRetentionMetric;
