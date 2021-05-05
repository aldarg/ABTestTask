import React from 'react';
import ActivityForm from './components/ActivityForm';
import RollingRetentionChart from './components/RollingRetentionChart';
import './components/styles.sass';

const App: React.FC = () => {
  return (
    <>
      <ActivityForm />
      <RollingRetentionChart />
    </>
  );
};

export default App;
