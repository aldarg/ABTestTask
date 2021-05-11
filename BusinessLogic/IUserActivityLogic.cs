using ABTestTask.Contracts;
using System.Collections.Generic;

namespace ABTestTask.BusinessLogic
{
    public interface IUserActivityLogic
    {
        List<UserActivityDto> GetData();
        void SaveData(UserActivityDto[] dtos);
        CalculatedDataDto GetCalculatedData();
    }
}
