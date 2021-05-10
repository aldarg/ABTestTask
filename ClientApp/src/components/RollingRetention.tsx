import React from 'react';

type RollingRetentionChartProps = {
  data: {
    day: string;
    rollingRetention: string;
  }[];
};

const RollingRetention: React.FC<RollingRetentionChartProps> = ({
  data,
}: RollingRetentionChartProps) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="retention-form">
      {data.length > 0 && (
        <table className="retention-data">
          <thead>
            <tr>
              <th>Date</th>
              <th>Rolling retention</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dto, i) => (
              <tr key={i} className="retention-data__row">
                {headers.map((column, j) => (
                  <td key={j}>{dto[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RollingRetention;
