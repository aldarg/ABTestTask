using ABTestTask.Contracts;
using System.Collections.Generic;

namespace ABTestTask.BusinessLogic
{
    public interface IUserActivityLogic
    {
        void SaveData(UserActivityDto[] dtos);
        List<RollingRetentionDataDto> GetRollingRetention();
    }
}
