import React, { useState } from 'react';
import LeftMenu from './components/LeftMenu';
import LifetimeDistribution from './components/LifetimeDistribution';
import NavBar from './components/NavBar';
import RollingRetentionMetric from './components/RollingRetentionMetric';
import './components/styles.sass';
import UserActivityInput from './components/UserActivityInput';

const initialState = {
  rollingRetention: undefined as number | undefined,
  sampleSize: undefined as number | undefined,
  distribution: {},
};

const App: React.FC = () => {
  const [data, setData] = useState(initialState);

  const url = '/api/UserActivities/Calculate';
  const getData = async () => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      setData(data);
    }
  };

  return (
    <>
      <NavBar />
      <div className="content">
        <LeftMenu />
        <UserActivityInput />
        <div className="calculations">
          <div className="calculations__button-content">
            <button
              className="calculations__calculate-button"
              onClick={() => getData()}
            >
              CALCULATE
            </button>
          </div>
          <div className="calculations__data">
            {data.rollingRetention && (
              <RollingRetentionMetric value={data.rollingRetention} />
            )}
            {data.sampleSize && data.sampleSize > 0 && (
              <LifetimeDistribution
                sampleSize={data.sampleSize}
                distribution={data.distribution}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
