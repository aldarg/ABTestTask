using ABTestTask.Contracts;

namespace ABTestTask.BusinessLogic
{
    public interface IUserActivityLogic
    {
        void SaveData(UserActivityDto[] dtos);
    }
}
