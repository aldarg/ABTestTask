type LifetimeDistributionDto = {
  sampleSize: number;
  distribution: {
    [lifetime: string]: number;
  };
};

type UserActivityRecord = {
  userId: string;
  dateRegistration: string;
  dateLastActivity: string;
};

type RollingRetentionDto = {
  day: string;
  rollingRetention: number;
};

export { LifetimeDistributionDto, UserActivityRecord, RollingRetentionDto };
