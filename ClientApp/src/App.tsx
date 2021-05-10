import React, { useState } from 'react';
import LifetimeDistribution from './components/LifetimeDistribution';
import RollingRetentionChart from './components/RollingRetention';
import './components/styles.sass';
import UserActivityInput from './components/UserActivityInput';
import { LifetimeDistributionDto, RollingRetentionDto } from './types';

const mapDto = (dtos: RollingRetentionDto[]) =>
  dtos.map(({ day, rollingRetention }) => ({
    day: new Date(day).toLocaleDateString('ru-ru'),
    rollingRetention: `${(rollingRetention * 100).toFixed(2)}%`,
  }));

const apis = [
  { name: 'rollingRetentionData', url: 'api/UserActivities/Calculate' },
  {
    name: 'lifetimeDistributionData',
    url: 'api/UserActivities/GetLifetimeDistribution',
  },
];

const App: React.FC = () => {
  const [data, setData] = useState({
    rollingRetentionData: [] as RollingRetentionDto[],
    lifetimeDistributionData: {} as LifetimeDistributionDto,
  });

  const getData = () => {
    apis.forEach(async (api) => {
      const response = await fetch(api.url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setData((state) => ({ ...state, [api.name]: data }));
      }
    });
  };

  return (
    <>
      <UserActivityInput />
      <div className="user-activity-form__save-button-content">
        <button
          className="user-activity-form__save-button"
          onClick={() => getData()}
        >
          Calculate
        </button>
      </div>
      <div className="calculated-data">
        {data.rollingRetentionData.length > 0 && (
          <RollingRetentionChart data={mapDto(data.rollingRetentionData)} />
        )}
        {data.lifetimeDistributionData.distribution && (
          <LifetimeDistribution data={data.lifetimeDistributionData} />
        )}
      </div>
    </>
  );
};

export default App;
