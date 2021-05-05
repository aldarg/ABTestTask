import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

type Dto = {
  day: string;
  rollingRetention: number;
};

const mapDto = (dtos: Dto[]) =>
  dtos.map(({ day, rollingRetention }) => ({
    day: new Date(day).toLocaleDateString('ru-ru'),
    rollingRetention: `${(rollingRetention * 100).toFixed(2)}%`,
  }));

const RollingRetentionChart: React.FC = () => {
  const [data, setData] = useState(
    [] as {
      day: string;
      rollingRetention: string;
    }[],
  );

  const getData = async () => {
    const url = 'api/UserActivities/Calculate';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      const json = (await response.json()) as Dto[];
      setData(mapDto(json));
    }
  };

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="retention-form">
      <div className="user-activity-form__save-button-content">
        <button
          className="user-activity-form__save-button"
          onClick={() => getData()}
        >
          Calculate
        </button>
      </div>
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

export default RollingRetentionChart;
